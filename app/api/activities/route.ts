import { NextRequest, NextResponse } from 'next/server';

type Item = {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
};

function buildData(): Item[] {
  const base: Item[] = [
    {
      id: 'winter',
      image: 'https://images.unsplash.com/photo-1579447727886-69928b1d9587?q=80&w=1600&auto=format&fit=crop',
      tag: 'নিয়মিত কার্যক্রম',
      title: 'শীতবস্ত্র বিতরণ',
      description: 'দরিদ্র মানুষের শরীরে উষ্ণতা ছড়িয়ে দিতে আমাদের আয়োজন।',
    },
    {
      id: 'water',
      image: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1600&auto=format&fit=crop',
      tag: 'নিয়মিত কার্যক্রম',
      title: 'নলকূপ ও পানি শোধনাগার স্থাপন',
      description: 'নিরাপদ পানির জন্য মানবিক উদ্যোগ।',
    },
    {
      id: 'dev',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop',
      tag: 'নিয়মিত কার্যক্রম',
      title: 'দারুল কুরআন স্কিল ডেভেলপমেন্ট…',
      description: 'দক্ষতা উন্নয়ন, কর্মমুখী প্রশিক্ষণ এবং জ্ঞান বৃদ্ধি।',
    },
  ];
  const list: Item[] = [];
  for (let i = 0; i < 50; i++) {
    const b = base[i % base.length];
    list.push({ ...b, id: `${b.id}-${i}` });
  }
  return list;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const perPage = Math.max(1, Number(searchParams.get('perPage') || '9'));

  const all = buildData();
  const total = all.length;
  const start = (page - 1) * perPage;
  const items = all.slice(start, start + perPage);

  return NextResponse.json({ items, total, page, perPage });
}


