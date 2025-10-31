'use client';

import { motion } from 'framer-motion';
import ProjectWizard from '@/components/ClientSpace/ProjectWizard';

export default function DemarrerPage() {
  // Page “démarrer” en mode plein écran, SANS intro
  return (
    <motion.div
      className="relative h-screen max-h-screen w-full bg-background text-foreground"
      layout
      transition={{ type: 'spring', stiffness: 180, damping: 28 }}
    >
      <div className="h-full w-full mx-auto p-6 md:p-10">
        <ProjectWizard includeProfileStep onStepChange={() => {}} />
      </div>
    </motion.div>
  );
}
