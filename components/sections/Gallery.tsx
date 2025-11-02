'use client';

import * as React from 'react';
import Container from '../layout/Container';

type GalleryItem = { id: string; src: string; alt?: string };

const sample: ReadonlyArray<GalleryItem> = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1600&auto=format&fit=crop', alt: 'Relief work 1' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1607860255588-6a4ea49d0bcb?q=80&w=1600&auto=format&fit=crop', alt: 'Relief work 2' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop', alt: 'Relief work 3' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1600&auto=format&fit=crop', alt: 'Relief work 4' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1520975922284-87e03727b333?q=80&w=1600&auto=format&fit=crop', alt: 'Relief work 5' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1558980664-10eb5f3f3d99?q=80&w=1600&auto=format&fit=crop', alt: 'Relief work 6' },
];

export default function Gallery({ items = sample }: { items?: ReadonlyArray<GalleryItem> }): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const onOpen = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const onClose = () => setOpen(false);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <>
     <Container>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((it, i) => (
            <button key={it.id} onClick={() => onOpen(i)} className="group relative block rounded-2xl overflow-hidden border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.alt || ''} className="h-48 sm:h-56 md:h-60 w-full object-cover transition-transform group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
            </button>
          ))}
      </div>
     </Container>

        {/* Modal */}
        {open ? (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative max-w-4xl w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={items[index].src} alt={items[index].alt || ''} className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg" />
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


