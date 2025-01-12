import { CallToAction } from "@/components/callToAction/CallToAction";
import About from "@/components/LandingPage/about/About";
import Landing from "@/components/LandingPage/landing/Landing";
import { Review } from "@/components/LandingPage/review/Review";
import Services from "@/components/LandingPage/servicesSection/Services";

export default function Home() {
  return (
    <div>
      <Landing />
      <About />
      <Services />
      <CallToAction />
      <Review />
    </div>
  );
}
