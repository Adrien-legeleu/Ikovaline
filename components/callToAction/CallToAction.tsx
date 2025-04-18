"use client";
import Particles from "../ui/particles";
import { Button } from "../ui/button";
import Link from "next/link";

interface ICallToAction {
  title: string;
  desc: string;
  textBtn: string;
}

export function CallToAction({ title, desc, textBtn }: ICallToAction) {
  return (
    <div className="flex items-center justify-center md:px-10 lg:px-0 xs:px-5 px-2">
      <div className="relative flex  md:p-16 p-10 mb-10  md:gap-10 gap-8 max-w-5xl   w-full flex-col items-center justify-center overflow-hidden rounded-3xl border bg-black md:shadow-xl">
        <h2 className="md:text-3xl  text-2xl text-center font-semibold text-white">
          {title}
        </h2>
        <p className="text-center text-neutral-200 max-w-xl text-sm md:text-lg">
          {desc}
        </p>
        <Link href="/contact" className="inline-block z-20">
          <Button
            variant={"secondary"}
            className="md:text-lg text-base py-6 rounded-3xl px-6  z-30"
          >
            {textBtn}
          </Button>
        </Link>
        <Particles
          className="absolute inset-0 z-0 h-full w-full"
          quantity={100}
          ease={80}
          color={"#ffffff"}
          refresh
        />
      </div>
    </div>
  );
}
