"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ContactFormBusiness({
  handleForm,
}: {
  handleForm: () => void;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    buisnessname: "",
    etude: "",
    email: "",
    tel: "",
    message: "",
    category: "Entreprise",
    secteur: "",
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    console.log(formData.email);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("message envoyé");
        toast({
          title: "Votre message a été envoyé avec succès !",
          description:
            "Nous traiterons votre message dans les plus brefs délais.",
        });
        setFormData({
          firstname: "",
          lastname: "",
          buisnessname: "",
          etude: "",
          email: "",
          tel: "",
          message: "",
          category: "Entreprise",
          secteur: "",
        });
      } else {
        console.log(response);
        toast({
          variant: "destructive",
          title: "une erreur est survenue",
          description:
            "Une erreur est survenue durant l'envoie de votre message",
          action: <ToastAction altText="Try again">Réessayer</ToastAction>,
        });
      }
    } catch (error) {
      console.error("error lors de l'envoie", error);
      toast({
        variant: "destructive",
        title: "une erreur est survenue",
        description: "Une erreur est survenue durant l'envoie de votre message",
        action: <ToastAction altText="Try again">Réessayer</ToastAction>,
      });
    }
  };
  return (
    <div className="max-w-lg w-full mx-auto font-poppins  rounded-3xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-extrabold lg:hidden text-2xl text-neutral-800 sm:text-left text-center dark:text-neutral-100">
        Une question ? Un projet ?
      </h2>
      <h1 className="font-extrabold max-lg:hidden text-2xl text-neutral-800 sm:text-left text-center dark:text-neutral-100">
        Une question ? Un projet ?
      </h1>
      <p className="text-neutral-600 text-base max-w-md mt-3 leading-relaxed dark:text-neutral-300">
        Remplissez le formulaire ci-dessous pour être recontacté par notre
        équipe. Ensemble, nous allons{" "}
        <strong className="font-semibold">
          booster votre visibilité en ligne
        </strong>
        ,<strong className="font-semibold">générer plus de leads</strong> et
        accélérer la{" "}
        <strong className="font-semibold">
          croissance de votre entreprise
        </strong>{" "}
        grâce à une stratégie digitale sur mesure.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Nom</Label>
            <Input
              required
              id="firstname"
              placeholder="Adrien"
              value={formData.firstname}
              type="text"
              onChange={handleChangeValue}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Prénom</Label>
            <Input
              required
              id="lastname"
              placeholder="Legeleux"
              value={formData.lastname}
              type="text"
              onChange={handleChangeValue}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Adresse mail</Label>
          <Input
            required
            value={formData.email}
            id="email"
            placeholder="adrienlegeleu@gmail.com"
            type="email"
            onChange={handleChangeValue}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="buisnessname">Nom Entreprise</Label>
          <Input
            required
            value={formData.buisnessname}
            id="buisnessname"
            placeholder="IKovaline"
            type="text"
            onChange={handleChangeValue}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="tel">Téléphone</Label>
          <Input
            required
            id="tel"
            value={formData.tel}
            placeholder="07 67 62 89 82"
            type="tel"
            onChange={handleChangeValue}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="secteur">Secteur</Label>
          <Input
            required
            id="secteur"
            value={formData.secteur}
            placeholder="architecture"
            type="text"
            onChange={handleChangeValue}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="message">Message</Label>
          <Textarea
            placeholder="Entrez votre message"
            name="message"
            id="message"
            onChange={handleChangeValue}
            value={formData.message}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br mt-10 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-3xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Envoyer
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2  items-center justify-center px-4 w-full text-black rounded-3xl h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={handleForm}
          >
            <span className="text-neutral-700 dark:text-neutral-300 text-center text-sm">
              Étudiant ?
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
