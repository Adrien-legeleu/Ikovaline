import { CallToAction } from "@/components/callToAction/CallToAction";
import FAQ from "@/components/ServicesPage/FAQ/FAQ";
import Landing from "@/components/ServicesPage/landing/Landing";
import { Service1 } from "@/components/ServicesPage/servicesComponents/Service1";
import { Service2 } from "@/components/ServicesPage/servicesComponents/Service2";
import Why from "@/components/ServicesPage/why/Why";

export default function page() {
  return (
    <div>
      <Landing />
      <Service1 />
      <Service2 />

      <Why />
      <CallToAction
        title="Boostez votre entreprise dès aujourd'hui !"
        desc="Prêt à franchir un cap décisif ? Contactez-nous dès maintenant pour accélérer la croissance de votre business."
        textBtn="Prenez contact avec nous !"
      />
      <FAQ />
    </div>
  );
}
