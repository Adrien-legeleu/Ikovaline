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
    tel: "09 382 28383",
  };
  const emailData = {
    email: "adrienlegeu@gmail.com",
  };
  return (
    <div className="grid lg:grid-cols-60/40 grid-cols-1  md:mt-24  max-lg:mt-8 max-lg:gap-10   justify-center items-center max-w-[1400px]">
      <div className="max-sm:px-2 max-lg:order-2">
        {isBuisnessForm ? <ContactFormBuisness /> : <ContactFormStudent />}
      </div>
      <div className="space-y-10 max-w-md  mx-auto  max-lg:order-1">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-neutral-800 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In laborum
            explicabo, inventore deleniti voluptatem assumenda. Debitis possimus
            saepe facilis aspernatur.
          </p>
          <Button
            className="text-lg p-6 "
            onClick={handleForm}
            variant={"secondary"}
          >
            {isBuisnessForm
              ? "Vous êtes étudiants"
              : "Vous êtes une entreprise"}
          </Button>
        </div>
        <div className="relative flex p-10   w-full flex-col items-center justify-center overflow-hidden rounded-3xl border bg-black md:shadow-xl">
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
