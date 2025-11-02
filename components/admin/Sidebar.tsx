'use client';

import Link from 'next/link';
import { useState } from 'react';

type Props = { collapsed?: boolean; onToggle?: () => void };

export default function Sidebar({ collapsed = false, onToggle }: Props): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const toggle = () => {
    setIsCollapsed((v) => !v);
    onToggle?.();
  };

  return (
    <aside className={`h-screen sticky top-0 border-r bg-white ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-200`}> 
      <div className="flex items-center justify-between p-3 border-b">
        <span className={`font-semibold ${isCollapsed ? 'hidden' : ''}`}>Admin</span>
        <button onClick={toggle} aria-label="Toggle sidebar" className="p-2 rounded hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>
        </button>
      </div>
      <nav className="p-2 space-y-1">
        <Link className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100" href="/admin">
          <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          <span className={`${isCollapsed ? 'hidden' : ''}`}>Overview</span>
        </Link>
        <Link className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100" href="/admin/users">
          <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-1.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-1.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          <span className={`${isCollapsed ? 'hidden' : ''}`}>Users</span>
        </Link>
        <Link className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100" href="/admin/activities">
          <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span className={`${isCollapsed ? 'hidden' : ''}`}>Activities</span>
        </Link>
        <Link className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100" href="/admin/gallery">
          <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5a2 2 0 0 0-2-2H5C3.89 3 3 3.9 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3.01L14.5 12l3.5 4.5H6l2.5-3z"/></svg>
          <span className={`${isCollapsed ? 'hidden' : ''}`}>Gallery</span>
        </Link>
        <Link className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100" href="/admin/notices">
          <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2z"/></svg>
          <span className={`${isCollapsed ? 'hidden' : ''}`}>Notice</span>
        </Link>
      </nav>
    </aside>
  );
}


