import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = new Response();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => req.cookies.get(key)?.value,
          set: (key, val, opts) => {},
          remove: (key, opts) => {},
        },
      }
    );

    const { data: userData, error: uErr } = await supabase.auth.getUser();
    if (uErr || !userData.user)
      return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

    // On lit via la vue user_projects pour ce user
    const { data, error } = await supabase
      .from('user_projects')
      .select('*')
      .eq('user_id', userData.user.id);

    if (error) throw error;

    // récupère le role via project_members (simple second select)
    const { data: roles } = await supabase
      .from('project_members')
      .select('project_id, role')
      .eq('user_id', userData.user.id);

    const roleMap = new Map<string, string>();
    roles?.forEach((r) => roleMap.set(r.project_id, r.role));

    const projects = (data || []).map((p: any) => ({
      ...p,
      role: roleMap.get(p.id) || 'collaborator',
    }));
    return NextResponse.json({ projects });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'error' }, { status: 400 });
  }
}
