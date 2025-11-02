import { NextRequest, NextResponse } from 'next/server';

type Item = {
  id: string;
  title: string;
  date: string;
  tag?: string;
  excerpt?: string;
};

function build(): Item[] {
  const base: Item[] = [
    {
      id: 'n1',
      title: 'শিক্ষক প্রশিক্ষণ প্রোগ্রাম',
      date: '2025-08-23',
      tag: 'কোর্স',
      excerpt: 'দারুল কুরআন স্কিল ডেভেলপমেন্ট ইন্সটিটিউট এ ৩ ও ৪ মাস মেয়াদি শিক্ষক প্রশিক্ষণ – রেজিস্ট্রেশন চলছে।',
    },
    {
      id: 'n2',
      title: 'স্কলারশিপ আবেদন চলছে',
      date: '2025-07-10',
      tag: 'স্কলারশিপ',
      excerpt: 'দরিদ্র মেধাবী শিক্ষার্থীদের জন্য স্কলারশিপের আবেদন গ্রহণ করা হচ্ছে।',
    },
  ];
  const arr: Item[] = [];
  for (let i = 0; i < 25; i++) {
    const b = base[i % base.length];
    const d = new Date(b.date);
    d.setDate(d.getDate() - i);
    arr.push({ ...b, id: `${b.id}-${i}`, date: d.toISOString().slice(0,10) });
  }
  return arr;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const perPage = Math.max(1, Number(searchParams.get('perPage') || '10'));
  const all = build();
  const total = all.length;
  const start = (page - 1) * perPage;
  const items = all.slice(start, start + perPage);
  return NextResponse.json({ items, total, page, perPage });
}


