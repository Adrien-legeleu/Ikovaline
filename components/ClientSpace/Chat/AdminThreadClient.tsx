// ---- client shell
'use client';
import { useState } from 'react';
import ThreadHeader from './Threadheader';
import MessageList from './MessageList';
import Composer from './Composer';

export default function AdminChatShell({
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

  return (
    <>
      <div className="p-4 border-b">
        <ThreadHeader
          projects={projects}
          activeProjectId={activeProjectId}
          onFilter={setActiveProjectId}
        />
      </div>
      <div className="min-h-0">
        <MessageList
          threadId={threadId}
          initial={initial}
          projectId={activeProjectId}
          currentUserId={currentUserId}
        />
      </div>
      <Composer
        threadId={threadId}
        projectId={activeProjectId}
        currentUserId={currentUserId}
      />{' '}
    </>
  );
}
