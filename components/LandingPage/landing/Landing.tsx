"use client";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <BackgroundBeamsWithCollision>
      <h1 className="text-3xl md:px-0 px-6 font-poppins  md:text-4xl lg:text-5xl font-semibold max-w-4xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Votre partenaire pour développer, piloter et propulser vos projets en
        <Cover>toute confiance !</Cover>
      </h1>

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
