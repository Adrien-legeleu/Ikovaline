import About from "@/components/about/About";
import Landing from "@/components/landing/Landing";
import { Review } from "@/components/review/Review";
import Services from "@/components/servicesSection/Services";

export default function Home() {
  return (
    <div>
      <Landing />
      <About />
      <Services />
      <Review />
    </div>
  );
}
