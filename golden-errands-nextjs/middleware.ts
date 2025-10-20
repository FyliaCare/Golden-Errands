// Next.js Middleware - Global authentication and routing
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/faq',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
];

// API paths that require authentication
const protectedApiPaths = [
  '/api/auth/profile',
  '/api/auth/logout',
  '/api/orders',
  '/api/drivers',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is public
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const authHeader = request.headers.get('authorization');
  
  // For API routes
  if (pathname.startsWith('/api/')) {
    if (protectedApiPaths.some(path => pathname.startsWith(path))) {
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const user = await verifyAccessToken(token);

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }
    return NextResponse.next();
  }

  // For page routes - redirect to login if not authenticated
  // (We'll implement this when we create the frontend pages)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
