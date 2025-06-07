"use client";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { IconApps, IconMessage2, IconShieldCheck } from "@tabler/icons-react";
import { Glow } from "@/components/ui/glow";
import { AnimatedText } from "@/components/ui/hand-writing-text";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";

export default function Landing() {
  return (
    <div className="relative flex justify-center items-center flex-col gap-8  py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
      <div className="flex flex-col">
        <Link
          href="/about/#notre-garantie"
          className=" mx-auto flex items-center justify-center "
        >
          <motion.div
            className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] "
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={cn(
                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#8bacff]/50 via-[#42b8fd]/50 to-[#5fb8f3]/50 bg-[length:300%_100%] p-[1px]"
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
              }}
            />
            <IconShieldCheck
              className="ml-1 size-4 stroke-blue-400 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
            />
            <hr className="mx-2 h-4 w-px shrink-0 bg-blue-400" />
            <AnimatedGradientText className="text-sm font-medium">
              Satisfait ou remboursé.
            </AnimatedGradientText>
          </motion.div>
        </Link>
        <motion.h1
          initial={false} // ✅ Pas d’animation retardée
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }} // ✅ Très léger fondu seulement
          className="text-4xl md:px-0 px-6 lg:!leading-[70px] md:leading-[60px] leading-[50px]  font-bold md:text-5xl lg:text-6xl max-w-4xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-800 dark:from-neutral-300 dark:via-white dark:to-white"
        >
          Ikovaline,
          <span className="inline-flex p-2">
            <AnimatedText
              text="l'agence"
              textClassName="text-neutral-800 dark:text-neutral-100"
              underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
              underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
              underlineDuration={1.5}
            />
          </span>
          digitale qui propulse votre business !
        </motion.h1>
      </div>

      <TextAnimate
        animation="blurInUp"
        by="word"
        className="text-muted-foreground dark:text-neutral-400  max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
      >
        Ikovaline, la start-up spécialisée en SEO, création de site web et
        publicité en ligne, pour booster votre visibilité et vos performances
        digitales.
      </TextAnimate>

      <div className="mt-10 flex max-sm:flex-col-reverse items-center justify-center max-sm:gap-3 gap-5">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link href="/contact">
            <AnimatedBorderButton>
              <span className="flex items-center justify-center gap-2">
                <span aria-hidden="true">
                  <IconMessage2 />
                </span>
                Discuter de votre stratégie digitale
              </span>
            </AnimatedBorderButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/nos-services">
            <AnimatedBorderButton>
              <span className="flex items-center justify-center gap-2">
                <span aria-hidden="true">
                  <IconApps />
                </span>
                Voir nos services marketing et digitaux
              </span>
            </AnimatedBorderButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
