'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/SupabaseClient';
import { reviewsFR } from '../LandingPage/review/Review';
import { IconMail } from '@tabler/icons-react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

import { ProjectGaugeCard } from './ProgressCard';
import StarClientsGoogle, { StarRow } from '../StarClientsGoogle';

type Mode = 'signin' | 'signup';

/* ================= Animations (plus lentes + blur) ================= */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
};

const staggerCol: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

// Colonne droite (aurora) — entre par la gauche + blur
const slideInPanel: Variants = {
  hidden: { opacity: 0, x: -24, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE },
  },
};

/* ================= Checkbox fancy ================= */

function CheckboxFancy({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}) {
  function toggle() {
    onChange(!checked);
  }
  function onKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={toggle}
      onKeyDown={onKey}
      className={['group inline-flex items-center gap-2  transition'].join(' ')}
    >
      <span className="relative inline-flex items-center justify-center h-6 w-6 rounded-xl">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <motion.rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="6"
            fill={checked ? 'url(#grad)' : 'transparent'}
            stroke={checked ? 'url(#grad)' : 'rgba(0,0,0,.25)'}
            strokeWidth="1.5"
            initial={false}
            animate={{
              strokeOpacity: checked ? 1 : 0.6,
              fillOpacity: checked ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: EASE }}
          />
          <motion.path
            d="M6.5 12.2l3.2 3.2 7.1-7.2"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

/* ================= Fond Aurora (panel droite) ================= */

function AuroraPanel() {
  return (
    <div className="relative h-full min-h-[520px] rounded-[2rem] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 600px at 0% 0%, rgba(59,130,246,.35), transparent 60%), radial-gradient(1000px 500px at 100% 30%, rgba(14,165,233,.35), transparent 55%), radial-gradient(800px 800px at 60% 110%, rgba(99,102,241,.30), transparent 50%)',
        }}
      />
      <motion.div
        className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-primary/30 blur-[90px]"
        animate={{ x: [0, 12, -10, 0], y: [0, -8, 12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-16 -right-12 h-72 w-72 rounded-full bg-blue-500/30 blur-[100px]"
        animate={{ x: [0, -14, 10, 0], y: [0, 12, -8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-md" />
    </div>
  );
}

export default function AuthCard({ mode }: { mode: Mode }) {
  const router = useRouter();
  const search = useSearchParams();
  const nextParam = search.get('next') || undefined;

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // ✅ par défaut VRAI pour persister “à l’infini”
  const [loading, setLoading] = useState(false);

  // --- (avis) ---
  const humanTestimonials = useMemo(() => {
    return reviewsFR.filter((r) => {
      const img = (r as any).image;
      const src = typeof img === 'string' ? img : img?.src || '';
      const isPhoto =
        /\.jpe?g($|\?)/i.test(src) ||
        /jean|christophe|portrait|face|photo/i.test(src);
      return isPhoto;
    });
  }, []);
  const [randomTestimonial, setRandomTestimonial] = useState<any | null>(null);
  useEffect(() => {
    if (humanTestimonials.length) {
      const pick =
        humanTestimonials[Math.floor(Math.random() * humanTestimonials.length)];
      setRandomTestimonial(pick);
    }
  }, [humanTestimonials]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }

      // Session → cookies HTTP-only (persist long si rememberMe)
      const { data: sessionData, error: sErr } =
        await supabase.auth.getSession();
      if (sErr) throw sErr;

      await fetch('/api/auth/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'SIGNED_IN',
          session: {
            access_token: sessionData.session?.access_token!,
            refresh_token: sessionData.session?.refresh_token ?? null,
          },
          // ⬇️ IMPORTANT : demande au backend de mettre un Max-Age long
          persist: rememberMe,
        }),
      });

      // Redirige selon rôle / next
      // Redirige selon rôle / next
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Session manquante après login');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile?.role) {
        router.replace('/dashboard');
        return;
      }

      switch (profile.role) {
        case 'admin':
          router.replace('/admin/dashboard');
          break;
        case 'dev':
          router.replace('/dev/projects');
          break;
        default:
          // client / user
          if (nextParam) {
            router.replace(nextParam);
          } else {
            router.replace('/dashboard');
          }
          break;
      }
    } catch (err: any) {
      alert(err?.message ?? 'Erreur');
    } finally {
      setLoading(false);
    }
  }
  const leftLaurelSrc = '/laurier-gauche.svg';

  const rightLaurelSrc = '/laurier-droite.svg';
  return (
    <div className="min-h-[100dvh] w-[100dvw] overflow-hidden bg-background text-foreground grid md:grid-cols-2">
      {/* Top bar : retour + CTA switch signin/signup */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-8 z-20">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[1.1rem] px-3 py-2
                       bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl
                       hover:bg-white/80 dark:hover:bg-neutral-900/80
                       transition shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Retour</span>
          </Link>
        </div>

        <div className="pointer-events-auto">
          {mode === 'signin' ? (
            <Link
              href={`/signup${nextParam ? `?next=${encodeURIComponent(nextParam)}` : ''}`}
              className="inline-flex items-center gap-2 rounded-[1.1rem] px-4 py-2
                         bg-gradient-to-r from-primary to-blue-500 text-white
                         hover:opacity-90 transition shadow-[0_10px_30px_rgba(59,130,246,0.35)]"
              aria-label="S’inscrire"
            >
              <span className="text-sm font-semibold">S’inscrire</span>
            </Link>
          ) : (
            <Link
              href={`/signin${nextParam ? `?next=${encodeURIComponent(nextParam)}` : ''}`}
              className="inline-flex items-center gap-2 rounded-[1.1rem] px-4 py-2
                         bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl
                         hover:bg-white/80 dark:hover:bg-neutral-900/80
                         transition shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              aria-label="Se connecter"
            >
              <span className="text-sm font-semibold">Se connecter</span>
            </Link>
          )}
        </div>
      </div>

      {/* Colonne gauche : form (anim + blur) */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <motion.div
          variants={staggerCol}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          <motion.h1
            variants={fadeUpSoft}
            className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight"
          >
            {mode === 'signin' ? 'Bienvenue' : 'Créer un compte'}
          </motion.h1>

          <motion.p
            variants={fadeUpSoft}
            className="mt-3 text-muted-foreground"
          >
            {mode === 'signin'
              ? 'Accède à ton espace client Ikovaline'
              : 'Rejoins ton espace client Ikovaline'}
          </motion.p>

          <motion.form
            variants={staggerCol}
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            {/* Email */}
            <motion.div variants={fadeUpSoft}>
              <label className="text-sm pl-1 font-medium text-muted-foreground">
                Adresse e-mail
              </label>
              <div
                className="rounded-[1.1rem] border border-transparent bg-foreground/5 backdrop-blur-sm
                              focus-within:border-[hsl(var(--primary))]/70 focus-within:bg-[hsl(var(--primary))/0.08] transition-colors"
              >
                <input
                  name="email"
                  type="email"
                  placeholder="ex: jean.dupont@email.com"
                  required
                  autoComplete="email"
                  className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                />
              </div>
            </motion.div>
            {/* Password */}
            <motion.div variants={fadeUpSoft}>
              <label className="text-sm pl-1 font-medium text-muted-foreground">
                Mot de passe
              </label>
              <div
                className="rounded-[1.1rem] border border-transparent bg-foreground/5 backdrop-blur-sm
                              focus-within:border-[hsl(var(--primary))]/70 focus-within:bg-[hsl(var(--primary))/0.08] transition-colors"
              >
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    autoComplete={
                      mode === 'signin' ? 'current-password' : 'new-password'
                    }
                    className="w-full bg-transparent text-sm p-4 pr-12 rounded-3xl focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                    aria-label={
                      showPassword
                        ? 'Masquer le mot de passe'
                        : 'Afficher le mot de passe'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
            {/* Rester connecté (exactement comme demandé) */}
            <motion.div
              variants={fadeUpSoft}
              className="flex items-center pb-4 pt-2 justify-between text-sm"
            >
              <CheckboxFancy
                checked={rememberMe}
                onChange={setRememberMe}
                label={<span>Rester connecté</span>}
              />
              <Link
                href="/forgot-password"
                className="hover:underline text-[hsl(var(--primary))]"
              >
                Mot de passe oublié
              </Link>
            </motion.div>
            {/* hidden input pour poster la valeur aussi en FormData (optionnel mais safe) */}
            <input
              type="hidden"
              name="rememberMe"
              value={rememberMe ? '1' : '0'}
            />
            {/* Submit */}
            <motion.button
              variants={fadeUpSoft}
              type="submit"
              disabled={loading}
              className="w-full rounded-[1.1rem] bg-primary z-20 relative text-white py-4 font-medium
                         hover:opacity-90 transition-colors shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
            >
              {loading
                ? 'Chargement…'
                : mode === 'signin'
                  ? 'Se connecter'
                  : 'Créer mon compte'}
            </motion.button>
            {/* Magic link */}
            <motion.div
              variants={fadeUpSoft}
              className="relative flex items-center justify-center my-6"
            >
              <span className="text-xs  px-3 relative z-10 bg-white">ou</span>
              <div className="absolute inset-x-0 h-px bg-border" />
            </motion.div>

            <motion.button
              variants={fadeUpSoft}
              type="button"
              disabled={loading}
              onClick={async () => {
                const emailInput = document.querySelector<HTMLInputElement>(
                  'input[name="email"]'
                );
                if (!emailInput)
                  return alert('Entre ton e-mail avant de continuer.');
                const email = emailInput.value.trim();
                if (!email) return alert('Adresse e-mail requise.');

                try {
                  setLoading(true);

                  // 🔥 Appel à ton API qui gère tout
                  const res = await fetch('/api/auth/magic-link', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email,
                      next: nextParam,
                    }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    throw new Error(data.error || "Erreur lors de l'envoi");
                  }

                  alert(
                    '✅ Email envoyé ! Vérifie ta boîte de réception et clique sur le lien pour te connecter.'
                  );
                } catch (error: any) {
                  console.error(error);
                  alert(
                    error?.message ||
                      "❌ Impossible d'envoyer l'email. Réessaie dans un instant."
                  );
                } finally {
                  setLoading(false);
                }
              }}
              className="w-full rounded-[1.1rem] border border-border/50 py-4 font-medium flex items-center justify-center gap-2
     hover:bg-foreground/5 transition-colors"
            >
              <IconMail className="w-5 h-5" />
              <span>Se connecter par e-mail</span>
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Colonne droite : HERO Ikovaline — clair & lisible */}
      <section className="hidden md:flex items-center p-4 relative overflow-hidden">
        {/* Aurora (slide + blur) — teintes primary CLAIRES */}
        <motion.div
          variants={slideInPanel}
          initial="hidden"
          animate="show"
          className="absolute inset-4 rounded-[2rem] overflow-hidden"
        >
          <div className="relative h-full w-full">
            {/* fond bleu intense et harmonieux */}
            <div
              className="absolute inset-0"
              style={{
                background: `
          radial-gradient(1200px 700px at 10% 0%, rgba(2,132,199,0.45), transparent 65%),
          radial-gradient(1000px 600px at 85% 20%, rgba(56,189,248,0.5), transparent 60%),
          radial-gradient(800px 800px at 70% 110%, rgba(125,211,252,0.45), transparent 55%)
        `,
              }}
            />

            {/* halos animés “Ikovaline” plus vibrants */}
            <motion.div
              className="absolute -top-12 -left-10 h-72 w-72 rounded-full bg-sky-400/50 blur-[90px]"
              animate={{ x: [0, 12, -10, 0], y: [0, -10, 14, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-20 -right-14 h-80 w-80 rounded-full bg-sky-500/50 blur-[110px]"
              animate={{ x: [0, -14, 12, 0], y: [0, 14, -10, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* voile blanc doux pour lisibilité */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
          </div>
        </motion.div>

        {/* Contenu par-dessus */}
        <div className="relative z-10 mx-auto w-full max-w-[560px] px-2">
          {/* Titre court (ne change pas la police) */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
            className="text-center"
          >
            <h2 className="text-slate-800 text-[28px] leading-tight mb-4 sm:text-[36px] font-semibold">
              Suivez & maîtrisez votre projet.
            </h2>
          </motion.div>

          <div className="z-10 pb-5">
            <a
              target="_blank"
              href="https://www.google.com/search?rlz=1C1CHZN_frFR1084FR1084&q=Ikovaline%20Avis"
              className="flex items-end justify-center gap-2 cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
                className="mt-4 flex items-center justify-center gap-1 text-slate-700 dark:text-slate-100"
              >
                {/* 🌿 Laurier gauche */}
                <Image
                  src={leftLaurelSrc}
                  alt="laurier gauche"
                  width={46}
                  height={46}
                  className="opacity-90 rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
                />

                {/* ⭐ Bloc central */}
                <span className="flex flex-col gap-1 items-center justify-center">
                  <StarRow />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xs tracking-[0.18em] font-semibold text-gray-700 dark:text-gray-300"
                  >
                    67+ AVIS
                  </motion.span>
                </span>

                {/* 🌿 Laurier droit */}
                <Image
                  src={rightLaurelSrc}
                  alt="laurier droit"
                  width={46}
                  height={46}
                  className="opacity-85 -rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
                />
              </motion.div>
            </a>
          </div>

          <ProjectGaugeCard percent={72} />
        </div>
      </section>
    </div>
  );
}
