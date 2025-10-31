import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

export default function ProjectChatRedirect({ params }: Props) {
  // Si tu veux cibler un filtre projet côté /messages plus tard :
  // redirect(`/messages?project=${params.id}`)
  redirect('/messages');
}
