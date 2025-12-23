'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import logo from '../../public/img/logo-foundation.png';
import Container from '../../components/layout/Container';
import { useI18n } from '../../components/i18n/LanguageProvider';
import { FaLinkedinIn } from "react-icons/fa";
import { toast } from 'sonner';

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactElement }) {
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

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setShowSuccess(true);
    toast.success(t('newsletterSuccess'));
    setEmail('');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <footer className="relative text-gray-100 mt-44">
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
      <Container className="relative py-12 ">
        <div className="relative mb-12 -mt-40">
          <div className="relative mx-auto max-w-5xl rounded-[10px] bg-brand px-6 py-10 text-center text-white shadow-[0_25px_80px_rgba(8,70,36,0.35)]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.09),transparent_60%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.06),transparent_65%)]" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold sm:text-3xl">{t('newsletterTitle')}</h3>
              <form onSubmit={handleSubscribe} className="mt-8 flex w-full flex-col items-center gap-4">
                <div className="relative w-full max-w-2xl">
                  <label htmlFor="footer-newsletter" className="sr-only">
                    {t('yourEmail')}
                  </label>
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t('newsletterPlaceholder')}
                    className=" h-14 w-full rounded-full border border-gray-300/40 bg-white px-6 pr-10 lg:pr-40 text-base text-emerald-900 placeholder:text-emerald-400 shadow-[0_18px_35px_rgba(9,67,35,0.18)] focus:border-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 right-2 hidden -translate-y-1/2 rounded-full border-2 border-white bg-[#f2c233] px-8 py-2 text-base font-semibold text-emerald-900 shadow-[0_20px_40px_rgba(242,194,51,0.45)] transition hover:bg-[#ffd65c] sm:inline-flex"
                  >
                    {t('newsletterButton')}
                  </button>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full max-w-2xl items-center justify-center rounded-full border-4 border-white bg-[#f2c233] px-8 py-3 text-base font-semibold text-emerald-900 shadow-[0_18px_35px_rgba(242,194,51,0.4)] transition hover:bg-[#ffd65c] sm:hidden"
                >
                  {t('newsletterButton')}
                </button>
              </form>
              <p className="mt-4 min-h-[1.25rem] text-sm text-emerald-50" aria-live="polite">
                {showSuccess ? t('newsletterSuccess') : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full ">
          <div className="space-y-4 ">
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
              <SocialLink href="#" label="LinkedIn" icon={<FaLinkedinIn />} />
            </div>
          </div>
          <div className='pl-0 md:pl-16'>
            <h4 className="text-2xl font-semibold mb-4">{t('menu')}</h4>
            <ul className="space-y-2 text-emerald-100/90 text-lg">
              <li><a href="/about" className="hover:underline">{t('about')}</a></li>
              <li><a href="/programs" className="hover:underline">{t('programs')}</a></li>
              <li><a href="/blog" className="hover:underline">{t('blog')}</a></li>
              <li><a href="/gallery" className="hover:underline">{t('gallery')}</a></li>
            </ul>
          </div>
          <div className='pl-0 md:pl-10'>
            <h4 className="text-2xl font-semibold mb-4">{t('joinUs')}</h4>
            <ul className="space-y-2 text-lg text-emerald-100/90">
              <li><a href="/get-involved" className="hover:underline">{t('regularDonor')}</a></li>
              <li><a href="/get-involved" className="hover:underline">{t('lifetimeMember')}</a></li>
              <li><a href="/get-involved" className="hover:underline">{t('volunteer')}</a></li>
              {/* <li><a href="#career" className="hover:underline">{t('career')}</a></li> */}
            </ul>
          </div>
          <div className=' pl-0 md:pl-15'>
            <h4 className="text-2xl font-semibold mb-4">{t('others')}</h4>
            <ul className="space-y-2  text-lg text-emerald-100/90">
              <li><a href="/contact" className="hover:underline">{t('contact')}</a></li>
              <li><a href="/term-and-condition" className="hover:underline">{t('termsConditions')}</a></li>
              <li><a href="/privacy-policy" className="hover:underline">{t('privacyPolicy')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-emerald-800/60 pt-4 text-center text-lg text-emerald-200">
          {t('copyright')} © {year} {t('foundationName')} - {t('allRightsReserved')}।
        </div>
        <div className=" pt-4 text-center text-lg text-emerald-200">
          Developed by <a href="http://flexsoftr.com" className="hover:underline text-blue-400 text-xl pl-1" target="_blank" rel="noopener noreferrer">FlexSoftr</a>
        </div>
      </Container>
    </footer>
  );
}


