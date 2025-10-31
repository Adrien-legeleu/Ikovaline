// app/api/auth/set/route.ts
import { NextResponse } from 'next/server';

type Body = {
  event: 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED';
  // session renvoyée par supabase.auth.getSession()
  session?: {
    access_token: string;
    refresh_token: string | null;
  } | null;
  // si true -> on garde longtemps (1 an)
  persist?: boolean;
};

export async function POST(req: Request) {
  const { event, session, persist }: Body = await req.json();

  const res = NextResponse.json({ ok: true });

  // Déconnexion -> on supprime
  if (event === 'SIGNED_OUT' || !session) {
    res.cookies.delete('sb-access-token');
    res.cookies.delete('sb-refresh-token');
    return res;
  }

  // Connexion/refresh -> on pose les cookies
  const maxAge = persist ? 60 * 60 * 24 * 365 : undefined; // 1 an si "Rester connecté"
  const common = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    ...(maxAge ? { maxAge } : {}), // session cookie si non-persist
  };

  res.cookies.set('sb-access-token', session.access_token, common);
  if (session.refresh_token) {
    res.cookies.set('sb-refresh-token', session.refresh_token, common);
  }
  return res;
}
