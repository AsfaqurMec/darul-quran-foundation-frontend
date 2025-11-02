'use client';

import * as React from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';

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
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Thumbnail Navigation - Left Side (Desktop) / Top (Mobile) */}
        {images.length > 1 && (
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 order-2 lg:order-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === current - 1
                    ? 'border-brand shadow-lg scale-105 ring-2 ring-brand/20'
                    : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                }`}
                style={{ 
                  width: '80px', 
                  height: '80px',
                  minWidth: '80px',
                  minHeight: '80px'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Active indicator */}
                {idx === current - 1 && (
                  <div className="absolute inset-0 bg-brand/10 border-2 border-brand"></div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Main Image Carousel */}
        <div className="relative flex-1 order-1 lg:order-2">
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
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
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
      </div>
    </div>
  );
}
