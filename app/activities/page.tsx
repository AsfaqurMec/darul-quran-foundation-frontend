import { redirect } from 'next/navigation';

export default async function ActivitiesRedirect(): Promise<never> {
  redirect('/programs');
}


