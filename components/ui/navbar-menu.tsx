'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { motion as m, AnimatePresence } from 'framer-motion';

type MenuProps = {
  setActive: (item: string | null) => void;
  upToZero?: boolean;
  children: React.ReactNode;
};

export const Menu = ({ setActive, upToZero, children }: MenuProps) => {
  return (
    <div
      onMouseLeave={() => setActive(null)}
      className={['relative flex items-center gap-8', upToZero ? '' : ''].join(
        ' '
      )}
    >
      {children}
    </div>
  );
};

type MenuItemProps = {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  link: string;
  children?: React.ReactNode;
};

export const MenuItem = ({
  setActive,
  active,
  item,
  link,
  children,
}: MenuItemProps) => {
  const isOpen = active === item && !!children;

  return (
    <div className="relative">
      <Link
        href={link}
        onMouseEnter={() => setActive(item)}
        className=" font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
      >
        {item}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 z-30 mt-3 w-max -translate-x-1/2"
          >
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
              {children}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: LinkProps & { children: React.ReactNode; className?: string }) => {
  return (
    <Link
      {...rest}
      className={[
        'flex items-center gap-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </Link>
  );
};
