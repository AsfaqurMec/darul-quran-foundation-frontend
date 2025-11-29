'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from '../../components/i18n/LanguageProvider';
import { translateText } from '../../lib/translate';

export type ActivityItem = {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  href?: string;
  locale?: "en" | "bn" | "ar";
};

export default function ActivityCard({ item }: { item: ActivityItem }): JSX.Element {
  const { lang, t } = useI18n();
  const [translatedTitle, setTranslatedTitle] = useState(item.title);
  const [translatedDescription, setTranslatedDescription] = useState(item.description.slice(0,80));
  const [translatedTag, setTranslatedTag] = useState(item.tag || "নিয়মিত কার্যক্রম");
  const [isTranslating, setIsTranslating] = useState(false);

  const href = item.href || `/activities/${item.id}`;

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      // If the item already has a locale and it matches current language, use original
      if (item.locale && item.locale === lang) {
        setTranslatedTitle(item.title);
        setTranslatedDescription(item.description.slice(0,80));
        setTranslatedTag(item.tag || "নিয়মিত কার্যক্রম");
        return;
      }

      setIsTranslating(true);
      try {
        // Translate title, description, and tag in parallel
        const [titleResult, descriptionResult, tagResult] = await Promise.all([
          translateText(item.title, lang),
          translateText(item.description.slice(0,80), lang),
          translateText(item.tag || "নিয়মিত কার্যক্রম", lang),
        ]);

        setTranslatedTitle(titleResult);
        setTranslatedDescription(descriptionResult);
        setTranslatedTag(tagResult);
      } catch (error) {
        console.error('Failed to translate activity content:', error);
        // Fallback to original text on error
        setTranslatedTitle(item.title);
        setTranslatedDescription(item.description.slice(0,80));
        setTranslatedTag(item.tag || "নিয়মিত কার্যক্রম");
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [lang, item.title, item.description, item.tag, item.locale]);
  
  return (
    <Link href={href as any} className="block rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group">
      <div className="aspect-[16/10] w-full bg-gray-200 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={translatedTitle} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="mb-2 flex items-center gap-2 text-amber-600 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.5 2.5c-2.33 1.38-4.35 3.27-5.91 5.54l-2.27.65a2 2 0 0 0-1.38 1.38l-.65 2.27c-1.19 2.05-.29 4.66 1.99 5.45l.35.13c.36.13.77.04 1.04-.23l1.85-1.85 2.12 2.12-1.85 1.85c-.27.27-.36.68-.23 1.04l.13.35c.79 2.28 3.4 3.18 5.45 1.99l2.27-.65a2 2 0 0 0 1.38-1.38l.65-2.27c2.27-1.56 4.16-3.58 5.54-5.91.19-.32.14-.72-.12-.98l-7.07-7.07c-.26-.26-.66-.31-.98-.12ZM7.41 16.59l-1.3 1.3a.5.5 0 0 1-.54.11l-.35-.13a2.5 2.5 0 0 1-1.55-3.29l.13-.35a.5.5 0 0 1 .11-.19l1.3-1.3 2.2 2.2Zm6.18-8.66 4.48 4.48a20.9 20.9 0 0 1-3.45 3.45l-4.48-4.48a20.9 20.9 0 0 1 3.45-3.45Z"/>
          </svg>
          <span>
            {isTranslating ? (
              <span className="inline-flex items-center gap-1">
                <span className="animate-pulse">{item.tag || "নিয়মিত কার্যক্রম"}</span>
                <span className="text-xs">...</span>
              </span>
            ) : (
              translatedTag
            )}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-emerald-900 mb-3 leading-tight line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {isTranslating ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">{item.title}</span>
              <span className="text-xs text-gray-400">...</span>
            </span>
          ) : (
            translatedTitle
          )}
        </h3>
        <p className="text-gray-700 leading-7 line-clamp-2 mb-4 flex-1">
          {isTranslating ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">{item.description.slice(0,80)}</span>
              <span className="text-xs text-gray-400">...</span>
            </span>
          ) : (
            translatedDescription + "..."
          )}
        </p>
        <div className="mt-auto">
          <span className="inline-flex w-full justify-center items-center gap-2 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 font-extrabold px-4 py-2.5 transition-colors">
            <span>{t('readMore')}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}


