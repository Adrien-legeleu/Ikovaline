"use client";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { IconShieldCheck } from "@tabler/icons-react";

export default function Landing() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col">
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
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
            className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
          />
          <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Satisfait ou remboursé.
          </AnimatedGradientText>
        </div>
        <h1 className="text-3xl md:px-0 px-6 font-poppins  md:text-4xl lg:text-5xl font-semibold max-w-4xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Votre partenaire pour développer, piloter et propulser vos projets en
          <Cover>toute confiance !</Cover>
        </h1>
      </div>

      <TextAnimate
        animation="blurInUp"
        by="word"
        className="text-muted-foreground dark:text-neutral-400 font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
      >
        Ikovaline, la start-up qui combine stratégie, pilotage de projet et
        marketing digital pour propulser votre business.
      </TextAnimate>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        viewport={{ amount: 0.5 }}
        className="font-poppins mt-10 flex max-sm:flex-col-reverse items-center justify-center max-sm:gap-3 gap-5"
      >
        <Link href={"/contact"}>
          {" "}
          <Button>Contactez-nous</Button>
        </Link>

        <Link href={"/nos-services"}>
          <Button variant={"secondary"}>Explorer nos services</Button>
        </Link>
      </motion.div>
    </BackgroundBeamsWithCollision>
  );
}
