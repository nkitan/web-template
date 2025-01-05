import NextAuth from 'next-auth';
import { authConfig } from '@/app/lib/auth.config';
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // If no token is found, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Define role-based access control
  const adminRoutes = ["/admin", "/settings"];
  const editorRoutes = ["/edit", "/posts"];

  if (adminRoutes.includes(req.nextUrl.pathname) && token.role !== "admin") {
    return NextResponse.redirect(new URL("/no-access", req.url));
  }

  if (editorRoutes.includes(req.nextUrl.pathname) && token.role !== "editor") {
    return NextResponse.redirect(new URL("/no-access", req.url));
  }

  // If everything checks out, proceed
  return NextResponse.next();
}
 
export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};