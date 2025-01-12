"use client";

import { useState } from "react";
import Particles from "../ui/particles";
import { Button } from "../ui/button";

export function CallToAction() {
  return (
    <div className="relative flex  p-16 mb-10 mx-auto  gap-10 max-w-5xl   w-full flex-col items-center justify-center overflow-hidden rounded-3xl border bg-black md:shadow-xl">
      <h2 className="text-3xl font-semibold text-white">
        Alord pret à passer à l'action ?{" "}
      </h2>
      <p className="text-center text-neutral-200 max-w-3xl txt-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        accusantium voluptate delectus distinctio aut possimus vel.
      </p>
      <Button
        variant={"destructive"}
        className="text-lg py-6 rounded-xl px-6 z-20"
      >
        Contactez-nous dès maintenant !
      </Button>
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </div>
  );
}
