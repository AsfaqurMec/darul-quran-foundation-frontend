'use client';

import * as React from 'react';
import Button from '@/components/ui/Button';
import Container from '@/components/layout/Container';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/Carousel';

type Fund = {
  id: string;
  image: string;
  title: string;
  description: string;
  href?: string;
};

function FundCard({ fund }: { fund: Fund }): JSX.Element {
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm h-full">
        <div className="aspect-[16/10] w-full bg-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fund.image} alt={fund.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-extrabold text-emerald-900 mb-2">{fund.title}</h3>
          <p className="text-gray-700 leading-7 line-clamp-3">{fund.description}</p>
          <div className="mt-4">
            <a href={fund.href || '#donate'}>
              <Button className="px-6">দান করুন</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const sampleFunds: ReadonlyArray<Fund> = [
  {
    id: 'skill',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1600&auto=format&fit=crop',
    title: 'দারুল কুরআন স্কিল ডেভেলপমেন্ট ইনস্টিটিউট',
    description: 'দক্ষতা উন্নয়ন ও কর্মমুখী প্রশিক্ষণে আগ্রহীদের জন্য অনুদান তহবিল।',
  },
  {
    id: 'winter',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
    title: 'শীতার্ত তহবিল',
    description: 'শীতে দরিদ্র মানুষের পাশে দাঁড়ানোর লক্ষ্য নিয়ে স্থায়ী তহবিল।',
  },
  {
    id: 'mosque',
    image: 'https://images.unsplash.com/photo-1591604466107-b7155a6a9c3e?q=80&w=1600&auto=format&fit=crop',
    title: 'মসজিদ কমপ্লেক্স ও ইসলামীক সেন্টার',
    description: 'ধর্মীয় ও সামাজিক কার্যক্রমের জন্য নির্মাণ সহায়তা তহবিল।',
  },
  {
    id: 'gferg',
    image: 'https://images.unsplash.com/photo-1591604466107-b7155a6a9c3e?q=80&w=1600&auto=format&fit=crop',
    title: 'মসজিদ কমপ্লেক্স ও ইসলামীক সেন্টার',
    description: 'ধর্মীয় ও সামাজিক কার্যক্রমের জন্য নির্মাণ সহায়তা তহবিল।',
  },
];

export default function DonationCarousel({ funds = sampleFunds }: { funds?: ReadonlyArray<Fund> }): JSX.Element {
  return (
    <section className="py-10">
      <Container>
        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">অনুদান তহবিলসমূহ</h2>
          <p className="text-emerald-800/80 mt-2">চলুন একসাথে পরিবর্তন আনি</p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          autoplay={{ delay: 4500, stopOnInteraction: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {funds.map((fund) => (
              <CarouselItem key={fund.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                <FundCard fund={fund} />
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


