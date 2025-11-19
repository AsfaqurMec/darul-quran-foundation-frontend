import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

export default function AdminLayout(_: { children: ReactNode }): never {
  redirect('/dashboard');
}


