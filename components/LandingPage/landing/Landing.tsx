'use client';
import { TextAnimate } from '@/components/ui/text-animate';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { cn } from '@/lib/utils';
import { IconApps, IconMessage2, IconShieldCheck } from '@tabler/icons-react';

const Glow = dynamic(() => import('@/components/ui/glow'), { ssr: false });
import StarClientsGoogle from '@/components/StarClientsGoogle';
import dynamic from 'next/dynamic';
import { ParticleTextEffect } from '../ParticleWord';
import { LiquidLink } from '@/components/ui/liquid-link';

export default function Landing() {
  return (
    <div className="relative flex justify-center items-center flex-col gap-5 2xl:gap-0  py-20 overflow-hidden">
      <div className="absolute inset-0  overflow-hidden pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
      <div className="flex flex-col z-10 -gap-5 2xl:gap-0">
        <Link
          href="/about/#notre-garantie"
          className=" mx-auto flex items-center  justify-center "
        >
          <motion.div
            className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] "
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={cn(
                'absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#8bacff]/50 via-[#42b8fd]/50 to-[#5fb8f3]/50 bg-[length:300%_100%] p-[1px]'
              )}
              style={{
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'destination-out',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitClipPath: 'padding-box',
              }}
            />
            <IconShieldCheck className="ml-1 size-4 stroke-blue-400 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            <hr className="mx-2 h-4 w-px shrink-0 bg-blue-400" />
            <AnimatedGradientText className="text-sm font-medium">
              Satisfait ou remboursé.
            </AnimatedGradientText>
          </motion.div>
        </Link>

        <motion.h1
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-4xl md:px-0 px-6 lg:!leading-[70px]  xl:!leading-[85px]  2xl:!leading-[115px] md:leading-[60px] leading-[50px] font-bold xl:!font-semibold md:text-5xl xl:text-7xl lg:text-6xl  2xl:text-8xl max-w-4xl xl:max-w-6xl 2xl:max-w-[1450px] mx-auto text-center relative z-20 pt-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-800 dark:from-neutral-300 dark:via-white dark:to-white"
        >
          Ikovaline, De l’idée au SaaS qui{' '}
          <span className="inline-flex p-2 align-middle">
            <ParticleTextEffect />
          </span>
        </motion.h1>
      </div>
      <StarClientsGoogle />
      <TextAnimate
        animation="blurInUp"
        by="word"
        className="text-muted-foreground dark:text-neutral-400  max-sm:px-2 max-w-2xl text-center xs:text-xs md:text-lg"
      >
        On conçoit, développe et automatise vos produits digitaux pour qu’ils
        soient prêts à encaisser 10 000 utilisateurs.
      </TextAnimate>

      <div className="mt-8 2xl:mt-8 flex max-sm:flex-col-reverse items-center justify-center max-sm:gap-3 gap-5">
        <LiquidLink href="/contact" className="z-10 ">
          <span className="flex items-center justify-center gap-2">
            <span aria-hidden="true">
              <IconMessage2 />
            </span>
            Lancer mon audit gratuit
          </span>
        </LiquidLink>
        <LiquidLink href="/nos-services" className="z-10 ">
          <span className="flex items-center justify-center gap-2">
            <span aria-hidden="true">
              <IconApps />
            </span>
            Explorer nos services
          </span>
        </LiquidLink>
      </div>
    </div>
  );
}
