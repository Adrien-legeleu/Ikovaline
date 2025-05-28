"use client";

import { FranceMap } from "@/components/ui/france-map";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Map() {
  return (
    <div className="py-40 w-full space-y-10">
      <div className="max-w-xl mx-auto px-5 text-center">
        <h2 className="font-bold text-4xl dark:text-white text-black">
          Ikovaline accompagne ses clients partout en France.
        </h2>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          De Paris à Marseille, en passant par Lyon ou Bordeaux, nous aidons les
          entreprises à se rendre visibles, à automatiser, et à mieux convertir.
        </p>
      </div>

      <div className="relative">
        <FranceMap
          dots={[
            { start: { lat: 48.4, lng: 2.3 }, end: { lat: 45.3, lng: 3.8 } },
            { start: { lat: 48.4, lng: 2.3 }, end: { lat: 43, lng: 1.5 } },
            { start: { lat: 48.4, lng: 2.3 }, end: { lat: 44.2, lng: 0.1 } },
            { start: { lat: 48.4, lng: 2.3 }, end: { lat: 47.1, lng: -1.2 } },
          ]}
        />

        <div className="max-md:grid max-sm:grid-cols-1 px-5  max-md:grid-cols-2 max-md:place-items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:absolute relative xl:top-5 md:top-10 md:left-5 lg:left-10 xl:left-32 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px] bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                ❓Votre site vous apporte-t-il vraiment des clients ?
              </h3>
              <p className=" text-xs xl:text-sm">
                Nous concevons des sites clairs, modernes et pensés pour
                convertir.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="md:absolute relative  md:top-28 xl:top-32 xl:right-20 md:right-10 lg:right-16 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px] bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                ❓Personne ne vous trouve sur Google ?
              </h3>
              <p className=" text-xs xl:text-sm">
                On booste votre visibilité avec des stratégies SEO & SEA
                efficaces.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="md:absolute relative md:bottom-20 xl:bottom-40 md:right-16 lg:right-24 xl:right-32 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px] bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                ❓Vous passez trop de temps sur des tâches répétitives ?
              </h3>
              <p className=" text-xs xl:text-sm">
                Automatisations sur mesure pour gagner du temps et scaler sans
                stress.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="md:absolute relative  md:bottom-[35%] lg:bottom-[40%] md:left-12 lg:left-20 z-20  max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px]  bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                ❓Pas de stratégie digitale claire ?
              </h3>
              <p className=" text-xs xl:text-sm">
                On vous guide étape par étape, avec des actions concrètes et
                mesurables.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl px-2 mx-auto text-center flex flex-col items-center justify-center space-y-4 md:space-y-8">
        <h3 className="text-2xl md:text-4xl font-semibold">
          Besoin d’un audit rapide ?
        </h3>
        <Button className="max-sm:text-sm md:text-lg py-6">
          Contactez-nous — réponse sous 24h
        </Button>
      </div>
    </div>
  );
}
