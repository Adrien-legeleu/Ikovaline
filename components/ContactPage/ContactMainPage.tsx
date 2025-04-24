"use client";

import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import ScriptCopyBtn from "@/components/ui/script-copy-btn";
import { useState } from "react";
import ContactFormStudent from "./contactForm/ContactFormStudent";
import ContactFormBusiness from "./contactForm/ContactFormBusiness";

export default function ContactMainPage() {
  const [isBuisnessForm, setIsBuisnessForm] = useState(true);
  const handleForm = () => {
    setIsBuisnessForm(!isBuisnessForm);
  };

  const telData = {
    tel: "07 85 90 22 38",
  };
  const emailData = {
    email: "contact@ikovaline.com",
  };

  return (
    <div className="grid lg:grid-cols-60/40 font-poppins max-sm:px-4 grid-cols-1 md:mt-24 mt-20  max-lg:gap-10 justify-center items-start max-w-[1400px] mx-auto">
      <h1 className="text-3xl  px-6 font-poppins  lg:hidden font-semibold max-w-4xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Contactez notre agence pour booster votre présence digitale
      </h1>
      <div className=" max-lg:order-2">
        {isBuisnessForm ? (
          <ContactFormBusiness handleForm={handleForm} />
        ) : (
          <ContactFormStudent handleForm={handleForm} />
        )}
      </div>
      <div className="space-y-10 max-w-md mx-auto font-poppins max-lg:order-1 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-neutral-800 dark:text-neutral-300 font-semibold">
            {isBuisnessForm ? (
              <>
                Vous êtes une entreprise à la recherche d&apos;une{" "}
                <strong>agence de marketing digital</strong> fiable ? Ikovaline
                vous aide à <strong>optimiser votre présence en ligne</strong>,
                générer plus de prospects qualifiés et réussir votre{" "}
                <strong>transformation numérique</strong>.
              </>
            ) : (
              <>
                Étudiant passionné par le digital ? Rejoignez une équipe
                dynamique et
                <strong>
                  {" "}
                  boostez vos compétences en marketing numérique
                </strong>{" "}
                au sein d&apos;un projet stimulant.
              </>
            )}
          </p>
          <Button
            className="text-lg p-6"
            onClick={handleForm}
            variant={"secondary"}
          >
            {isBuisnessForm
              ? "Vous êtes étudiant ?"
              : "Vous êtes une entreprise ?"}
          </Button>
        </div>
        <div className="relative flex p-10 w-full flex-col  items-center justify-center overflow-hidden rounded-3xl border bg-black md:shadow-xl">
          <ScriptCopyBtn
            showMultiplePackageOptions={false}
            codeLanguage="shell"
            lightTheme="nord"
            darkTheme="vitesse-dark"
            commandMap={telData}
          />
          <ScriptCopyBtn
            showMultiplePackageOptions={false}
            codeLanguage="shell"
            lightTheme="nord"
            darkTheme="vitesse-dark"
            commandMap={emailData}
          />
          <Particles
            className="absolute inset-0 z-0 h-full w-full"
            quantity={100}
            ease={80}
            color={"#ffffff"}
            refresh
          />
        </div>
      </div>
    </div>
  );
}
