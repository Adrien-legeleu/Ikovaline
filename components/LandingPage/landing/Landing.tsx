import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";

export default function Landing() {
  return (
    <BackgroundBeamsWithCollision>
      <h1 className="text-3xl sm:px-0 px-5 font-poppins  md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center md:mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Boostez votre présence en ligne et atteignez <Cover>le succès !</Cover>
      </h1>

      <TextAnimate
        animation="blurInUp"
        by="word"
        className="text-muted-foreground font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
      >
        Ikovaline, expert en marketing digital, transforme vos ambitions en
        réalités en boostant votre visibilité et vos performances en ligne.
      </TextAnimate>
      <div className="flex gap-4 font-poppins ">
        <Link href={"/contact"}>
          {" "}
          <Button>Nous-contactez</Button>
        </Link>

        <Link href={"/nos-services"}>
          <Button variant={"secondary"}>Explorer nos services</Button>
        </Link>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
