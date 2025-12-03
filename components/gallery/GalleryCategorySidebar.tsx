'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useI18n } from '../i18n/LanguageProvider';
import { translateText } from '@/lib/translate';

type Props = {
  categoryOptions: string[];
  normalizedCategory: string;
  selectedYear?: number;
  type: string;
  allCategory: string;
};

export default function GalleryCategorySidebar({
  categoryOptions,
  normalizedCategory,
  selectedYear,
  type,
  allCategory,
}: Props): JSX.Element {
  const { t, lang } = useI18n();
  const [translatedCategories, setTranslatedCategories] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Translate all categories when language changes
  useEffect(() => {
    const translateCategories = async () => {
      // Don't translate if language is English (assuming categories come in English)
      if (lang === 'en') {
        const englishMap: Record<string, string> = {};
        [allCategory, ...categoryOptions].forEach((cat) => {
          englishMap[cat] = cat === allCategory ? t('all') : cat;
        });
        setTranslatedCategories(englishMap);
        return;
      }

      setIsTranslating(true);
      const translations: Record<string, string> = {};

      try {
        // Translate all categories in parallel
        const translationPromises = [allCategory, ...categoryOptions].map(async (category) => {
          if (category === allCategory) {
            translations[category] = t('all');
            return;
          }
          
          try {
            const translated = await translateText(category, lang, 'en');
            translations[category] = translated;
          } catch (error) {
            console.error(`Failed to translate category "${category}":`, error);
            translations[category] = category; // Fallback to original
          }
        });

        await Promise.all(translationPromises);
        setTranslatedCategories(translations);
      } catch (error) {
        console.error('Failed to translate categories:', error);
        // Fallback to original category names
        const fallbackMap: Record<string, string> = {};
        [allCategory, ...categoryOptions].forEach((cat) => {
          fallbackMap[cat] = cat === allCategory ? t('all') : cat;
        });
        setTranslatedCategories(fallbackMap);
      } finally {
        setIsTranslating(false);
      }
    };

    translateCategories();
  }, [lang, allCategory, categoryOptions.join(','), t]);

  // Helper function to get translated category name
  const getTranslatedCategory = (category: string): string => {
    if (category === allCategory) {
      return t('all');
    }
    return translatedCategories[category] || category;
  };

  const makeHref = (category: string): Route => {
    const qs = new URLSearchParams();
    qs.set('page', '1');
    if (selectedYear) {
      qs.set('year', String(selectedYear));
    }
    if (category && category !== allCategory) {
      qs.set('category', category);
    }
    if (type) {
      qs.set('type', type);
    }
    return `/gallery?${qs.toString()}` as Route;
  };

  return (
    <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 h-max sticky top-8">
      <h3 className="text-lg font-bold text-emerald-900 mb-4">{t('galleryCategories')}</h3>
      <div className="space-y-2">
        {[allCategory, ...categoryOptions].map((c) => {
          const selected = normalizedCategory === c;
          return (
            <Link
              key={c}
              href={makeHref(c)}
              className={`block rounded-lg px-4 py-3 transition-all ${
                selected
                  ? 'bg-white text-brand font-semibold shadow-sm border border-brand/20'
                  : 'hover:bg-white/60 text-gray-700'
              }`}
            >
              {isTranslating && !translatedCategories[c] ? c : getTranslatedCategory(c)}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

