'use client';

import * as React from 'react';
import Container from '../layout/Container';
import { api } from '@/config';
import { getImageUrl } from '@/lib/imageUtils';
import { useI18n } from '../i18n/LanguageProvider';
import Link from 'next/link';
import Button from '../ui/button';

type GalleryItem = { id: string; src: string; alt?: string };



export default function Gallery({ items, fetchCount = 6 }: { items?: ReadonlyArray<GalleryItem>; fetchCount?: number }): JSX.Element {
  const { t } = useI18n();
  const [open, setOpen] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);
  const [fetched, setFetched] = React.useState<GalleryItem[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  // Load public gallery items if no items provided
  React.useEffect(() => {
    let canceled = false;
    async function load() {
      if (items && items.length > 0) return;
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        qs.set('page', '1');
        qs.set('limit', String(fetchCount));
        qs.set('type', 'image');
        const resp = await fetch(`${api.baseUrl}/gallery?${qs.toString()}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          next: { tags: ['gallery'] } as any,
        });
        if (!resp.ok) throw new Error(`Gallery public fetch failed: ${resp.status}`);
        const data = await resp.json();
        const list: any[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        const mapped: GalleryItem[] = list
          .slice(0, fetchCount)
          .map((it) => ({
            id: String(it.id ?? it._id ?? ''),
            src: getImageUrl(it.media ?? it.src ?? it.url ?? it.image ?? it.thumbnail ?? ''),
            alt: it.title ?? it.caption ?? '',
          }))
          .filter((it) => it.src);
        if (!canceled) setFetched(mapped);
      } catch {
        if (!canceled) setFetched([]);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    void load();
    return () => {
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpen = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const onClose = () => setOpen(false);
  // Limit display to 6 items regardless of source size
  const displayItems = React.useMemo(() => (fetched ?? items ?? []).slice(0, 6), [fetched, items]);
  const prev = () => setIndex((i) => (i - 1 + displayItems.length) % displayItems.length);
  const next = () => setIndex((i) => (i + 1) % displayItems.length);

  return (
    <>

     <Container>
    <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900 my-20 text-center">{t('gallery')}</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayItems.map((it, i) => (
            <button
              key={it.id}
              onClick={() => onOpen(i)}
              className="group relative block rounded-2xl overflow-hidden border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.src}
                alt={it.alt || ''}
                className="h-48 sm:h-56 md:h-60 w-full object-cover transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
              {/* Eye overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-12 w-12 rounded-full bg-white/95 text-gray-800 flex items-center justify-center shadow-lg">
                  {/* eye icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    <path
                      d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
      </div>
      <div className="mt-8 flex justify-center">
          <Link href="/gallery">
            <Button className="px-6">{t('readMore')}</Button>
          </Link>
        </div>
     </Container>

        {/* Modal */}
        {open ? (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative max-w-4xl w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={displayItems[index].src} alt={displayItems[index].alt || ''} className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg" />
                <button aria-label="Close" onClick={onClose} className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-white text-gray-700 shadow">✕</button>
                <button aria-label="Prev" onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white text-gray-700 shadow">‹</button>
                <button aria-label="Next" onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 rounded-full bg-white text-gray-700 shadow">›</button>
              </div>
            </div>
          </div>
        ) : null}
    </>
  );
}


