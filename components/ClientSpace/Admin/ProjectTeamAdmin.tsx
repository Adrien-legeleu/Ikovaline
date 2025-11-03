'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Member = {
  id: string;
  user_id: string;
  staff_role: string;
  role?: string; // ajoute le rôle pour détecter admin
  email: string | null;
  name: string | null;
};

const CARD =
  'relative rounded-[2rem] p-6 md:p-8 bg-white/60 dark:bg-[#0e1116]/60 backdrop-blur-xl shadow-[inset_1px_1px_6px_rgba(255,255,255,0.2),inset_-2px_-2px_10px_rgba(0,0,0,0.08)]';

export default function ProjectTeamAdmin({ projectId }: { projectId: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<
    'dev' | 'lead_dev' | 'design' | 'pm' | 'seo' | 'video'
  >('dev');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function fetchMembers() {
    setLoading(true);
    try {
      const r = await fetch(`/api/projects/${projectId}/members`);
      const j = await r.json();
      setMembers(Array.isArray(j.items) ? j.items : []);
    } catch (e: any) {
      setErr(e?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, [projectId]);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      // dans ProjectTeamAdmin (client)
      const r = await fetch(`/api/projects/${projectId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, staff_role: role }), // ⬅️ IMPORTANT
      });

      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || 'Invitation impossible');
      setEmail('');
      setRole('dev');
      await fetchMembers();
    } catch (e: any) {
      setErr(e?.message || 'Erreur');
    } finally {
      setSubmitting(false);
    }
  }

  async function removeMember(user_id: string, role?: string) {
    if (role === 'admin') {
      alert('❌ Impossible de retirer un administrateur.');
      return;
    }
    if (!confirm('Retirer ce membre du projet ?')) return;
    try {
      const r = await fetch(
        `/api/projects/${projectId}/members?user_id=${encodeURIComponent(user_id)}`,
        { method: 'DELETE' }
      );
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || 'Suppression impossible');
      await fetchMembers();
    } catch (e: any) {
      alert(e?.message || 'Erreur');
    }
  }

  return (
    <div className={CARD}>
      <div className="space-y-6">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Équipe
          </div>
          <h2 className="text-xl font-semibold">Membres du projet</h2>
        </div>

        {/* Liste */}
        {loading ? (
          <div className="text-sm opacity-70">Chargement…</div>
        ) : members.length === 0 ? (
          <div className="text-sm opacity-70">Aucun membre pour l’instant.</div>
        ) : (
          <ul className="space-y-2">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between rounded-[1rem] bg-black/5 dark:bg-white/10 px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium break-words">
                    {m.name || m.email || m.user_id}
                  </div>
                  <div className="text-xs opacity-70">
                    {m.staff_role}
                    {m.role === 'admin' && ' • admin'}
                  </div>
                </div>

                {m.role === 'admin' ? (
                  <span className="text-xs text-muted-foreground italic">
                    Non modifiable
                  </span>
                ) : (
                  <button
                    onClick={() => removeMember(m.user_id, m.role)}
                    className="inline-flex h-9 items-center rounded-[0.8rem] bg-rose-600 text-white px-3 text-[12px] font-medium hover:opacity-90 transition"
                  >
                    Retirer
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Invite */}
        <form
          onSubmit={invite}
          className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-center"
        >
          <input
            type="email"
            className="h-10 rounded-[0.9rem] px-3 bg-black/5 dark:bg-white/10 outline-none"
            placeholder="email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            className="h-10 rounded-[0.9rem] px-3 bg-black/5 dark:bg-white/10 outline-none"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value as
                  | 'dev'
                  | 'lead_dev'
                  | 'design'
                  | 'pm'
                  | 'seo'
                  | 'video'
              )
            }
          >
            <option value="dev">dev</option>
            <option value="lead_dev">lead_dev</option>
            <option value="design">design</option>
            <option value="pm">pm</option>
            <option value="seo">seo</option>
            <option value="video">video</option>
          </select>

          <button
            disabled={submitting}
            className={cn(
              'h-10 rounded-[0.9rem] px-4 bg-primary text-white text-sm font-medium transition',
              submitting && 'opacity-70 pointer-events-none'
            )}
          >
            Inviter
          </button>
        </form>

        {err && <div className="text-sm text-rose-600">{err}</div>}

        <p className="text-xs opacity-60">
          Les administrateurs apparaissent ici mais ne peuvent pas être retirés.
        </p>
      </div>
    </div>
  );
}
