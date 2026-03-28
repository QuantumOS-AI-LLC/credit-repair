# Project Handoff: Credit Relief Today

This document provides a concise overview of the project's architecture, state, and recent changes to help agents onboard quickly with minimal token consumption.

## 🚀 Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL via Prisma ORM (v5.22.0)
- **Auth**: NextAuth.js (v4) with Google Provider
- **Styling**: Tailwind CSS v4 (using `@theme` variables in `globals.css`)
- **Icons**: Lucide React

## 🔑 Core Systems

### 1. Authentication & Roles
- **Google OAuth**: Primary sign-in method.
- **Role Capture**: During signup, the system captures the intended role (`CLIENT` or `DIRECTOR`) via an `intended_role` cookie set on the `/login` page.
- **User Creation**: The `createUser` event handler in `src/lib/auth.ts` reads this cookie to assign the correct role in the database.
- **Access Control**: Dashboards (`/admin`, `/director`, `/client`) have server-side checks. Unauthorized access redirects to `/login?error=UnauthorizedRole`.

### 2. Affiliate System
- **Tracking**: `AffiliateTracker.tsx` (Root Layout) captures `?ref=` query parameters and stores them in a `director_ref` cookie for 30 days.
- **Linking**: During signup, if a `director_ref` exists, the new user is linked to that director in the database.
- **Director Portal**: `AffiliateLink.tsx` provides a dynamic, environment-aware link for directors to share.

## 🛠 Recent Critical Changes

- **Immediate Signout**: Replaced default NextAuth signout page with a custom `SignOutButton` component for instant logout.
- **Hydration Fixes**: Added mounting guards in `AffiliateLink.tsx` and `suppressHydrationWarning` to the footer date to prevent SSR/Client mismatches.
- **Global Navigation**: Integrated a consistent "C" logo branding with homepage links across all portals and auth screens.
- **CSS Optimization**: Cleaned up Tailwind v4 configuration to avoid specificity conflicts and ensure a premium UI.

## 📁 Important Paths
- `src/app/page.tsx`: Main landing page (Sales/Marketing).
- `src/app/login/page.tsx`: Auth entry point with role/referral capture.
- `src/app/dashboard/`: Portal implementations (Role-based).
- `src/lib/auth.ts`: Auth configuration and database event handlers.
- `src/components/Sidebar.tsx`: Shared navigation for the client portal.

## 📝 Next Steps / TODOs
- **Middleware Migration**: Currently using the deprecated "middleware" convention; should migrate to the "proxy" convention suggested by logs.
- **Automated Testing**: Need E2E tests for the signup and referral linking flow.
- **Profile Completion**: Ensure the onboarding flow correctly updates all required metadata for credit repair letters.

---
*Created by Antigravity on 2026-03-29*
