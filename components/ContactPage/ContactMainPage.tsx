'use client';

import { useState } from 'react';
import ContactFormStudent from './contactForm/ContactFormStudent';
import ContactFormBusiness from './contactForm/ContactFormBusiness';
import ScriptCopyBtn from '../ui/script-copy-btn';
import { LiquidButton } from '../ui/liquid-glass-button';
import { usePathname } from 'next/navigation';
import Glow from '../ui/glow';

function useLocale() {
  const pathname = usePathname() || '/';
  return { isEN: /^\/en(\/|$)/.test(pathname) };
}

export default function ContactMainPage() {
  const [isBuisnessForm, setIsBuisnessForm] = useState(true);
  const handleForm = () => setIsBuisnessForm(!isBuisnessForm);

  const { isEN } = useLocale();
  const telData = { tel: '+33 7 85 90 22 38' };
  const emailData = { email: 'contact@ikovaline.com' };

  return (
    <section className="relative mx-auto overflow-hidden py-32 grid max-w-[1400px] grid-cols-1 lg:grid-cols-60/40 gap-10 items-start max-sm:px-4 px-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden ">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-28 left-1/3 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full blur-[220px] opacity-30 dark:opacity-40 bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)]" />
        <span className="absolute bottom-32 right-1/4 h-[38rem] w-[38rem] translate-x-1/4 rounded-full blur-[200px] opacity-25 dark:opacity-35 bg-[radial-gradient(closest-side,#2563EB,transparent_70%)]" />
      </div>

      <h1 className="lg:hidden z-20 px-6 text-center text-3xl font-extrabold bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-600 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent">
        {isEN
          ? 'Contact our agency to boost your digital presence'
          : 'Contactez notre agence pour booster votre présence digitale'}
      </h1>

      <div className="max-lg:order-2">
        {isBuisnessForm ? (
          <ContactFormBusiness handleForm={handleForm} />
        ) : (
          <ContactFormStudent handleForm={handleForm} />
        )}
      </div>

      <aside className="max-lg:order-1 mx-auto w-full max-w-md space-y-8">
        <div
          className="relative group rounded-[28px] p-8 backdrop-blur-2xl overflow-hidden
          bg-[linear-gradient(135deg,rgba(255,255,255,.85),rgba(240,245,252,.45))]
          dark:bg-[linear-gradient(135deg,rgba(10,14,20,.9),rgba(10,14,20,.65))]
          border border-white/40 dark:border-[rgba(56,130,246,0.2)]
          shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)]
          dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]"
        >
          <p className="text-center text-neutral-800 dark:text-neutral-300">
            {isBuisnessForm ? (
              isEN ? (
                <>
                  Are you a company? Ikovaline helps you{' '}
                  <b>optimize visibility</b>, generate <b>leads</b> and succeed
                  in your <b>digital transformation</b>.
                </>
              ) : (
                <>
                  Vous êtes une entreprise ? Ikovaline vous aide à{' '}
                  <b>optimiser votre présence</b>, générer des <b>leads</b> et
                  réussir votre <b>transformation</b>.
                </>
              )
            ) : isEN ? (
              <>
                Student passionate about digital? Join a dynamic team and{' '}
                <b>boost your skills</b> on real projects.
              </>
            ) : (
              <>
                Étudiant passionné ? Rejoignez une équipe dynamique et{' '}
                <b>boostez vos compétences</b> sur des projets concrets.
              </>
            )}
          </p>

          <LiquidButton onClick={handleForm} className="w-full mt-4">
            {isBuisnessForm
              ? isEN
                ? 'Are you a student?'
                : 'Vous êtes étudiant ?'
              : isEN
                ? 'Are you a company?'
                : 'Vous êtes une entreprise ?'}
          </LiquidButton>
        </div>

        <div
          className="relative overflow-hidden rounded-[26px] p-6 backdrop-blur-2xl
          bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(240,245,252,0.42))]
          dark:bg-[linear-gradient(135deg,rgba(10,14,20,0.92),rgba(10,14,20,0.58))]
          border border-white/50 dark:border-[rgba(56,130,246,0.16)]
          shadow-[0_18px_60px_rgba(6,24,44,0.12),inset_0_1px_0_rgba(255,255,255,0.55)]
          dark:shadow-[0_18px_60px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(59,130,246,0.10)]"
        >
          <p className="mb-4 text-center text-md font-semibold text-neutral-600 dark:text-neutral-300">
            {isEN ? 'Direct contacts' : 'Coordonnées directes'}
          </p>
          <div className="grid gap-3">
            <div className="rounded-3xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-4">
              <ScriptCopyBtn commandMap={telData} />
            </div>
            <div className="rounded-3xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-4">
              <ScriptCopyBtn commandMap={emailData} />
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
