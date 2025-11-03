'use client';

import React, { useEffect, useState, createContext } from 'react';
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconNews,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BlogType } from '@/components/BlogPage/Blog';
import { Button } from './button';

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const isEN = /^\/en(\/|$)/.test(usePathname() || '/');

  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  };

  const seeAll = isEN ? 'All posts' : 'Tous nos articles';
  const ariaChange = isEN ? 'Change slide' : 'Changer de diapo';

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              'absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l'
            )}
          ></div>

          <div
            className={cn(
              'flex flex-row justify-start gap-8 pl-4',
              'mx-auto max-w-7xl'
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: 'easeOut',
                    once: true,
                  },
                }}
                key={'card' + index}
                className="!rounded-[3rem] last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mx-10 flex items-center justify-between gap-2">
          <Link
            href={`/${isEN ? 'en/' : ''}blog`}
            className={cn(
              'group relative z-10 inline-flex items-center gap-2 rounded-[2rem] px-4 py-3 text-sm font-semibold leading-none text-white',
              'bg-[hsl(var(--primary))] shadow-[0_20px_40px_-10px_hsl(var(--primary)/0.6)]',
              'transition active:scale-[0.97] hover:shadow-[0_28px_60px_-10px_hsl(var(--primary)/0.7)] hover:brightness-[1.07]'
            )}
          >
            <span
              aria-hidden="true"
              className="grid h-4 w-4 place-items-center text-white/90"
            >
              <IconNews className="h-4 w-4" />
            </span>
            <span>{seeAll}</span>
          </Link>

          <div className="flex gap-2">
            <Button
              className="relative z-40 flex h-10 w-10 !p-0 items-center justify-center rounded-full  disabled:opacity-50"
              onClick={scrollLeft}
              aria-label={ariaChange}
              disabled={!canScrollLeft}
            >
              <IconArrowNarrowLeft className="h-6 w-6 text-white" />
            </Button>
            <Button
              className="relative z-40 flex h-10 !p-0 w-10 items-center justify-center rounded-full  disabled:opacity-50"
              onClick={scrollRight}
              aria-label={ariaChange}
              disabled={!canScrollRight}
            >
              <IconArrowNarrowRight className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Blog = ({
  blog,
  layout = false,
}: {
  blog: BlogType;
  layout?: boolean;
}) => {
  const isEN = /^\/en(\/|$)/.test(usePathname() || '/');

  return (
    <Link href={`/${isEN ? 'en/' : ''}blog/${blog.slug}`} className="relative">
      <motion.div
        layoutId={layout ? `blog-${blog.title}` : undefined}
        className="relative shadow-xl shadow-black/20 z-10 flex h-56 md:h-80 w-80 md:w-[480px] flex-col items-start justify-start overflow-hidden rounded-[3rem] bg-gray-100 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-4 md:p-8 flex h-full justify-end items-end">
          <motion.h3
            layoutId={layout ? `title-${blog.title}` : undefined}
            className="mt-2 text-left font-sans capitalize text-2xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {blog.title}
          </motion.h3>
        </div>
        <div className="absolute bottom-0 z-20 h-1/2 max-sm:hidden left-0 bg-transparent backdrop-blur-[1px] w-full" />
        <BlurImage
          src={blog.img}
          alt={blog.title}
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.div>
    </Link>
  );
};

export const BlurImage = ({ src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      height={500}
      width={500}
      className={cn(
        'h-full w-full brightness-75 transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Background of a beautiful view'}
      {...rest}
    />
  );
};
