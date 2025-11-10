// app/simulateurs/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SimulatorsIndex() {
  return (
    <main className="bg-white dark:bg-neutral-950 py-20 text-neutral-900 overflow-hidden min-h-screen relative">
      {/* Mesh gradient ultra-subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[50vh] inset-0 opacity-30 dark:opacity-50"
        style={{
          background:
            'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.03) 0 1px, transparent 1px calc(12.5%))',
        }}
      />

      {/* Glows ambiants */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[160px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/3 dark:bg-primary/8 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <section className="mx-auto max-w-7xl lg:max-w-6xl xl:max-w-7xl z-10 relative px-6 pt-6 pb-32">
        {/* Hero section ultra-minimaliste */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase
                       bg-gradient-to-r from-primary/10 via-primary/5 to-transparent
                       text-primary backdrop-blur-xl"
          >
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            Simulateurs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-7xl font-black tracking-tighter"
          >
            <span className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 bg-clip-text text-transparent">
              IkovalineTools
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed"
          >
            Des outils gratuits, ultra simples, 100% mécaniques.
          </motion.p>
        </motion.header>

        {/* Bento Grid */}
        <div className="max-w-7xl mx-auto">
          {/* Layout 2 colonnes : Launch à gauche, le reste à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.5fr)] gap-6 items-stretch">
            {/* Launch - grande card à gauche */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-full"
            >
              <SimulatorCardHero
                href="/simulateurs/launch"
                title="Ikovaline Launch"
                description="Simulateur de projet web"
                badge="Vedette"
                imageLight="/simulateur/launch.png"
                imageDark="/simulateur/launch-dark.png"
              />
            </motion.div>

            {/* Colonne de droite : LeakMap + MaxBid en haut, Bientôt en dessous */}
            <div className="space-y-6 h-full flex flex-col">
              {/* LeakMap + MaxBid côte à côte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1"
              >
                <SimulatorCard
                  href="/simulateurs/money-leak-map"
                  title="LeakMap"
                  description="Map des fuites de revenus"
                  imageLight="/simulateur/leakmap.png"
                  imageDark="/simulateur/leakmap-dark.png"
                />

                <SimulatorCard
                  href="/simulateurs/maxbid"
                  title="MaxBid"
                  description="Enchères maximum rentables"
                  imageLight="/simulateur/maxbid.png"
                  imageDark="/simulateur/maxbid-dark.png"
                />
              </motion.div>

              {/* Bientôt — prend la place des deux offres en dessous */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group relative rounded-[3rem] overflow-hidden
                           bg-gradient-to-br from-neutral-50 via-neutral-50/50 to-transparent
                           dark:from-neutral-900/40 dark:via-neutral-900/30 dark:to-transparent
                           backdrop-blur-xl flex items-center justify-between gap-4
                           px-8 py-7
                           transition-all duration-700 hover:scale-[1.02]
                           shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                           dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]
                           hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]
                           dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)]"
              >
                {/* Glow subtil */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative space-y-1">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                    Prochain outil
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-200">
                      Bientôt disponible
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70 animate-pulse" />
                  </div>
                </div>

                <div className="relative hidden sm:flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>Tu veux un simulateur en particulier ?</span>
                  <a
                    target="_blank"
                    href={'https://www.instagram.com/adrien.lgx_/'}
                    className="inline-flex items-center rounded-full border border-neutral-200/70 dark:border-neutral-700/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                  >
                    Dis-le moi
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===== Hero Card (Launch - Grande) ===== */
function SimulatorCardHero({
  href,
  title,
  description,
  badge,
  imageLight,
  imageDark,
}: {
  href: string;
  title: string;
  description: string;
  badge: string;
  imageLight: string;
  imageDark: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block relative rounded-[3rem] overflow-hidden h-full
                 bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                 dark:from-neutral-900/50 dark:via-neutral-900/30 dark:to-neutral-900/20
                 backdrop-blur-xl
                 transition-all duration-700 hover:scale-[1.01]
                 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]
                 dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]
                 dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)]"
    >
      {/* Badge */}
      <div className="absolute top-6 left-6 z-30">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase
                        bg-gradient-to-r from-primary/90 to-primary/80 text-white backdrop-blur-xl
                        shadow-lg shadow-primary/25"
        >
          <div className="h-1 w-1 rounded-full bg-white animate-pulse" />
          {badge}
        </div>
      </div>

      {/* Gradient overlay au hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                    ${isHovered ? 'from-primary/5 to-primary/10' : ''}`}
      />

      {/* Image avec masque */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Masque gradient pour fondu */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-neutral-900 z-10 pointer-events-none" />

        {/* Light */}
        <Image
          src={imageLight}
          alt={`Aperçu ${title}`}
          width={1200}
          height={900}
          className={`w-full h-full object-cover object-top select-none transition-all duration-700 
                     block dark:hidden
                     ${isHovered ? 'scale-110 blur-[2px] ' : 'scale-100 blur-0'}`}
          priority
        />
        {/* Dark */}
        <Image
          src={imageDark}
          alt={`Aperçu ${title} (dark)`}
          width={1200}
          height={900}
          className={`w-full h-full object-cover object-top select-none transition-all duration-700 
                     hidden dark:block
                     ${isHovered ? 'scale-110 blur-[2px] ' : 'scale-100 blur-0'}`}
          priority
        />
      </div>

      {/* Contenu */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-10 pb-10 z-20 transition-transform duration-500 
                   ${isHovered ? 'translate-y-[-8px]' : 'translate-y-0'}`}
      >
        <h3
          className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 
                       group-hover:text-primary transition-colors duration-500 mb-2"
        >
          {title}
        </h3>
        <p
          className="text-base font-medium text-neutral-500 dark:text-neutral-400 
                      group-hover:text-neutral-700 dark:group-hover:text-neutral-300 
                      transition-colors duration-500"
        >
          {description}
        </p>
      </div>

      {/* Particules très subtiles */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-10
                   ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full blur-[1px]"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 18}%`,
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </Link>
  );
}

/* ===== Standard Card (LeakMap, MaxBid) ===== */
function SimulatorCard({
  href,
  title,
  description,
  imageLight,
  imageDark,
}: {
  href: string;
  title: string;
  description: string;
  imageLight: string;
  imageDark: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block relative rounded-[3rem] overflow-hidden h-full
                 bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                 dark:from-neutral-900/50 dark:via-neutral-900/30 dark:to-neutral-900/20
                 backdrop-blur-xl
                 transition-all duration-700 hover:scale-[1.02]
                 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]
                 dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]
                 dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)]"
    >
      {/* Gradient overlay au hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                    ${isHovered ? 'from-primary/5 to-primary/10' : ''}`}
      />

      {/* Image avec masque */}
      <div className="relative w-full h-[60%] overflow-hidden">
        {/* Masque gradient pour fondu */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-neutral-900 z-10 pointer-events-none" />

        {/* Light */}
        <Image
          src={imageLight}
          alt={`Aperçu ${title}`}
          width={1200}
          height={900}
          className={`w-full h-full object-cover object-top select-none transition-all duration-700 
                     block dark:hidden
                     ${isHovered ? 'scale-110 blur-[2px] ' : 'scale-100 blur-0'}`}
          priority
        />
        {/* Dark */}
        <Image
          src={imageDark}
          alt={`Aperçu ${title} (dark)`}
          width={1200}
          height={900}
          className={`w-full h-full object-cover object-top select-none transition-all duration-700 
                     hidden dark:block
                     ${isHovered ? 'scale-110 blur-[2px] ' : 'scale-100 blur-0'}`}
          priority
        />
      </div>

      {/* Contenu */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-6 pb-6 z-20 transition-transform duration-500 
                   ${isHovered ? 'translate-y-[-4px]' : 'translate-y-0'}`}
      >
        <h3
          className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 
                       group-hover:text-primary transition-colors duration-500 mb-1"
        >
          {title}
        </h3>
        <p
          className="text-sm font-medium text-neutral-500 dark:text-neutral-400 
                      group-hover:text-neutral-700 dark:group-hover:text-neutral-300 
                      transition-colors duration-500"
        >
          {description}
        </p>
      </div>

      {/* Particules très subtiles */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 
                   ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full blur-[1px]"
            style={{
              top: `${25 + i * 20}%`,
              left: `${15 + i * 25}%`,
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </Link>
  );
}
