'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, Lang } from "../../components/i18n/LanguageProvider";
import { translateText } from "../../lib/translate";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href?: string;
  locale?: "en" | "bn";
};

export default function BlogCard({ post }: { post: BlogPost }): JSX.Element {
  const { lang } = useI18n();
  const [translatedTitle, setTranslatedTitle] = useState(post.title);
  const [translatedExcerpt, setTranslatedExcerpt] = useState(post.excerpt.slice(0,80));
  const [isTranslating, setIsTranslating] = useState(false);

  const href = post.href || `/blog/${post.id}`;
  const formattedDate = formatPostDate(post.date, lang);

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      // If the post already has a locale and it matches current language, use original
      if (post.locale && post.locale === lang) {
        setTranslatedTitle(post.title);
        setTranslatedExcerpt(post.excerpt.slice(0,80));
        return;
      }

      setIsTranslating(true);
      try {
        // Translate title and excerpt in parallel
        const [titleResult, excerptResult] = await Promise.all([
          translateText(post.title, lang),
          translateText(post.excerpt.slice(0,80), lang),
        ]);

        setTranslatedTitle(titleResult);
        setTranslatedExcerpt(excerptResult);
      } catch (error) {
        console.error('Failed to translate blog content:', error);
        // Fallback to original text on error
        setTranslatedTitle(post.title);
        setTranslatedExcerpt(post.excerpt.slice(0,80));
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [lang, post.title, post.excerpt, post.locale]);

  return (
    <Link href={href as any} className="block rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 group h-full w-full">
      <div className="h-[200px] w-full bg-gray-200 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={post.image} 
          alt={translatedTitle} 
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-emerald-900 mb-1.5 sm:mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1 sm:line-clamp-1">
          {isTranslating ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">{post.title}</span>
              <span className="text-xs text-gray-400">...</span>
            </span>
          ) : (
            translatedTitle
          )}
        </h3>
        <p className="text-gray-700 text-sm sm:text-base leading-6 sm:leading-7 line-clamp-2 sm:line-clamp-2 md:line-clamp-2">
          {isTranslating ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">{post.excerpt.slice(0,80)}</span>
              <span className="text-xs text-gray-400">...</span>
            </span>
          ) : (
            translatedExcerpt + "..."
          )}
        </p>
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">{formattedDate}</div>
      </div>
    </Link>
  );
}

function formatPostDate(dateString: string, locale: Lang): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const formatter =
    locale === "bn"
      ? new Intl.DateTimeFormat("bn-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : locale === "ar"
      ? new Intl.DateTimeFormat("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  return formatter.format(date);
}


