import { CallToAction } from "@/components/callToAction/CallToAction";
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
      {/* <Result /> */}
      <Why />
      <CallToAction
        title="Transformez votre business aujourd'hui"
        desc="Vous êtes prêt à passer à l&lsquo;étape suivante ?  Contactez-nous pour propulser votre entreprise."
        textBtn="Contactez-nous maintenant !"
      />
    </div>
  );
}
