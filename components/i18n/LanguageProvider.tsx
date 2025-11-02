'use client';

import * as React from 'react';

export type Lang = 'bn' | 'en' | 'ar';

type Dictionary = Record<string, Record<Lang, string>>;

const DICT: Dictionary = {
  donate: { bn: 'দান করুন', en: 'Donate', ar: 'تبرع' },
  login: { bn: 'লগইন', en: 'Login', ar: 'تسجيل الدخول' },
  home: { bn: 'হোম', en: 'Home', ar: 'الرئيسية' },
  about: { bn: 'আমাদের সম্পর্কে', en: 'About', ar: 'من نحن' },
  programs: { bn: 'কার্যক্রমসমূহ', en: 'Programs', ar: 'البرامج' },
  gallery: { bn: 'গ্যালারি', en: 'Gallery', ar: 'المعرض' },
  join: { bn: 'আমাদের সাথে যুক্ত হন', en: 'Get Involved', ar: 'انضم إلينا' },
  blog: { bn: 'ব্লগ', en: 'Blog', ar: 'المدونة' },
  notice: { bn: 'নোটিশ', en: 'Notice', ar: 'الإعلانات' },
  contact: { bn: 'যোগাযোগ', en: 'Contact', ar: 'اتصل بنا' },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT) => string;
};

export const I18nContext = React.createContext<Ctx | null>(null);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [lang, setLangState] = React.useState<Lang>('bn');

  React.useEffect(() => {
    const saved = (getCookie('lang') as Lang | null) || 'bn';
    setLangState(saved);
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    setCookie('lang', l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: keyof typeof DICT) => DICT[key][lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}


