'use client';

import { useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import {
  IconLock,
  IconCheck,
  IconX,
  IconUserCircle,
  IconBuilding,
  IconPhone,
  IconShieldCheck,
  IconCalendarEvent,
  IconAt,
} from '@tabler/icons-react';
import { motion, cubicBezier } from 'framer-motion';
import { cn } from '@/lib/utils';

type ProfileInfo = {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: string;
  created_at: string;
};

const ease = cubicBezier(0.16, 1, 0.3, 1);

// style tokens réutilisables (mêmes vibes que dashboard client / admin soft)
const CARD =
  'relative rounded-[2rem] border border-black/[0.04] p-6 md:p-8 bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_#d7dce6,-14px_-14px_36px_#ffffff] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.55),-14px_-14px_36px_rgba(255,255,255,0.03)]';
const CARD_INNER =
  'pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.03)]';

export default function AccountClient({
  email,
  profile,
}: {
  email: string;
  profile: ProfileInfo;
}) {
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    if (pwd.length < 8) {
      setErr('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (pwd !== pwd2) {
      setErr('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwd });
      if (error) throw error;
      setOk('Mot de passe mis à jour ✅');
      setPwd('');
      setPwd2('');
    } catch (e: any) {
      setErr(e?.message ?? 'Échec de la mise à jour.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      {/* HEADER PAGE */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease }}
        className="flex flex-col gap-2"
      >
        <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          Espace client
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
          Mon compte
        </h1>

        <p className="text-sm text-muted-foreground max-w-prose">
          Vos informations personnelles, et la sécurité d’accès à votre espace.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* --------- Carte Infos profil --------- */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease }}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />

          <div className="relative z-10 space-y-5">
            {/* Titre bloc */}
            <header className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30">
                <IconUserCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold leading-tight">
                  Profil
                </h2>
                <p className="text-xs text-muted-foreground">
                  Coordonnées et statut du compte.
                </p>
              </div>
            </header>

            {/* Infos */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <InfoRow
                icon={<IconUserCircle className="h-4 w-4" />}
                k="Nom"
                v={profile.full_name || '—'}
              />
              <InfoRow
                icon={<IconAt className="h-4 w-4" />}
                k="E-mail"
                v={profile.email || email || '—'}
              />
              <InfoRow
                icon={<IconPhone className="h-4 w-4" />}
                k="Téléphone"
                v={profile.phone || '—'}
              />
              <InfoRow
                icon={<IconBuilding className="h-4 w-4" />}
                k="Entreprise"
                v={profile.company || '—'}
              />

              <InfoRow
                icon={<IconShieldCheck className="h-4 w-4" />}
                k="Statut"
                v={profile.status || 'active'}
              />
              <InfoRow
                icon={<IconCalendarEvent className="h-4 w-4" />}
                k="Créé le"
                v={
                  profile.created_at
                    ? new Date(profile.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '—'
                }
              />
            </div>

            {/* Mini note / RGPD style */}
            <div className="rounded-[1.2rem] bg-black/[0.05] dark:bg-white/[0.07] text-[11px] leading-relaxed p-4 ring-1 ring-black/10 dark:ring-white/10 text-muted-foreground">
              Nous utilisons ces informations uniquement pour le suivi de vos
              projets et la facturation. Vous pouvez demander une mise à jour à
              tout moment.
            </div>
          </div>
        </motion.div>

        {/* --------- Carte Sécurité --------- */}
        <motion.form
          onSubmit={updatePassword}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.05, duration: 0.45, ease }}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />

          <div className="relative z-10 flex flex-col gap-6 h-full">
            {/* Header sécurité */}
            <header className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30">
                <IconLock className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold leading-tight">
                  Sécurité
                </h2>
                <p className="text-xs text-muted-foreground">
                  Changez votre mot de passe.
                </p>
              </div>
            </header>

            {/* Inputs */}
            <div className="space-y-4">
              <Field label="Nouveau mot de passe">
                <PasswordInput
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="********"
                  aria-label="Nouveau mot de passe"
                />
              </Field>

              <Field label="Confirmer le mot de passe">
                <PasswordInput
                  value={pwd2}
                  onChange={(e) => setPwd2(e.target.value)}
                  placeholder="********"
                  aria-label="Confirmer le mot de passe"
                />
              </Field>
            </div>

            {/* CTA + feedback */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-[1rem] px-4 py-2 text-sm font-medium w-full sm:w-auto',
                  'bg-primary text-white shadow-[0_18px_38px_rgba(59,130,246,0.1)] dark:shadow-[0_18px_38px_rgba(59,130,246,0.05)]',
                  'hover:opacity-90 active:scale-[.99] transition',
                  loading && 'opacity-60 cursor-not-allowed'
                )}
              >
                {loading ? 'Enregistrement…' : 'Mettre à jour'}
              </button>

              {ok && (
                <Feedback tone="ok" icon={<IconCheck className="h-4 w-4" />}>
                  {ok}
                </Feedback>
              )}

              {err && (
                <Feedback tone="err" icon={<IconX className="h-4 w-4" />}>
                  {err}
                </Feedback>
              )}
            </div>

            {/* Tips sécurité */}
            <div className="mt-auto rounded-[1.2rem] bg-black/[0.05] dark:bg-white/[0.07] text-[11px] leading-relaxed p-4 ring-1 ring-black/10 dark:ring-white/10 text-muted-foreground">
              Astuce : utilisez un mot de passe long (12+ caractères) et unique
              à cet espace pour éviter tout risque d’accès non autorisé.
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------- sub comps ---------- */

function InfoRow({
  icon,
  k,
  v,
}: {
  icon: React.ReactNode;
  k: string;
  v: string;
}) {
  return (
    <div className="rounded-[2rem] px-4 py-3 bg-black/[0.03] dark:bg-white/[0.06] ring-1 ring-black/5 dark:ring-white/5 flex items-start gap-3 text-left">
      <span className="shrink-0 text-muted-foreground mt-[2px]">{icon}</span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {k}
        </div>
        <div className="text-sm font-medium break-words">{v}</div>
      </div>
    </div>
  );
}

function PasswordInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    value: string;
  }
) {
  const { className, ...rest } = props;
  return (
    <input
      type="password"
      className={cn(
        'w-full rounded-[1rem] bg-white/70 dark:bg-neutral-900/60',
        'px-3 py-3 text-sm',
        'ring-1 ring-black/10 dark:ring-white/10',
        'outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary/40',
        'transition placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
        className
      )}
      {...rest}
    />
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
        {label}
      </div>
      {children}
    </div>
  );
}

function Feedback({
  tone,
  icon,
  children,
}: {
  tone: 'ok' | 'err';
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const toneMap: Record<string, { wrapper: string; text: string }> = {
    ok: {
      wrapper:
        'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/20 rounded-[0.8rem] px-3 py-2 text-[12px] inline-flex items-center gap-2',
      text: 'font-medium',
    },
    err: {
      wrapper:
        'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20 rounded-[0.8rem] px-3 py-2 text-[12px] inline-flex items-center gap-2',
      text: 'font-medium',
    },
  };

  return (
    <div className={toneMap[tone].wrapper}>
      {icon}
      <span className={toneMap[tone].text}>{children}</span>
    </div>
  );
}
