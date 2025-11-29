'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';

import Container from '../../components/layout/Container';
import { useI18n } from '../../components/i18n/LanguageProvider';

const VIDEO_ID = '6iaWYbQ4Isg';

export default function ImpactVideo(): JSX.Element {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const videoTitle = t('impactVideoTitle');

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <section className="py-5 sm:py-14 bg-emerald-50/40">
      <div className='px-3 max-w-[1300px] mx-auto'>
        <div className="text-center max-w-3xl mx-auto mb-8 py-20">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-1 text-sm font-semibold text-emerald-700">
            {t('impactVideoBadge')}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-emerald-900">
            {videoTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-emerald-800/80">
            {t('impactVideoSubtitle')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full rounded-[12px] overflow-hidden shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/40"
        >
          <div className="relative aspect-[16/12] md:aspect-[16/9] w-full">
            <Image
              src="/img/hero.png"
              alt={videoTitle}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-900/40 to-emerald-900/80 transition-opacity duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="text-white/90 text-sm sm:text-base font-semibold">{t('foundationName')}</p>
              <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
                {t('impactVideoHighlight')}
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-emerald-800 transition duration-300 group-hover:bg-white">
                <Play className="h-5 w-5 text-emerald-700" />
                {t('impactVideoCTA')}
              </span>
            </div>
          </div>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-black shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-emerald-900 hover:bg-white"
              aria-label={t('impactVideoCloseLabel')}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full rounded-3xl"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

