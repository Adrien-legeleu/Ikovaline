import AdminTopNav from '@/components/ClientSpace/Admin/AdminTopNav';
import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headerList = await headers();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
      global: {
        headers: { 'x-forwarded-for': headerList.get('x-forwarded-for') ?? '' },
      },
    }
  );

  // session requise
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/signin?next=/admin/dashboard');

  // check rôle
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/');

  // Shell admin : top-nav à icônes + zone de contenu
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(12,60,255,0.02),transparent_55%)]">
      {/* barre supérieure */}
      <AdminTopNav />
      <div className="h-[20px] md:h-[40px]" />

      {/* contenu */}
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-6">{children}</main>
    </div>
  );
}
