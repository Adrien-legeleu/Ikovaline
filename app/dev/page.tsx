// app/dev/page.tsx
import { redirect } from 'next/navigation';

export default function DevIndexRedirect() {
  redirect('/dev/projects');
}
