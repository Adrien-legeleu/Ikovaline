import { CallToAction } from "@/components/callToAction/CallToAction";
import About from "@/components/LandingPage/about/About";
import Landing from "@/components/LandingPage/landing/Landing";
import { Review } from "@/components/LandingPage/review/Review";
import Services from "@/components/LandingPage/servicesSection/Services";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Landing />
      <About />
      <section id="services">
        <Services />
      </section>
      <CallToAction
        title="Boostez votre visibilité maintenant !"
        desc="Ikovaline vous aide à atteindre vos objectifs marketing. Prenez contact dès aujourd'hui et démarrez votre transformation digitale."
        textBtn="Contactez-nous"
      />
      <Review />
    </div>
  );
}
