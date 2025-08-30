// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const PUBLIC_FILE = /\.(.*)$/;

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Laisse passer assets et API
//   if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) return;

//   // Si l'URL est /fr/... ou /en/..., on garde l'URL
//   // mais on REWRITE vers le chemin sans le préfixe
//   const m = pathname.match(/^\/(fr|en)(\/.*)?$/);
//   if (m) {
//     const locale = m[1] as 'fr' | 'en';
//     const rest = m[2] || '/';
//     const url = req.nextUrl.clone();
//     url.pathname = rest;

//     const res = NextResponse.rewrite(url);
//     // on garde la préférence en cookie pour plus tard
//     res.cookies.set('NEXT_LOCALE', locale, {
//       path: '/',
//       maxAge: 60 * 60 * 24 * 365,
//     });
//     return res;
//   }

//   // Sinon, on ne force aucune redirection; / reste /.
//   return;
// }

// export const config = { matcher: ['/((?!_next|.*\\..*).*)'] };
