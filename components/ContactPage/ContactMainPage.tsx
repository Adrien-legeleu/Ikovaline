// components/ContactMainPage.tsx
'use client';

import { useState } from 'react';
import ContactFormStudent from './contactForm/ContactFormStudent';
import ContactFormBusiness from './contactForm/ContactFormBusiness';
import ScriptCopyBtn from '../ui/script-copy-btn';

export default function ContactMainPage() {
  const [isBusiness, setIsBusiness] = useState(true);
  const telData = { Téléphone: '+33 7 85 90 22 38' };
  const emailData = { Email: 'contact@ikovaline.com' };

  return (
    <section className="relative mx-auto  max-w-[1300px]   px-5 py-20 ">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.1) 0 1px, transparent 1px calc(12.5%))',
        }}
      />
      <div className="absolute top-0 left-0 bg-gradient-to-b from-white dark:from-black to-transparent w-full h-32" />
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-white dark:from-black to-transparent w-full h-32" />

      <h1 className=" z-10 text-center text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto pt-5 pb-10 font-extrabold text-primary">
        Contactez-nous pour booster votre présence digitale
      </h1>

      {/* Formulaire */}
      <div className="relative  grid  grid-cols-1 gap-10  lg:grid-cols-[1fr_380px]">
        <div className="max-lg:order-2">
          {isBusiness ? (
            <ContactFormBusiness onSwitch={() => setIsBusiness(false)} />
          ) : (
            <ContactFormStudent onSwitch={() => setIsBusiness(true)} />
          )}
        </div>

        {/* Aside */}
        <aside className="max-lg:order-1 mx-auto w-full max-w-md space-y-6">
          <div
            className="relative overflow-hidden rounded-[3rem] p-8 
          bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(240,245,252,0.5))]
          dark:bg-[linear-gradient(135deg,rgba(10,14,20,0.92),rgba(10,14,20,0.6))]
          shadow-[0_18px_60px_rgba(6,24,44,0.12)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
          >
            <p className="text-center text-neutral-800 dark:text-neutral-300">
              {isBusiness ? (
                <>
                  Vous êtes une entreprise ? Ikovaline vous aide à{' '}
                  <b>optimiser votre visibilité</b>, générer des <b>leads</b> et
                  réussir votre <b>transformation numérique</b>.
                </>
              ) : (
                <>
                  Étudiant(e) passionné(e) ? Rejoignez une équipe dynamique et{' '}
                  <b>boostez vos compétences</b> sur des projets concrets.
                </>
              )}
            </p>

            <button
              onClick={() => setIsBusiness((s) => !s)}
              className="mt-4 w-full rounded-3xl h-12 text-[15px] font-semibold tracking-wide text-white bg-primary"
            >
              {isBusiness
                ? 'Vous êtes étudiant ?'
                : 'Vous êtes une entreprise ?'}
            </button>
          </div>

          <div
            className="relative overflow-hidden rounded-[3rem] p-8 
          bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(240,245,252,0.5))]
          dark:bg-[linear-gradient(135deg,rgba(10,14,20,0.92),rgba(10,14,20,0.6))]
  
          shadow-[0_18px_60px_rgba(6,24,44,0.12)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
          >
            <p className="mb-3 text-center text-md font-semibold text-neutral-700 dark:text-neutral-200">
              Coordonnées directes
            </p>
            <div className="grid gap-3">
              <div className="rounded-[3rem] border border-white/10 dark:border-white/[0.04] bg-white/70 dark:bg-zinc-900/60  p-4">
                <ScriptCopyBtn commandMap={telData} />
              </div>
              <div className="rounded-[3rem] border border-white/10 dark:border-white/[0.04] bg-white/70 dark:bg-zinc-900/60  p-4">
                <ScriptCopyBtn commandMap={emailData} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
