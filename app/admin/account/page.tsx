'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import {
  IconUserCircle,
  IconBuilding,
  IconPhone,
  IconCalendarEvent,
  IconAt,
  IconShieldCheck,
  IconLock,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';
import { motion, cubicBezier } from 'framer-motion';
import { cn } from '@/lib/utils';

const ease = cubicBezier(0.16, 1, 0.3, 1);

// mêmes tokens visuels que l'espace client
const CARD =
  'relative rounded-[2rem] border border-black/[0.04] p-6 md:p-8 bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_#d7dce6,-14px_-14px_36px_#ffffff] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.55),-14px_-14px_36px_rgba(255,255,255,0.03)]';
const CARD_INNER =
  'pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.03)]';

type ProfileRow = {
  full_name: string;
  company: string;
  phone: string;
  created_at?: string;
  status?: string;
  email_from_auth?: string;
};

export default function AdminAccountPage() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  const [me, setMe] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileRow>({
    full_name: '',
    company: '',
    phone: '',
    created_at: '',
    status: 'active',
    email_from_auth: '',
  });

  const [pw, setPw] = useState({ newpass: '', confirm: '' });

  const [msgOk, setMsgOk] = useState<string | null>(null);
  const [msgErr, setMsgErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      setMe(user);

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      setProfile({
        full_name: data?.full_name ?? '',
        company: data?.company ?? '',
        phone: data?.phone ?? '',
        created_at: data?.created_at ?? user.created_at ?? '',
        status: data?.status ?? 'active',
        email_from_auth: user.email ?? '',
      });

      setLoading(false);
    })();
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!me) return;

    setMsgOk(null);
    setMsgErr(null);
    setSavingProfile(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        company: profile.company,
        phone: profile.phone,
      })
      .eq('id', me.id);

    setSavingProfile(false);

    if (error) {
      setMsgErr(error.message || 'Échec de la mise à jour du profil.');
    } else {
      setMsgOk('Profil mis à jour ✅');
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setMsgOk(null);
    setMsgErr(null);

    if (pw.newpass.length < 8) {
      setMsgErr('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (pw.newpass !== pw.confirm) {
      setMsgErr('Les mots de passe ne correspondent pas.');
      return;
    }

    setSavingPw(true);
    const { error } = await supabase.auth.updateUser({
      password: pw.newpass,
    });
    setSavingPw(false);

    if (error) {
      setMsgErr(error.message || 'Échec de la modification du mot de passe.');
    } else {
      setMsgOk('Mot de passe modifié ✅');
      setPw({ newpass: '', confirm: '' });
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-muted-foreground text-sm">
        <Loader2 className="animate-spin h-4 w-4 mr-2" />
        Chargement…
      </div>
    );
  }

  return (
    <section className="space-y-6 max-md:pb-16 px-2">
      {/* HEADER PAGE */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease }}
        className="flex flex-col gap-2"
      >
        <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          Espace admin
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
          Mon compte
        </h1>

        <p className="text-sm text-muted-foreground max-w-prose">
          Profil administrateur et sécurité d’accès.
        </p>
      </motion.div>

      {/* GRID 2 COL */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* CARD PROFIL */}
        <motion.form
          onSubmit={handleSaveProfile}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease }}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />

          <div className="relative z-10 space-y-6">
            {/* Header bloc */}
            <header className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30">
                <IconUserCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold leading-tight">
                  Profil Admin
                </h2>
                <p className="text-xs text-muted-foreground">
                  Coordonnées utilisées en interne.
                </p>
              </div>
            </header>

            {/* Champs modifiables */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <EditRow
                label="Nom complet"
                value={profile.full_name}
                onChange={(v) => setProfile((p) => ({ ...p, full_name: v }))}
                icon={<IconUserCircle className="h-4 w-4" />}
              />
              <EditRow
                label="Société"
                value={profile.company}
                onChange={(v) => setProfile((p) => ({ ...p, company: v }))}
                icon={<IconBuilding className="h-4 w-4" />}
              />
              <EditRow
                label="Téléphone"
                value={profile.phone}
                onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
                icon={<IconPhone className="h-4 w-4" />}
              />
              <StaticRow
                label="E-mail"
                value={profile.email_from_auth || '—'}
                icon={<IconAt className="h-4 w-4" />}
              />
              <StaticRow
                label="Statut"
                value={profile.status || 'active'}
                icon={<IconShieldCheck className="h-4 w-4" />}
              />
              <StaticRow
                label="Créé le"
                value={
                  profile.created_at
                    ? new Date(profile.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '—'
                }
                icon={<IconCalendarEvent className="h-4 w-4" />}
              />
            </div>

            {/* CTA + feedback */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={savingProfile}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-[1rem] px-4 py-2 text-sm font-medium w-full sm:w-auto',
                  'bg-primary text-white shadow-[0_18px_38px_rgba(59,130,246,0.1)] dark:shadow-[0_18px_38px_rgba(59,130,246,0.05)]',
                  'hover:opacity-90 active:scale-[.99] transition',
                  savingProfile && 'opacity-60 cursor-not-allowed'
                )}
              >
                {savingProfile ? 'Enregistrement…' : 'Enregistrer'}
              </button>

              {msgOk && !savingPw && (
                <Feedback tone="ok" icon={<IconCheck className="h-4 w-4" />}>
                  {msgOk}
                </Feedback>
              )}
              {msgErr && !savingPw && (
                <Feedback tone="err" icon={<IconX className="h-4 w-4" />}>
                  {msgErr}
                </Feedback>
              )}
            </div>

            {/* note RGPD */}
            <div className="rounded-[1.2rem] bg-black/[0.05] dark:bg-white/[0.07] text-[11px] leading-relaxed p-4 ring-1 ring-black/10 dark:ring-white/10 text-muted-foreground">
              Ces informations sont partagées uniquement avec l’équipe interne
              (facturation, pilotage projet). Vous pouvez nous demander une
              modification à tout moment.
            </div>
          </div>
        </motion.form>

        {/* CARD SÉCURITÉ */}
        <motion.form
          onSubmit={handleChangePassword}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.05, duration: 0.45, ease }}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />

          <div className="relative z-10 flex flex-col gap-6 h-full">
            <header className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30">
                <IconLock className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold leading-tight">
                  Sécurité
                </h2>
                <p className="text-xs text-muted-foreground">
                  Mettre à jour le mot de passe admin.
                </p>
              </div>
            </header>

            <div className="space-y-4">
              <Field label="Nouveau mot de passe">
                <PasswordInput
                  value={pw.newpass}
                  onChange={(e) =>
                    setPw((p) => ({ ...p, newpass: e.target.value }))
                  }
                  placeholder="********"
                />
              </Field>

              <Field label="Confirmer le mot de passe">
                <PasswordInput
                  value={pw.confirm}
                  onChange={(e) =>
                    setPw((p) => ({ ...p, confirm: e.target.value }))
                  }
                  placeholder="********"
                />
              </Field>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={savingPw}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-[1rem] px-4 py-2 text-sm font-medium w-full sm:w-auto',
                  'bg-primary text-white shadow-[0_18px_38px_rgba(59,130,246,0.1)] dark:shadow-[0_18px_38px_rgba(59,130,246,0.05)]',
                  'hover:opacity-90 active:scale-[.99] transition',
                  savingPw && 'opacity-60 cursor-not-allowed'
                )}
              >
                {savingPw ? 'Enregistrement…' : 'Mettre à jour'}
              </button>

              {msgOk && !savingProfile && (
                <Feedback tone="ok" icon={<IconCheck className="h-4 w-4" />}>
                  {msgOk}
                </Feedback>
              )}

              {msgErr && !savingProfile && (
                <Feedback tone="err" icon={<IconX className="h-4 w-4" />}>
                  {msgErr}
                </Feedback>
              )}
            </div>

            <div className="mt-auto rounded-[1.2rem] bg-black/[0.05] dark:bg-white/[0.07] text-[11px] leading-relaxed p-4 ring-1 ring-black/10 dark:ring-white/10 text-muted-foreground">
              Utilisez un mot de passe unique à cet espace. Évitez de le
              réutiliser ailleurs, même en interne.
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------- sub components shared (admin/dev/client style) ---------- */

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

// champ éditable (input)
function EditRow({
  icon,
  label,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="rounded-[2rem] px-4 py-3 bg-black/[0.03] dark:bg-white/[0.06] ring-1 ring-black/5 dark:ring-white/5 flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <span className="shrink-0 text-muted-foreground mt-[2px]">
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {label}
            </div>
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                'w-full bg-transparent outline-none text-sm font-medium break-words',
                'placeholder:text-neutral-400 dark:placeholder:text-neutral-500'
              )}
              placeholder="—"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// champ en lecture seule
function StaticRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <div className="rounded-[2rem] px-4 py-3 bg-black/[0.03] dark:bg-white/[0.06] ring-1 ring-black/5 dark:ring-white/5 flex items-start gap-3 text-left">
        <span className="shrink-0 text-muted-foreground mt-[2px]">{icon}</span>
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
          <div className="text-sm font-medium break-words">{value || '—'}</div>
        </div>
      </div>
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
