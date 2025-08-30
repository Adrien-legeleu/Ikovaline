'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

function useLocale() {
  const pathname = usePathname() || '/';
  return { isEN: /^\/en(\/|$)/.test(pathname) };
}

export default function ContactFormStudent({
  handleForm,
}: {
  handleForm: () => void;
}) {
  const { toast } = useToast();
  const { isEN } = useLocale();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    etude: '',
    email: '',
    tel: '',
    message: '',
    category: isEN ? 'Student' : 'Étudiant',
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
          title: isEN
            ? 'Your message has been sent successfully!'
            : 'Votre message a été envoyé avec succès !',
          description: isEN
            ? 'We will get back to you shortly.'
            : 'Nous traiterons votre message dans les plus brefs délais.',
        });
        setFormData({
          firstname: '',
          lastname: '',
          etude: '',
          email: '',
          tel: '',
          message: '',
          category: isEN ? 'Student' : 'Étudiant',
        });
      } else {
        throw new Error();
      }
    } catch {
      toast({
        variant: 'destructive',
        title: isEN ? 'An error occurred' : 'Une erreur est survenue',
        description: isEN
          ? 'Something went wrong while sending your message.'
          : "Une erreur est survenue durant l'envoi de votre message",
        action: (
          <ToastAction altText="try-again">
            {isEN ? 'Try again' : 'Réessayer'}
          </ToastAction>
        ),
      });
    }
  };

  const fieldCls =
    'rounded-3xl border border-white/50 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_6px_16px_rgba(0,0,0,.06)] ' +
    'dark:shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_22px_rgba(0,0,0,.5)] ' +
    'focus-visible:ring-1 focus-visible:ring-sky-400/60';

  return (
    <div
      className="relative group rounded-[28px] p-8 backdrop-blur-2xl overflow-hidden
        bg-[linear-gradient(135deg,rgba(255,255,255,.85),rgba(240,245,252,.45))]
        dark:bg-[linear-gradient(135deg,rgba(10,14,20,.9),rgba(10,14,20,.65))]
        border border-white/40 dark:border-[rgba(56,130,246,0.2)]
        shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)]
        dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]"
    >
      <h2 className="text-center font-extrabold text-2xl text-neutral-900 dark:text-neutral-100">
        {isEN
          ? 'Join the Ikovaline adventure!'
          : 'Rejoignez l’aventure Ikovaline !'}
      </h2>

      <p className="mt-3 max-w-md text-base mx-auto text-center leading-relaxed text-neutral-700 dark:text-neutral-300">
        {isEN ? (
          <>
            Passionate about digital? <b>Ikovaline is recruiting</b> motivated
            students to work on real projects and take part in{' '}
            <b>digital transformation</b>.
          </>
        ) : (
          <>
            Passionné par le digital ? <b>Ikovaline recrute</b> des étudiants
            motivés pour œuvrer sur des projets concrets et participer à la{' '}
            <b>transformation numérique</b> des entreprises.
          </>
        )}
      </p>

      <form className="my-8" onSubmit={onSubmit}>
        <div className="mb-4 flex flex-col md:flex-row gap-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">{isEN ? 'Last name' : 'Nom'}</Label>
            <Input
              id="firstname"
              required
              placeholder={isEN ? 'Smith' : 'Martin'}
              value={formData.firstname}
              onChange={onChange('firstname')}
              className={fieldCls}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">{isEN ? 'First name' : 'Prénom'}</Label>
            <Input
              id="lastname"
              required
              placeholder={isEN ? 'Lina' : 'Lina'}
              value={formData.lastname}
              onChange={onChange('lastname')}
              className={fieldCls}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">
            {isEN ? 'Email address' : 'Adresse mail'}
          </Label>
          <Input
            id="email"
            required
            type="email"
            placeholder={isEN ? 'lina@example.com' : 'lina@exemple.com'}
            value={formData.email}
            onChange={onChange('email')}
            className={fieldCls}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="tel">{isEN ? 'Phone' : 'Téléphone'}</Label>
          <Input
            id="tel"
            required
            placeholder={isEN ? '+33 6 00 00 00 00' : '07 00 00 00 00'}
            value={formData.tel}
            onChange={onChange('tel')}
            className={fieldCls}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="etude">
            {isEN ? 'Level of study' : 'Niveau d’études'}
          </Label>
          <Input
            id="etude"
            required
            placeholder={isEN ? 'Master' : 'Master'}
            value={formData.etude}
            onChange={onChange('etude')}
            className={fieldCls}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="message">{isEN ? 'Message' : 'Message'}</Label>
          <Textarea
            id="message"
            placeholder={
              isEN ? 'Tell us about yourself…' : 'Parlez-nous de vous…'
            }
            value={formData.message}
            onChange={onChange('message')}
            className={cn(fieldCls, 'min-h-28')}
          />
        </LabelInputContainer>

        <button
          type="submit"
          className="relative group/btn mt-10 block h-14 w-full rounded-full text-[15px] font-semibold tracking-wide text-white bg-[linear-gradient(135deg,#2563EB,#00A8E8)]"
        >
          {isEN ? 'Send' : 'Envoyer'}
        </button>

        <div className="my-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

        <LiquidButton type="button" onClick={handleForm} className="w-full">
          {isEN ? 'Business?' : 'Entreprise ?'}
        </LiquidButton>
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
