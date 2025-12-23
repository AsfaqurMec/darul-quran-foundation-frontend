'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState } from 'react';
import { useI18n } from '../../components/i18n/LanguageProvider';

type Props = { collapsed?: boolean; onToggle?: () => void };

type NavItem = {
  href: Route;
  label: string;
  icon: React.ReactElement;
};

const buildIcon = (path: string) => (
  <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor">
    <path d={path} />
  </svg>
);

export default function Sidebar({ collapsed = false, onToggle }: Props) {
  const { t } = useI18n();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const toggle = () => {
    setIsCollapsed((v) => !v);
    onToggle?.();
  };

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        href: '/dashboard' as Route,
        label: t('overview'),
        icon: buildIcon('M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'),
      },
      {
        href: '/dashboard/programs' as Route,
        label: t('activities'),
        icon: buildIcon('M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z'),
      },
      {
        href: '/dashboard/donation-categories' as Route,
        label: t('donationCategories'),
        icon: buildIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'),
      },
      {
        href: '/dashboard/donations' as Route,
        label: t('donations') || 'Donations',
        icon: buildIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'),
      },
      // {
      //   href: '/dashboard/activities' as Route,
      //   label: t('activities'),
      //   icon: buildIcon('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'),
      // },
      {
        href: '/dashboard/gallery' as Route,
        label: t('gallery'),
        icon: buildIcon('M21 19V5a2 2 0 0 0-2-2H5C3.89 3 3 3.9 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3.01L14.5 12l3.5 4.5H6l2.5-3z'),
      },
      {
        href: '/dashboard/notices' as Route,
        label: t('notice'),
        icon: buildIcon('M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2z'),
      },
      {
        href: '/dashboard/blogs' as Route,
        label: t('blog'),
        icon: buildIcon('M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'),
      },
      {
        href: '/dashboard/hero' as Route,
        label: t('heroImages'),
        icon: buildIcon('M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'),
      },
      {
        href: '/dashboard/users' as Route,
        label: t('users'),
        icon: buildIcon('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'),
      },
     
      {
        href: '/dashboard/volunteers' as Route,
        label: t('volunteerApplications'),
        icon: buildIcon('M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'),
      },
      {
        href: '/dashboard/members' as Route,
        label: t('memberApplications'),
        icon: buildIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'),
      },
      {
        href: '/dashboard/admin-users/new' as Route,
        label: t('createAdmin'),
        icon: buildIcon('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'),
      },
    ],
    [t]
  );

  return (
    <aside className={`h-screen sticky top-0 border-r bg-white ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-200`}>
      <div className="flex items-center justify-between p-3 border-b">
        <span className={`font-semibold ${isCollapsed ? 'hidden' : ''}`}>{t('dashboard')}</span>
        <button onClick={toggle} aria-label="Toggle sidebar" className="p-2 rounded hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          </svg>
        </button>
      </div>
      <nav className="p-2 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100" href={item.href}>
            {item.icon}
            <span className={`${isCollapsed ? 'hidden' : ''}`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}


