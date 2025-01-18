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
        title="Augmentez votre visibilité dès aujourd'hui !"
        desc="Ikovaline est votre partenaire pour atteindre vos objectifs marketing et réussir votre transformation digitale. Prenez contact sans attendre !"
        textBtn="Commencez maintenant !"
      />

      <Review />
    </div>
  );
}
