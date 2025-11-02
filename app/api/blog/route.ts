import { NextRequest, NextResponse } from 'next/server';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

function buildPosts(): Post[] {
  const base: Post[] = [
    {
      id: 'p1',
      title: 'মাসব্যাপী দাওয়াহ প্রশিক্ষণ-২০২৫ সম্পন্ন',
      excerpt: 'সম্পন্ন হয়েছে দারুল কুরআন দাওয়াহ রিসার্চ ইনস্টিটিউটের অডিটোরিয়ামে পর্বের দাওয়াহ প্রশিক্ষণ-২০২৫... ',
      date: '১৯ অক্টোবর, ২০২৫',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 'p2',
      title: '১০৯ এতিমসহ ৩০০ শহীদ পরিবারের পাশে দারুল কুরআন ফাউন্ডেশন',
      excerpt: 'বৈরন্য বিদ্ধস্ত ছাত্র আন্দোলনের শহীদ হয়ে যাওয়া পরিবারের পাশে দাঁড়ালাম—সহায়তা অব্যাহত।',
      date: '১৯ অক্টোবর, ২০২৫',
      image: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 'p3',
      title: 'কুরআন প্রতিযোগিতার ২য় ও ৩য় ধাপের পুরস্কার বিতরণ',
      excerpt: 'বিজয়ীদের অনুপ্রাণিত করতে পুরস্কার প্রদান ও পরবর্তী ধাপের জন্য প্রস্তুতি বিষয়ে আলোচনা।',
      date: '১৯ অক্টোবর, ২০২৫',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1600&auto=format&fit=crop',
    },
  ];
  const list: Post[] = [];
  for (let i = 0; i < 40; i++) {
    const b = base[i % base.length];
    list.push({ ...b, id: `${b.id}-${i}` });
  }
  return list;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const perPage = Math.max(1, Number(searchParams.get('perPage') || '9'));
  const all = buildPosts();
  const total = all.length;
  const start = (page - 1) * perPage;
  const items = all.slice(start, start + perPage);
  return NextResponse.json({ items, total, page, perPage });
}


