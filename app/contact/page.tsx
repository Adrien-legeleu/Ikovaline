"use client";
import ContactFormBuisness from "@/components/ContactPage/contactForm/ContactFormBuisness";
import ContactFormStudent from "@/components/ContactPage/contactForm/ContactFormStudent";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import ScriptCopyBtn from "@/components/ui/script-copy-btn";
import { useState } from "react";

export default function Page() {
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
    <div className="grid lg:grid-cols-60/40 font-poppins max-sm:px-4 grid-cols-1 md:mt-24 max-lg:mt-8 max-lg:gap-10 justify-center items-center max-w-[1400px] mx-auto">
      <div className=" max-lg:order-2">
        {isBuisnessForm ? (
          <ContactFormBuisness handleForm={handleForm} />
        ) : (
          <ContactFormStudent handleForm={handleForm} />
        )}
      </div>
      <div className="space-y-10 max-w-md mx-auto font-poppins max-lg:order-1 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-neutral-800 dark:text-neutral-300  font-semibold">
            {isBuisnessForm
              ? "Vous êtes une entreprise souhaitant optimiser sa présence en ligne et accélérer sa croissance ? Ikovaline vous accompagne dans votre transformation numérique pour booster votre visibilité et vos performances."
              : "Vous êtes étudiant et passionné par le digital ? Rejoignez Ikovaline pour contribuer à la transformation numérique des entreprises tout en développant vos compétences dans un environnement innovant."}
          </p>
          <Button
            className="text-lg p-6"
            onClick={handleForm}
            variant={"secondary"}
          >
            {isBuisnessForm ? "Étudiant ?" : "Entreprise ?"}
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
