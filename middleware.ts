import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for auth token and user data in cookies
    const token = request.cookies.get("auth-token")?.value;
    const userDataCookie = request.cookies.get("user-data")?.value;

    if (!token || !userDataCookie) {
      // Redirect to login if no token or user data
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Parse user data to check admin status
      const userData = JSON.parse(decodeURIComponent(userDataCookie));

      // Check if user is admin
      if (!userData.is_admin || userData.role !== "admin") {
        // Redirect to login if not admin
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      // If user data is corrupted, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
