'use client';
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import type { Transition } from 'framer-motion';

const springTransition: Transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  link,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  link: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <Link href={link}>
        <motion.span
          transition={{ duration: 0.25 }}
          className="cursor-pointer text-black/90 hover:text-black dark:text-white/90 hover:opacity-90"
        >
          {item}
        </motion.span>
      </Link>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 6 }}
          transition={springTransition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%+1.2rem)] left-1/2 -translate-x-1/2 pt-4 will-change-transform">
              <motion.div
                transition={springTransition}
                layoutId="active"
                className={[
                  'relative overflow-hidden rounded-3xl',
                  'backdrop-blur-2xl backdrop-saturate-150',
                  // base glass (clair / sombre)
                  'bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,245,252,.45))]',
                  'dark:bg-[linear-gradient(135deg,rgba(8,12,18,.92),rgba(8,12,18,.62))]',
                  // bordure + profondeur
                  'border border-white/55 dark:border-[rgba(56,130,246,0.22)]',
                  'shadow-[0_22px_70px_rgba(37,99,235,.18),inset_0_1px_0_rgba(255,255,255,.55)]',
                  'dark:shadow-[0_22px_70px_rgba(0,0,0,.65),inset_0_1px_0_rgba(59,130,246,.10)]',
                ].join(' ')}
              >
                {/* rim conique clair */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl block dark:hidden"
                  style={{
                    border: '5px solid transparent',

                    backgroundClip: 'padding-box,border-box',
                  }}
                />
                {/* rim conique dark (sans blanc) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden rounded-3xl dark:block"
                  style={{
                    border: '1px solid transparent',

                    backgroundClip: 'padding-box,border-box',
                  }}
                />

                <motion.div
                  layout
                  transition={{
                    type: 'spring',
                    mass: 0.5,
                    damping: 18,
                    stiffness: 180,
                  }}
                  className={[
                    'relative w-max h-full p-4 overflow-hidden rounded-3xl',
                    'backdrop-blur-2xl backdrop-saturate-150',
                    'bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,245,252,.48))]',
                    'dark:bg-[linear-gradient(135deg,rgba(8,12,18,.92),rgba(8,12,18,.62))]',
                    'border border-white/55 dark:border-[rgba(56,130,246,0.22)]',
                    'shadow-[0_22px_70px_rgba(37,99,235,.18),inset_0_1px_0_rgba(255,255,255,.55)]',
                    'dark:shadow-[0_22px_70px_rgba(0,0,0,.65),inset_0_1px_0_rgba(59,130,246,.10)]',
                    'will-change-transform will-change-opacity',
                  ].join(' ')}
                >
                  {/* LIGHT-ONLY liquid rim (no inline style on the container) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl block dark:hidden"
                    style={{
                      border: '1px solid transparent',
                      backgroundImage:
                        'linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,245,252,.48)),' +
                        'conic-gradient(from 210deg, rgba(255,255,255,.85), rgba(0,168,232,.30), rgba(255,255,255,.55), rgba(37,99,235,.22), rgba(255,255,255,.85))',
                      backgroundClip: 'padding-box, border-box',
                    }}
                  />

                  {/* tes deux spans rim RESTENT vides (pas de bg/shadow) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl block dark:hidden"
                    style={{
                      border: '1px solid transparent',
                      backgroundClip: 'padding-box,border-box',
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 hidden rounded-3xl dark:block"
                    style={{
                      border: '1px solid transparent',
                      backgroundClip: 'padding-box,border-box',
                    }}
                  />

                  {/* Reflets / glow */}
                  <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full blur-[10px] bg-white/65 dark:bg-sky-400/10" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-full blur-3xl
               bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.40),rgba(37,99,235,.28),transparent_70%)]"
                  />

                  <div className="relative z-10">{children}</div>
                </motion.div>

                {/* glow bas bleu */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-4/5 -translate-x-1/2 rounded-full blur-3xl
                             bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.40),rgba(37,99,235,.26),transparent_70%)]"
                />
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  upToZero,
  children,
}: {
  setActive: (item: string | null) => void;
  upToZero: boolean;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={[
        'relative flex items-center justify-between gap-10 rounded-full px-6 py-4 max-w-[1400px] transition-all duration-500 ease-in-out',
        upToZero
          ? [
              // Base liquid glass
              'lg:w-[80%]',
              'backdrop-blur-2xl backdrop-saturate-150',
              'bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(240,245,252,.42))]',
              'dark:bg-[linear-gradient(135deg,rgba(8,12,18,.92),rgba(8,12,18,.62))]',
              'border border-white/60 dark:border-[rgba(56,130,246,0.22)]',
              'shadow-[0_18px_48px_rgba(37,99,235,.18),inset_0_1px_0_rgba(255,255,255,.55)]',
              'dark:shadow-[0_18px_48px_rgba(0,0,0,.55),inset_0_1px_0_rgba(59,130,246,.10)]',
            ].join(' ')
          : 'w-full bg-transparent border border-transparent',
      ].join(' ')}
    >
      {/* — rim LIQUID (light only) — */}
      {upToZero && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full block dark:hidden"
          style={{
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(135deg,rgba(255,255,255,.90),rgba(245,248,252,.45)),' +
              'conic-gradient(from 210deg, rgba(255,255,255,.85), rgba(0,168,232,.28), rgba(255,255,255,.55), rgba(37,99,235,.22), rgba(255,255,255,.85))',
            backgroundClip: 'padding-box, border-box',
            opacity: 0.96,
          }}
        />
      )}

      {/* — rim DARK (aucun blanc) — */}
      {upToZero && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden rounded-full dark:block"
          style={{
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(135deg,rgba(8,12,18,.92),rgba(8,12,18,.60)),' +
              'conic-gradient(from 210deg, rgba(0,168,232,.20), rgba(37,99,235,.16), rgba(0,168,232,.20))',
            backgroundClip: 'padding-box, border-box',
            opacity: 0.9,
          }}
        />
      )}

      {/* streak/reflet doux */}
      {upToZero && (
        <span className="pointer-events-none absolute left-8 right-8 top-2 h-6 rounded-full blur-[10px] bg-white/65 dark:bg-sky-400/10" />
      )}

      {/* contenu */}
      <div className="relative z-10 w-full flex items-center justify-between gap-10">
        {children}
      </div>

      {/* glow bleu bas */}
      {upToZero && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-12 -bottom-2 mx-auto h-6 rounded-full blur-2xl
                     bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.22),rgba(37,99,235,.16),transparent_70%)]"
        />
      )}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: LinkProps & { children: ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white flex gap-2 items-center"
    >
      {children}
    </Link>
  );
};
