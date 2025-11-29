'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, Lang } from "../../components/i18n/LanguageProvider";
import { translateText } from "../../lib/translate";

export type Notice = {
  id: string;
  title: string;
  date: string; // ISO date
  tag?: string;
  excerpt?: string;
  href?: string;
  locale?: "en" | "bn" | "ar";
};

function formatDateParts(iso: string, locale: Lang) {
  const d = new Date(iso);
  const day = d.getDate();
  
  const localeMap: Record<Lang, string> = {
    bn: 'bn-BD',
    en: 'en-US',
    ar: 'ar-SA',
  };
  
  const localeCode = localeMap[locale];
  const weekday = d.toLocaleDateString(localeCode, { weekday: 'short' });
  const monthYear = d.toLocaleDateString(localeCode, { month: 'long', year: 'numeric' });
  return { day, weekday, monthYear };
}

export default function NoticeCard({ notice }: { notice: Notice }): JSX.Element {
  const { lang, t } = useI18n();
  const [translatedTitle, setTranslatedTitle] = useState(notice.title);
  const [translatedExcerpt, setTranslatedExcerpt] = useState(notice.excerpt?.slice(0,150) || '');
  const [translatedTag, setTranslatedTag] = useState(notice.tag || '');
  const [isTranslating, setIsTranslating] = useState(false);

  const { day, weekday, monthYear } = formatDateParts(notice.date, lang);
  const href = (notice.href || `/notice/${notice.id}`) as any;

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      // If the notice already has a locale and it matches current language, use original
      if (notice.locale && notice.locale === lang) {
        setTranslatedTitle(notice.title);
        setTranslatedExcerpt(notice.excerpt?.slice(0,150) || '');
        setTranslatedTag(notice.tag || '');
        return;
      }

      setIsTranslating(true);
      try {
        // Prepare translation promises
        const promises: Promise<string>[] = [
          translateText(notice.title, lang),
        ];

        if (notice.excerpt) {
          promises.push(translateText(notice.excerpt.slice(0,150), lang));
        }

        if (notice.tag) {
          promises.push(translateText(notice.tag, lang));
        }

        // Translate in parallel
        const results = await Promise.all(promises);
        
        setTranslatedTitle(results[0]);
        if (notice.excerpt) {
          setTranslatedExcerpt(results[1] || '');
        }
        if (notice.tag) {
          setTranslatedTag(results[notice.excerpt ? 2 : 1] || '');
        }
      } catch (error) {
        console.error('Failed to translate notice content:', error);
        // Fallback to original text on error
        setTranslatedTitle(notice.title);
        setTranslatedExcerpt(notice.excerpt?.slice(0,150) || '');
        setTranslatedTag(notice.tag || '');
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [lang, notice.title, notice.excerpt, notice.tag, notice.locale]);
  
  return (
    <Link href={href as any} className="block rounded-2xl border border-emerald-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group hover:border-brand">
      <div className="text-center min-w-[80px] flex-shrink-0 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
        <div className="text-xs font-medium text-gray-600 mb-1">{weekday}</div>
        <div className="text-4xl font-extrabold text-brand">{day}</div>
        <div className="text-xs text-gray-600 mt-1">{monthYear}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {notice.tag && (
            <span className="inline-block rounded-full bg-brand/10 text-brand px-3 py-1 text-sm font-medium border border-brand/20">
              {isTranslating ? (
                <span className="inline-flex items-center gap-1">
                  <span className="animate-pulse">{notice.tag}</span>
                  <span className="text-xs">...</span>
                </span>
              ) : (
                translatedTag
              )}
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-emerald-900 mb-3 group-hover:text-brand transition-colors leading-tight">
          {isTranslating ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">{notice.title}</span>
              <span className="text-xs text-gray-400">...</span>
            </span>
          ) : (
            translatedTitle
          )}
        </h3>
        {notice.excerpt && (
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {isTranslating ? (
              <span className="inline-flex items-center gap-2">
                <span className="animate-pulse">{notice.excerpt.slice(0,150)}</span>
                <span className="text-xs text-gray-400">...</span>
              </span>
            ) : (
              translatedExcerpt
            )}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-white text-sm font-medium group-hover:text-brand-dark transition-colors bg-brand/90 px-4 py-2 rounded-lg w-[120px] text-center">
          <span>{t('readMore')}</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}


