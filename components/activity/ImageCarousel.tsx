'use client';

import * as React from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/Carousel';

type ImageCarouselProps = {
  images: string[];
  title?: string;
};

export default function ImageCarousel({ images, title }: ImageCarouselProps): JSX.Element {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!images || images.length === 0) {
    return <></>;
  }

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4 text-center">
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      )}

      <div className="flex flex-col gap-4 lg:gap-6">
        {/* Main Image Carousel (Top) */}
        <div className="relative w-full">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[16/10] lg:aspect-[16/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={title ? `${title} - Image ${idx + 1}` : `Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-md hover:bg-white" />
                <CarouselNext className="right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-md hover:bg-white" />
              </>
            )}
          </Carousel>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm backdrop-blur-sm z-20">
              {current} / {count}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation - Bottom strip */}
        {images.length > 1 && (
          <div className="order-2">
            <div className="flex items-center gap-2 px-1">
              <div className="flex w-full gap-2 overflow-x-auto scrollbar-hide py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => api?.scrollTo(idx)}
                    className={`relative flex-shrink-0 overflow-hidden rounded-xl border transition-all ${
                      idx === current - 1
                        ? 'border-brand ring-2 ring-brand/30'
                        : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      width: '140px',
                      height: '90px',
                      minWidth: '140px',
                      minHeight: '90px',
                    }}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {idx === current - 1 && (
                      <div className="absolute inset-0 bg-brand/10"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
