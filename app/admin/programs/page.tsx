import { redirect } from 'next/navigation';

export default function AdminPrograms(): never {
  redirect('/dashboard/programs');
}

