"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import { useState } from "react";

export default function ContactFormStudent() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    message: "",
    category: "Etudiant",
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("message envoyé");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          tel: "",
          message: "",
          category: "Etudiant",
        });
      } else {
        alert("une erreur est survenue");
      }
    } catch (error) {
      console.error("error lors de l'envoie", error);
      alert(error);
    }
  };
  return (
    <div className="max-w-lg w-full mx-auto  rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-extrabold text-2xl text-neutral-800 dark:text-neutral-100">
        Rejoignez l'aventure Ikovaline !
      </h2>
      <p className="text-neutral-600 text-base max-w-md mt-3 leading-relaxed dark:text-neutral-300">
        Vous êtes étudiant et passionné par le digital ? Contactez-nous pour en
        savoir plus sur nos opportunités et participez à la transformation
        numérique des entreprises.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              required
              id="firstname"
              placeholder="Tyler"
              value={formData.firstname}
              type="text"
              onChange={handleChangeValue}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              required
              id="lastname"
              placeholder="Durden"
              value={formData.lastname}
              type="text"
              onChange={handleChangeValue}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            required
            value={formData.email}
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
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

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Envoyer
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Vous ête une entreprise ?
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
