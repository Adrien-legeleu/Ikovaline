// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Apply to everything except /api, Next internals, and static assets
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

// Public pages you allow without login
const PUBLIC_PATHS = new Set<string>([
  '/',
  '/signin',
  '/signup',
  '/reset-password',
  '/demarrer',
  '/contact',
  '/about',
  '/nos-services',
  '/blog',
  '/mentions-legales',
  '/our-projects',
  '/politique-confidentialite',
]);

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);

  // Let public pages through
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  // ✅ Simple auth check via Supabase cookies set by @supabase/auth-helpers
  const hasAccess = Boolean(req.cookies.get('sb-access-token')?.value);
  // (Optional) you can also require refresh:
  // const hasRefresh = Boolean(req.cookies.get('sb-refresh-token')?.value)

  if (!hasAccess) {
    const redirect = new URL('/signin', req.url);
    redirect.searchParams.set('next', pathname);
    return NextResponse.redirect(redirect);
  }

  return NextResponse.next();
}
