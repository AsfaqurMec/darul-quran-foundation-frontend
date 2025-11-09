'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Button from '@/components/ui/Button';
import Container from '@/components/layout/Container';
import logo from '@/public/img/logo-foundation.png';
import Image from 'next/image';
import { Route } from 'next';
import { useI18n } from '@/components/i18n/LanguageProvider';

type NavItem = { href: string; label: string };

const navItems: ReadonlyArray<NavItem> = [
  { href: '', label: 'হোম' },
  { href: 'about', label: 'আমাদের সম্পর্কে' },
  { href: 'activities', label: 'কার্যক্রমসমূহ' },
  { href: 'gallery', label: 'গ্যালারি' },
  { href: 'get-involved', label: 'আমাদের সাথে যুক্ত হন' },
  { href: 'blog', label: 'ব্লগ' },
  { href: 'notice', label: 'নোটিশ' },
  { href: 'contact', label: 'যোগাযোগ' },
];

export default function Header(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const { lang, setLang, t } = useI18n();
  const [langOpen, setLangOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-200">
      <Container className="h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md border border-gray-300" onClick={() => setOpen(true)} aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 5.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" /></svg>
          </button>
          <Link href="/" className="inline-flex items-center gap-2">
           <Image src={logo} alt="logo" width={76} height={76} />
           <span className="font-semibold">দারুল কুরআন ফাউন্ডেশন</span>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {navItems.map((item: NavItem, index: number) => {
            const href = `/${item.href}`;
            const isActive = pathname === href || (href === '/' && pathname === '/') || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={index}
                className={`relative hover:text-brand transition-base ${isActive ? 'text-brand' : ''}`}
                href={href as Route}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 top-6 left-0 right-0 h-0.5 bg-brand"></span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <span>{lang === 'bn' ? 'বাংলা' : lang === 'en' ? 'English' : 'العربية'}</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
            </button>
            {langOpen && (
              <ul className="absolute right-0 mt-1 min-w-[140px] rounded-md border border-gray-200 bg-white shadow-lg z-50" role="listbox">
                <li>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={()=>{setLang('bn'); setLangOpen(false);}}>বাংলা</button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={()=>{setLang('en'); setLangOpen(false);}}>English</button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={()=>{setLang('ar'); setLangOpen(false);}}>العربية</button>
                </li>
              </ul>
            )}
          </div>
          <Link href="/login" className="px-2 py-1 rounded-md border border-gray-300 text-sm">{t('login')}</Link>
          <Link href="#donate">
            <Button className="px-3 py-1.5 bg-brand.primary hover:bg-brand.dark text-white">{t('donate')}</Button>
          </Link>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85%] bg-white shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
                <div className="h-8 w-8 rounded bg-brand" />
                <span className="font-semibold">DarulQuran</span>
              </Link>
              <button className="p-2 rounded-md border" onClick={() => setOpen(false)} aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map((item: NavItem) => {
                const href = `/${item.href}`;
                const isActive = pathname === href || (href === '/' && pathname === '/') || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link
                    key={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2 hover:bg-gray-100 relative ${
                      isActive ? 'text-brand bg-brand/10' : ''
                    }`}
                    href={href as Route}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-r"></span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 flex items-center gap-2">
              <div className="relative">
                <button onClick={()=>setLangOpen((v)=>!v)} className="px-3 py-1.5 text-sm rounded border border-gray-300 inline-flex items-center gap-2">
                  <span>{lang === 'bn' ? 'বাংলা' : lang === 'en' ? 'English' : 'العربية'}</span>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-4.24-4.24z"/></svg>
                </button>
                {langOpen && (
                  <ul className="absolute left-0 mt-1 min-w-[140px] rounded-md border border-gray-200 bg-white shadow-lg z-50">
                    <li><button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={()=>{setLang('bn'); setLangOpen(false);}}>বাংলা</button></li>
                    <li><button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={()=>{setLang('en'); setLangOpen(false);}}>English</button></li>
                    <li><button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={()=>{setLang('ar'); setLangOpen(false);}}>العربية</button></li>
                  </ul>
                )}
              </div>
              <Link href="/login" onClick={() => setOpen(false)} className="ml-auto px-3 py-1.5 rounded border">{t('login')}</Link>
              <Link href="#donate" onClick={() => setOpen(false)}>
                <Button className="px-3 py-1.5">{t('donate')}</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}


