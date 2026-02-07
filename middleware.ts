import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = 'auth-token';

// Routes that require authentication
const PROTECTED_PREFIXES = ['/dashboard', '/employees', '/attendance', '/profile'];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.some((p) => pathname === p || pathname.startsWith(p + '/'));

  // Not logged in → trying to access protected page → redirect to /login
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in → trying to access login/register → redirect to /dashboard
  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/employees/:path*',
    '/attendance/:path*',
    '/profile/:path*',
    '/login',
    '/register',
  ],
};