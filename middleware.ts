import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Check if the request is coming from admin subdomain
  const isAdminSubdomain =
    hostname.startsWith("admin.") || hostname === "admin.joide.me";

  if (isAdminSubdomain) {
    // Rewrite root path to /admin
    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/admin";
      return NextResponse.rewrite(url);
    }

    // API routes work as-is (they're already at /api/admin/*)
    if (url.pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    // If path doesn't start with /admin, rewrite it
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Optional: Redirect /admin on main domain to admin subdomain
  // Uncomment to enforce subdomain-only access:
  /*
  if (
    url.pathname.startsWith("/admin") &&
    !isAdminSubdomain &&
    process.env.NODE_ENV === "production"
  ) {
    return NextResponse.redirect(
      new URL(`https://admin.joide.me${url.pathname}`, request.url)
    );
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

