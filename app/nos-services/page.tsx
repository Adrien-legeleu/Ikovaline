import { CallToAction } from "@/components/callToAction/CallToAction";
import Landing from "@/components/ServicesPage/landing/Landing";
import Result from "@/components/ServicesPage/result/Result";
import { Service1 } from "@/components/ServicesPage/servicesComponents/Service1";
import { Service2 } from "@/components/ServicesPage/servicesComponents/Service2";
import Why from "@/components/ServicesPage/why/Why";

export default function page() {
  return (
    <div>
      <Landing />
      <Service1 />
      <Service2 />
      <Result />
      <Why />
      <CallToAction />
    </div>
  );
}
