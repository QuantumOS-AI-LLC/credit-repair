import { NextResponse } from "next/server"

export function middleware() {
  // Authentication requirement temporarily removed so you can freely browse the UI mockup.
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"]
}
