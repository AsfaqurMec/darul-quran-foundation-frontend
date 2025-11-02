import { NextRequest, NextResponse } from 'next/server';

type GalleryItem = {
  id: string;
  src: string;
  alt?: string;
  year: number;
  category: string;
  type: 'image' | 'video';
};

const categories = ['সবগুলো', 'বন্যা', 'খাদ্য বিতরণ', 'স্বাবলম্বীকরণ', 'কুরবানি', 'শীতবস্ত্র বিতরণ'];
const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019];

function buildData(): GalleryItem[] {
  const list: GalleryItem[] = [];
  let id = 0;
  for (const y of years) {
    for (const c of categories) {
      if (c === 'সবগুলো') continue;
      for (let i = 0; i < 6; i++) {
        list.push({
          id: `g-${id++}`,
          src: `https://images.unsplash.com/photo-15${Math.floor(Math.random()*99)}-random?q=80&w=1600&auto=format&fit=crop`,
          alt: `${c} ${y}`,
          year: y,
          category: c,
          type: 'image',
        });
      }
    }
  }
  return list;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const perPage = Math.max(1, Number(searchParams.get('perPage') || '12'));
  const year = Number(searchParams.get('year') || '0');
  const category = searchParams.get('category') || 'সবগুলো';
  const type = (searchParams.get('type') as 'image' | 'video') || 'image';

  const all = buildData().filter((i) => (year ? i.year === year : true) && (category === 'সবগুলো' ? true : i.category === category) && i.type === type);
  const total = all.length;
  const start = (page - 1) * perPage;
  const items = all.slice(start, start + perPage);

  return NextResponse.json({ items, total, page, perPage, years, categories, type });
}


