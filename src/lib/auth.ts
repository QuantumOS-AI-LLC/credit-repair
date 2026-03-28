import { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import { cookies } from "next/headers"

// Module augmentation for next-auth types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  events: {
    async createUser({ user }) {
      try {
        const cookieStore = await cookies()
        
        // Handle Role
        const role = cookieStore.get('intended_role')?.value
        if (role === 'director' || role === 'DIRECTOR') {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'DIRECTOR' }
          })
        }

        // Handle Referral
        const ref = cookieStore.get('director_ref')?.value
        if (ref) {
          const directorExists = await prisma.user.findUnique({ where: { id: ref } })
          if (directorExists && directorExists.role === 'DIRECTOR') {
            await prisma.user.update({
              where: { id: user.id },
              data: { directorId: ref }
            })
          }
        }
      } catch (error) {
        console.error("Error linking referral/role to user:", error)
      }
    }
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role || 'CLIENT'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

