'use client';

import * as React from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/Carousel';
import type { ActivityItem } from '@/components/activity/ActivityCard';
import { getLatestActivities } from '@/data/activities';

function Card({ item }: { item: ActivityItem }): JSX.Element {
  const href = item.href || `/activities/${item.id}`;
  
  return (
    <div className="w-full">
      <Link href={href} className="block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col">
        <div className="aspect-[16/10] w-full bg-gray-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="text-emerald-700 text-sm mb-2">✎ {item.tag}</div>
          <h3 className="text-2xl font-extrabold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
          <p className="text-gray-700 leading-7 line-clamp-3 flex-1">{item.description}</p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 text-emerald-700 group-hover:text-emerald-800 font-semibold transition-colors">
              <span>বিস্তারিত দেখুন</span>
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ActivityCarousel({ items }: { items?: ReadonlyArray<ActivityItem> }): JSX.Element {
  // Use provided items or get latest 3 activities from shared data
  const activities = items ? [...items] : getLatestActivities(3);
  return (
    <section className="py-6 sm:py-10">
      <Container>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">চলমান কার্যক্রমসমূহ</h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          autoplay={{ delay: 4000, stopOnInteraction: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {activities.map((it) => (
              <CarouselItem key={it.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                <Card item={it} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </Container>
    </section>
  );
}


