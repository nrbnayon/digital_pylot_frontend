import { NextRequest, NextResponse } from "next/server";

// ============================================================================
//  ENVIRONMENT CONFIG & CONSTANTS
// ============================================================================
const ENV = {
  IS_DEV: process.env.NODE_ENV === "development",
  IS_PROD: process.env.NODE_ENV === "production",
  CSRF_SECRET: process.env.CSRF_SECRET ?? "CHANGE_ME_IN_PRODUCTION",
  TRUSTED_ORIGINS: (process.env.TRUSTED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED === "true",
  DEV_AUTH_BYPASS: false, // Set to true to bypass auth entirely in dev
} as const;

// Cookie Keys
const COOKIES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken", 
  USER_PERMISSIONS: "userPermissions",
  USER_ROLE: "userRole", // Still kept for landing redirects
  CSRF_TOKEN: "csrfToken",
} as const;

const SECURE_COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
} as const;

// ============================================================================
//  ROUTE & PERMISSION DEFINITIONS
// ============================================================================

const AUTH_ROUTES: string[] = ["/signin", "/signup", "/forgot-password", "/reset-password", "/verify-otp"];
const PUBLIC_ONLY_ROUTES: string[] = ["/success", "/jobs"];
const INFO_ROUTES: string[] = ["/privacy-policy", "/terms", "/about-us"];

// Map of page prefixes to required permission atoms
const PERMISSION_ROUTES: Record<string, string> = {
  "/admin": "view_dashboard",
  "/admin/dashboard": "view_dashboard",
  "/admin/jobs": "manage_jobs",
  "/admin/applications": "view_applications",
  "/admin/leads": "view_leads",
  "/admin/tasks": "view_tasks",
  "/admin/reports": "view_reports",
  "/admin/audit-logs": "view_audit_logs",
  "/admin/categories": "manage_categories",
  "/admin/users": "manage_users",
  "/admin/settings": "manage_settings",
  "/admin/privacy-policy": "manage_settings",
  "/admin/notifications": "view_notifications",
  // Customer portal
  "/customer/portal": "view_customer_portal"
};

// ============================================================================
//  UTILITIES
// ============================================================================

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

function getRequiredPermission(pathname: string): string | null {
  for (const [route, atom] of Object.entries(PERMISSION_ROUTES)) {
    if (pathname === route || pathname.startsWith(route + "/")) {
      return atom;
    }
  }
  return null;
}

function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  if (ENV.IS_PROD) res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  return res;
}

function allow(): NextResponse { return applySecurityHeaders(NextResponse.next()); }

function redirectTo(path: string, request: NextRequest, status: 307 | 302 = 307): NextResponse {
  return applySecurityHeaders(NextResponse.redirect(new URL(path, request.url), { status }));
}

function isCsrfValid(request: NextRequest): boolean {
  if (ENV.IS_DEV) return true;
  const method = request.method.toUpperCase();
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(method)) return true;
  
  const cookieToken = request.cookies.get(COOKIES.CSRF_TOKEN)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!cookieToken || !headerToken || cookieToken !== headerToken) return false;
  return true;
}

// ============================================================================
//  MAIN PROXY GATE
// ============================================================================

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") || 
    pathname.startsWith("/api/") || 
    pathname === "/favicon.ico" || 
    pathname.includes(".") || 
    matchesRoute(pathname, INFO_ROUTES) || 
    pathname === "/" ||
    matchesRoute(pathname, PUBLIC_ONLY_ROUTES)
  ) {
    return NextResponse.next();
  }

  if (!isCsrfValid(request)) return new NextResponse("Forbidden", { status: 403 });

  // Get permissions from cookie (set by our frontend login handler)
  const permissionsStr = request.cookies.get(COOKIES.USER_PERMISSIONS)?.value;
  const rawRole = request.cookies.get(COOKIES.USER_ROLE)?.value || "";
  const role = rawRole.toLowerCase();

  // refreshToken acts as our proof of session since accessToken is in memory
  const isAuthenticated = !!request.cookies.get(COOKIES.REFRESH_TOKEN);

  if (matchesRoute(pathname, AUTH_ROUTES)) {
    if (isAuthenticated) {
      if (role === 'customer') return redirectTo('/customer/portal', request);
      return redirectTo('/admin/dashboard', request);
    }
    return allow();
  }

  if (!isAuthenticated) {
    const dest = encodeURIComponent(pathname + search);
    return redirectTo(`/signin?redirect=${dest}`, request);
  }

  let userPermissions: string[] = [];
  try {
    userPermissions = permissionsStr ? JSON.parse(permissionsStr) : [];
  } catch(e) {}

  // "admin" has all permissions implicitly.
  // We'll require atoms via route map.
  const requiredAtom = getRequiredPermission(pathname);
  
  if (requiredAtom) {
    if (role === 'admin' || userPermissions.includes(requiredAtom)) {
      return allow();
    } else {
      console.warn(`[proxy] 🚫 Access denied | user lacks atom="{"role":"${role}","userPermissions":"${userPermissions}","pathname":"${pathname}","requiredAtom":"${requiredAtom}"}"`);
      // User doesn't have the permission atom -> 403 Forbidden screen
      return redirectTo(`/403?atom=${requiredAtom}`, request);
    }
  }

  // If route is protected but no specific permission map matches, assume standard access (or deny all?)
  // Better to deny by default if under /admin/
  if (pathname.startsWith('/admin/')) {
    if (role === 'admin') return allow(); // Fallback for pure Admins
    return redirectTo(`/403`, request);
  }

  return allow();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)"],
};