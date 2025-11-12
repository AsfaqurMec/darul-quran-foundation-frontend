'use client';

import Button from '@/components/ui/button';
import { removeClientToken } from '@/lib/tokenUtils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AdminHeaderProps = {
  user: {
    identifier: string;
    role: string;
  };
};

export default function AdminHeader({ user }: AdminHeaderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setOpen(false);
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout request failed', error);
    } finally {
      removeClientToken();
    }
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="h-14 px-4 md:px-6 flex items-center justify-between">
        <div className="font-semibold">Admin Dashboard</div>
        <div className="relative">
          <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-full focus:outline-none">
            <img src="https://i.pravatar.cc/40" alt="admin" className="h-8 w-8 rounded-full border" />
            <span className="hidden sm:flex flex-col items-start text-left leading-tight">
              <span className="text-sm font-medium text-gray-700">{user.identifier}</span>
              <span className="text-[11px] uppercase tracking-wide text-gray-400">{user.role}</span>
            </span>
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-50">
              <a href="/admin/profile" className="block px-3 py-2 hover:bg-gray-50">Update profile</a>
              <div className="px-3 py-2">
                <Button type="button" variant="secondary" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


