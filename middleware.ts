// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Session check happens on backend
  // If 401, redirect handled by axios interceptor
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/employees/:path*', '/attendance/:path*'],
};