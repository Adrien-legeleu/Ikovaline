'use client';
import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type MenuItemProps = {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  link: string;
  children?: React.ReactNode;
};

type MenuProps = {
  setActive: (item: string | null) => void;
  upToZero?: boolean;
  children: React.ReactNode;
};

export const Menu = ({ setActive, upToZero, children }: MenuProps) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const CLOSE_DELAY = 130;

  const safeClose = () => {
    timeoutRef.current = setTimeout(() => setActive(null), CLOSE_DELAY);
  };
  const cancelClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <div
      onMouseLeave={safeClose}
      onMouseEnter={cancelClose}
      className={[
        'relative flex items-center gap-8 lg:gap-5 xl:gap-8',
        upToZero ? '' : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
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
    <div className="relative " onMouseEnter={() => setActive(item)}>
      {/* Le trigger */}
      <Link
        href={link}
        className="cursor-pointer text-sm  text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </Link>

      {/* Bridge anti-trou juste sous le trigger */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-full h-4"
        onMouseEnter={() => setActive(item)}
      />

      {/* Panel */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {isOpen && (
            <div
              className="absolute left-1/2 top-[calc(100%_+_0.5rem)] -translate-x-1/2 pt-0"
              onMouseEnter={() => setActive(item)} // ← garde ouvert
            >
              <motion.div
                layoutId="active"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="
    rounded-[2rem] overflow-hidden shadow-xl 
    
    bg-white dark:bg-neutral-900
    backdrop-blur-md backdrop-saturate-150

   
  "
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Link> & { className?: string }) => {
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
