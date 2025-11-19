'use client';

import Image from 'next/image';
import logo from '@/public/img/logo-foundation.png';
import Container from '@/components/layout/Container';
import { useI18n } from '@/components/i18n/LanguageProvider';

function SocialLink({ href, label, icon }: { href: string; label: string; icon: JSX.Element }): JSX.Element {
  return (
    <a href={href} aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
      {icon}
    </a>
  );
}

// Helper function to add line break before last word
const formatFoundationName = (text: string) => {
  const words = text.split(' ');
  if (words.length <= 1) return text;
  const lastWord = words[words.length - 1];
  const rest = words.slice(0, -1).join(' ');
  return (
    <>
      {rest} <br /> {lastWord}
    </>
  );
};

export default function Footer(): JSX.Element {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="relative text-gray-100">
      <div className="absolute inset-0 bg-emerald-950" />
      {/* footer background image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/img/bg-large.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity"
        />
      </div>
      <Container className="relative py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1">
              <Image src={logo} alt="logo" width={80} height={80} />
              <div className="text-3xl font-semibold">{formatFoundationName(t('foundationName'))}</div>
            </div>
            <p className="text-lg text-emerald-100/90 leading-7">
              {t('footerDescription')}
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href="#" label="Facebook" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8"><path d="M13 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h2v7h3v-7h2.5l.5-3H13V9Z"/></svg>} />
              <SocialLink href="#" label="YouTube" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M21.8 8.001a3 3 0 0 0-2.11-2.124C18.37 5.5 12 5.5 12 5.5s-6.37 0-7.69.377A3 3 0 0 0 2.2 8.001C1.833 9.336 1.833 12 1.833 12s0 2.664.366 3.999a3 3 0 0 0 2.111 2.124C5.63 18.5 12 18.5 12 18.5s6.37 0 7.69-.377a3 3 0 0 0 2.11-2.124C22.167 14.664 22.167 12 22.167 12s0-2.664-.366-3.999ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>} />
              <SocialLink href="#" label="LinkedIn" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M6.94 6.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM3.5 8.25h6.88V20.5H3.5V8.25Zm8.62 0h6.62v2.39h.09c.92-1.65 3.17-3.39 6.54-3.39v6.93c-3.58 0-6.17 1.18-6.17 4.75v1.57H12.12V8.25Z"/></svg>} />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-4">{t('menu')}</h4>
            <ul className="space-y-2 text-emerald-100/90 text-lg">
              <li><a href="#about" className="hover:underline">{t('about')}</a></li>
              <li><a href="#programs" className="hover:underline">{t('programs')}</a></li>
              <li><a href="#blog" className="hover:underline">{t('blog')}</a></li>
              <li><a href="#gallery" className="hover:underline">{t('gallery')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-4">{t('joinUs')}</h4>
            <ul className="space-y-2 text-lg text-emerald-100/90">
              <li><a href="#donate-regular" className="hover:underline">{t('regularDonor')}</a></li>
              <li><a href="#donor-member" className="hover:underline">{t('lifetimeMember')}</a></li>
              <li><a href="#volunteer" className="hover:underline">{t('volunteer')}</a></li>
              <li><a href="#career" className="hover:underline">{t('career')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-4">{t('others')}</h4>
            <ul className="space-y-2  text-lg text-emerald-100/90">
              <li><a href="#contact" className="hover:underline">{t('contact')}</a></li>
              <li><a href="#terms" className="hover:underline">{t('termsConditions')}</a></li>
              <li><a href="#privacy" className="hover:underline">{t('privacyPolicy')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-emerald-800/60 pt-4 text-center text-lg text-emerald-200">
          {t('copyright')} © {year} {t('foundationName')} - {t('allRightsReserved')}।
        </div>
      </Container>
    </footer>
  );
}


