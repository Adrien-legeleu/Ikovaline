// components/ClientSpace/Chat/ClientChatShell.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ThreadHeader from './Threadheader';
import MessageList from './MessageList';
import Composer from './Composer';
import { registerServiceWorker, askPermission } from '@/lib/notifications';

async function ensureSWAndPermission() {
  try {
    await registerServiceWorker();
    if ('Notification' in window && Notification.permission === 'default') {
      await askPermission();
    }
  } catch {}
}

export default function ClientChatShell({
  threadId,
  currentUserId,
  initial,
  projects,
}: {
  threadId: string;
  currentUserId: string;
  initial: any[];
  projects: { id: string; title: string }[];
}) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [unread, setUnread] = useState<Record<string, number>>({ __ALL__: 0 });

  useEffect(() => {
    ensureSWAndPermission();
  }, []);

  function onArriveOutsideFilter() {
    setUnread((m) => ({ ...m, __ALL__: (m.__ALL__ || 0) + 1 }));
  }
  function onSeen() {
    setUnread((m) => ({
      ...m,
      __ALL__: 0,
      ...(activeProjectId ? { [activeProjectId]: 0 } : {}),
    }));
  }

  return (
    <>
      {/* Header chips — glass, sans bordures */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="px-4 py-3 z-20 "
      >
        <ThreadHeader
          projects={projects}
          activeProjectId={activeProjectId}
          onFilter={setActiveProjectId}
          unread={unread as any}
        />
      </motion.div>

      {/* Messages list (scroll area) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-0  relative !overflow-hidden "
      >
        <div className="bg-white z-10 h-20 blur-md fixed top-5 w-[102%] -left-5"></div>
        <MessageList
          threadId={threadId}
          initial={initial}
          projectId={activeProjectId}
          currentUserId={currentUserId}
          onArriveOutsideFilter={onArriveOutsideFilter}
          onSeen={onSeen}
        />
      </motion.div>

      {/* Composer */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 w-full z-20"
      >
        <Composer
          threadId={threadId}
          projectId={activeProjectId}
          currentUserId={currentUserId}
        />
      </motion.div>
    </>
  );
}
