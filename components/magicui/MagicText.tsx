"use client";

import  BlurText  from "@/components/ui/animated-blur-text";

export const MagicText = ({
  text,
}: {
  text: string;

}) => {
  return (
    <div className="flex justify-center items-center px-5 ">
<BlurText
  text={text}
  delay={150}
  animateBy="words"
  direction="top"
  className="lg:text-3xl md:text-2xl text-xl  text-black text-center dark:text-white "
/>
</div>
  );
};
