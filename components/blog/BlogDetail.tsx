'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Container from '../../components/layout/Container';
import BlogCard, { BlogPost } from './BlogCard';
import { useI18n, Lang } from '../../components/i18n/LanguageProvider';
import { translateText, clearCacheForLanguage } from '../../lib/translate';
import DOMPurify from 'isomorphic-dompurify';

type BlogData = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  locale?: "en" | "bn" | "ar";
  thumbnail: string;
  images: string[];
  fullContent: string;
};

type Props = {
  blog: BlogData;
  otherBlogs?: BlogPost[];
};

export default function BlogDetail({ blog, otherBlogs = [] }: Props): React.ReactElement {
  const { lang, t } = useI18n();
  const [translatedTitle, setTranslatedTitle] = useState(blog.title);
  const [translatedExcerpt, setTranslatedExcerpt] = useState(blog.excerpt);
  const [translatedFullContent, setTranslatedFullContent] = useState(blog.fullContent);
  const [isTranslating, setIsTranslating] = useState(false);

  const topImages = (blog.images || []).slice(0, 2);
  const restImages = (blog.images || []).slice(2);

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      // If the blog already has a locale and it matches current language, use original
      if (blog.locale && blog.locale === lang) {
        setTranslatedTitle(blog.title);
        setTranslatedExcerpt(blog.excerpt);
        setTranslatedFullContent(blog.fullContent);
        return;
      }

    //  console.log('Translating blog content to:', lang, 'from locale:', blog.locale);
      setIsTranslating(true);
      
      // Clear cache for this language to force fresh translation
      clearCacheForLanguage(lang);
      
      try {
        // Translate title, excerpt, and fullContent in parallel
        const [titleResult, excerptResult, fullContentResult] = await Promise.all([
          translateText(blog.title, lang, blog.locale),
          translateText(blog.excerpt, lang, blog.locale),
          translateText(blog.fullContent, lang, blog.locale),
        ]);

        // console.log('Translation results:', { 
        //   titleOriginal: blog.title.substring(0, 50),
        //   titleTranslated: titleResult.substring(0, 50),
        //   excerptOriginal: blog.excerpt.substring(0, 50),
        //   excerptTranslated: excerptResult.substring(0, 50),
        //   fullContentLength: fullContentResult.length 
        // });
        
        setTranslatedTitle(titleResult);
        setTranslatedExcerpt(excerptResult);
        setTranslatedFullContent(fullContentResult);
      } catch (error) {
        console.error('Failed to translate blog detail content:', error);
        // Fallback to original text on error
        setTranslatedTitle(blog.title);
        setTranslatedExcerpt(blog.excerpt);
        setTranslatedFullContent(blog.fullContent);
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [lang, blog.title, blog.excerpt, blog.fullContent, blog.locale]);

  const safeTranslatedContent = useMemo(
    () => DOMPurify.sanitize(translatedFullContent || ''),
    [translatedFullContent],
  );

  const safeOriginalContent = useMemo(
    () => DOMPurify.sanitize(blog.fullContent || ''),
    [blog.fullContent],
  );

  const contentHtml = isTranslating
    ? `<div style="display: flex; align-items: center; gap: 0.5rem;">
        <div style="animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;">${safeOriginalContent}</div>
        <span style="font-size: 0.75rem; color: #9ca3af;">...</span>
      </div>`
    : safeTranslatedContent;

  return (
    <div>
      {/* Header with background */}
      <section className="relative min-h-[320px] md:min-h-[420px] flex items-center overflow-hidden ">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${blog.thumbnail || topImages[0] || ''}')` }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <Container className="relative z-10 py-14 md:py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3 md:mb-4 line-clamp-3">
            {isTranslating ? (
              <span className="inline-flex items-center gap-2">
                <span className="animate-pulse">{blog.title}</span>
                <span className="text-sm">...</span>
              </span>
            ) : (
              translatedTitle
            )}
          </h1>
          <div className="text-white/90">
            {formatPostDate(blog.date, lang)}
          </div>
        </Container>
      </section>

      {/* Two-column layout */}
      <section className="py-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left */}
            <div className="w-full lg:basis-3/5">
              <p className="text-lg md:text-xl text-gray-700 leading-8 mb-6">
                {isTranslating ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="animate-pulse">{blog.excerpt}</span>
                    <span className="text-xs text-gray-400">...</span>
                  </span>
                ) : (
                  translatedExcerpt
                )}
              </p>

              {/* First two images */}
              {topImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {topImages.map((src, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`media-${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Full content (supports HTML) */}
              {blog.fullContent && (
                <article
                  className="prose max-w-none prose-lg"
                  dangerouslySetInnerHTML={{
                    __html: contentHtml,
                  }}
                />
              )}

              {/* Rest media images */}
              {restImages.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {restImages.map((src, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`media-rest-${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right */}
            <aside className="w-full lg:basis-2/5 space-y-6">
              {/* Social */}
              <div className="rounded-xl border border-gray-200 p-5 bg-white">
                <h3 className="text-xl font-bold mb-3">{t('share')}</h3>
                <div className="flex gap-3">
                  <a className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center" href="#" aria-label="share-facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94Z"/>
                    </svg>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center" href="#" aria-label="share-twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M19.633 7.997c.013.18.013.36.013.54 0 5.49-4.18 11.82-11.82 11.82-2.35 0-4.53-.69-6.36-1.87.33.04.64.05.98.05 1.95 0 3.74-.66 5.16-1.78-1.82-.04-3.36-1.23-3.89-2.86.26.04.52.06.8.06.38 0 .75-.05 1.1-.15-1.9-.38-3.33-2.06-3.33-4.07v-.05c.55.31 1.19.5 1.86.52-1.1-.73-1.82-1.98-1.82-3.39 0-.75.2-1.45.55-2.05 2 2.46 5 4.07 8.39 4.24-.07-.3-.1-.62-.1-.94 0-2.28 1.85-4.13 4.13-4.13 1.19 0 2.26.5 3.01 1.31.94-.18 1.83-.53 2.63-1-.31.96-.96 1.76-1.82 2.27.83-.09 1.63-.32 2.37-.64-.54.83-1.23 1.56-2.02 2.14Z"/>
                    </svg>
                  </a>
                  <a className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center" href="#" aria-label="share-linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M20.447 20.452h-3.554v-5.568c0-1.33-.027-3.043-1.855-3.043-1.857 0-2.14 1.45-2.14 2.948v5.663H9.344V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.6 0 4.266 2.37 4.266 5.455v6.288ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.99 20.452H3.68V9h3.31v11.452Z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Other blogs */}
              {otherBlogs.length > 0 && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-gray-200 p-5 bg-white">
                    <h3 className="text-xl font-bold mb-4">{t('relatedBlogs')}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {otherBlogs.slice(0, 6).map((p) => (
                        <BlogCard key={p.id} post={p} />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-[#0F8A41] px-6 py-8 text-center text-white shadow-lg">
                    <p className="text-2xl font-bold leading-relaxed mb-6">
                      {t('ctaChangeTogether')}
                    </p>
                    <div className="flex flex-col gap-4">
                      <a
                        href="/donation"
                        className="inline-flex items-center justify-center rounded-xl bg-[#E9B454] px-5 py-3 text-lg font-semibold text-[#0F2F10] transition hover:brightness-110"
                      >
                        {t('donate')}
                      </a>
                      <a
                        href="/get-involved"
                        className="inline-flex items-center justify-center rounded-xl border-2 border-white px-5 py-3 text-lg font-semibold transition hover:bg-white hover:text-[#0F8A41]"
                      >
                        {t('becomeVolunteer')}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>
    </div>
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

