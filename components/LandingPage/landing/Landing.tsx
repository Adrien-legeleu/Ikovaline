import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { TextAnimate } from "@/components/ui/text-animate";

export default function Landing() {
  return (
    <BackgroundBeamsWithCollision>
      <h1 className="text-4xl font-poppins  md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Votre succès commence ici avec <br /> <Cover>Ikovaline</Cover>
      </h1>

      <TextAnimate
        animation="blurInUp"
        by="word"
        className="text-muted-foreground font-poppins  max-w-lg text-center text-lg"
      >
        Ikovaline, expert en marketing digital, transforme vos ambitions en
        réalités en boostant votre visibilité et vos performances en ligne.
      </TextAnimate>
      <div className="flex gap-4 font-poppins ">
        <Button>Nous-contactez</Button>
        <Button variant={"secondary"}>Explorer nos services</Button>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
