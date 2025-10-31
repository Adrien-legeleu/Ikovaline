'use client';

import ProjectWizard from '@/components/ClientSpace/ProjectWizard';

export default function NewProjectPage() {
  return (
    <div className="min-h-[100dvh] grid place-items-center p-6">
      <div className="w-full max-w-2xl">
        <ProjectWizard
          includeProfileStep={false}
          intro={{
            title: 'Créer un nouveau projet',
            description:
              'Décris ton nouveau besoin. Nous l’ajoutons à ton espace et revenons vers toi rapidement.',
          }}
          onDone={(id) => {
            // redirection vers le dashboard ou la page du projet
            window.location.href = `/ (client )/projects/${id}`.replace(
              ' ',
              ''
            );
          }}
        />
      </div>
    </div>
  );
}
