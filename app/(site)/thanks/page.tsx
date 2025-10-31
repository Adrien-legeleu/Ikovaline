// /app/thanks/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconX } from '@tabler/icons-react';

export default function ThanksPage() {
  const [countdown, setCountdown] = useState(5);

  // 1. tentative fermeture immédiate
  useEffect(() => {
    try {
      window.close();
    } catch (_) {}
  }, []);

  // 2. countdown auto-close
  useEffect(() => {
    const iv = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          // quand on arrive à 0 -> on retente close()
          try {
            window.close();
          } catch (_) {}
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(iv);
  }, []);

  function handleManualClose() {
    try {
      window.close();
    } catch {
      // fallback: si le navigateur ne laisse pas fermer (onglet pas ouvert via window.open),
      // on peut rediriger vers ton site principal
      window.location.href = 'https://ikovaline.com';
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 dark:from-[#0e1116] dark:to-[#1a1f2e] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative w-full max-w-md rounded-[2rem] bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,.16)] p-8 text-center"
      >
        {/* Light border / bevel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem]"
          style={{
            boxShadow:
              'inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.12)',
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 dark:text-green-400 dark:bg-green-500/20 shadow-[0_12px_40px_rgba(16,185,129,.3)]">
            <IconCheck className="h-7 w-7" strokeWidth={2.2} />
          </div>

          <h1 className="text-xl font-semibold text-foreground">
            Paiement reçu
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Merci 🙌 <br />
            Ton paiement est confirmé. Tu peux fermer cette fenêtre.
          </p>

          <div className="text-[11px] text-muted-foreground/80 tracking-[0.12em] uppercase">
            Fermeture auto dans {countdown}s…
          </div>

          <button
            type="button"
            onClick={handleManualClose}
            className="w-full inline-flex items-center justify-center gap-2 rounded-[1.1rem] bg-primary text-white font-medium text-sm h-11 shadow-[0_16px_40px_rgba(59,130,246,0.4)] hover:opacity-90 transition"
          >
            <IconX className="h-4 w-4" />
            Fermer maintenant
          </button>

          <div className="text-[10px] text-muted-foreground/60 leading-relaxed">
            Si la fenêtre ne se ferme pas automatiquement, elle a peut-être été
            ouverte directement (navigateur bloque window.close()). Tu peux
            aussi simplement la fermer à la main.
          </div>
        </div>
      </motion.div>
    </main>
  );
}
