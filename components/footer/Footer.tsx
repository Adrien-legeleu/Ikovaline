import React from "react";
import { TextHoverEffect } from "../ui/text-hover-effect";

export default function Footer() {
  return (
    <div>
      <div className="lg:h-[16rem] md:h-[12rem] sm:h-[8rem] h-[5rem] flex items-center justify-center">
        <TextHoverEffect text="IKOVALINE" />
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
