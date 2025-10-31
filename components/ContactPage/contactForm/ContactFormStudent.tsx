// components/contactForm/ContactFormStudent.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ContactFormStudent({
  onSwitch,
}: {
  onSwitch: () => void;
}) {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    etude: '',
    email: '',
    tel: '',
    message: '',
    category: 'Étudiant',
  });

  const onChange =
    (id: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((s) => ({ ...s, [id]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({
          title: 'Message envoyé !',
          description: 'Nous revenons vers vous très vite.',
        });
        setFormData({
          firstname: '',
          lastname: '',
          etude: '',
          email: '',
          tel: '',
          message: '',
          category: 'Étudiant',
        });
      } else throw new Error();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Une erreur est survenue',
        description: 'Problème pendant l’envoi du message.',
        action: <ToastAction altText="Réessayer">Réessayer</ToastAction>,
      });
    }
  };

  const fieldCls =
    'rounded-3xl border-none py-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_6px_16px_rgba(0,0,0,.06)] ' +
    'dark:shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_22px_rgba(0,0,0,.5)] ';

  return (
    <div
      className="relative overflow-hidden rounded-[3rem] p-8 backdrop-blur-2xl
      bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(240,245,252,.5))]
      dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.6))]
      border border-white/50 dark:border-white/10
      shadow-[0_18px_60px_rgba(6,24,44,.12)] dark:shadow-[0_18px_60px_rgba(0,0,0,.65)]"
    >
      <h2 className="text-center text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
        Rejoignez l’aventure Ikovaline !
      </h2>

      <p className="mt-3 mx-auto max-w-md text-center text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
        Passionné(e) par le digital ? <b>Ikovaline recrute</b> des étudiants
        motivés sur des projets concrets pour la
        <b> transformation numérique</b> des entreprises.
      </p>

      <form className="my-8" onSubmit={onSubmit}>
        <div className="mb-6 flex flex-col gap-6 md:flex-row">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-xs ml-1">
              Nom
            </Label>
            <Input
              id="firstname"
              required
              placeholder="Martin"
              value={formData.firstname}
              onChange={onChange('firstname')}
              className={fieldCls}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-xs ml-1">
              Prénom
            </Label>
            <Input
              id="lastname"
              required
              placeholder="Lina"
              value={formData.lastname}
              onChange={onChange('lastname')}
              className={fieldCls}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="email" className="text-xs ml-1">
            Adresse mail
          </Label>
          <Input
            id="email"
            required
            type="email"
            placeholder="lina@exemple.com"
            value={formData.email}
            onChange={onChange('email')}
            className={fieldCls}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="tel" className="text-xs ml-1">
            Téléphone
          </Label>
          <Input
            id="tel"
            required
            placeholder="07 00 00 00 00"
            value={formData.tel}
            onChange={onChange('tel')}
            className={fieldCls}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="etude" className="text-xs ml-1">
            Niveau d’études
          </Label>
          <Input
            id="etude"
            required
            placeholder="Master"
            value={formData.etude}
            onChange={onChange('etude')}
            className={fieldCls}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="message" className="text-xs ml-1">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Parlez-nous de vous…"
            value={formData.message}
            onChange={onChange('message')}
            className={cn(fieldCls, 'min-h-28')}
          />
        </LabelInputContainer>

        <button
          type="submit"
          className="mt-8 block h-14 w-full rounded-3xl text-[15px] font-semibold tracking-wide text-white bg-primary"
        >
          Envoyer
        </button>

        <div className="my-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

        <button
          type="button"
          onClick={onSwitch}
          className="h-14 w-full rounded-3xl font-semibold text-neutral-800 dark:text-neutral-100 border border-white/60 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60"
        >
          Entreprise ?
        </button>
      </form>
    </div>
  );
}

function LabelInputContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
}
