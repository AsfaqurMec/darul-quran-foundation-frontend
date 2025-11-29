import { ActivityItem } from '../components/activity/ActivityCard';

// Base activities data
const baseActivities: ActivityItem[] = [
  {
    id: 'nibirbachito-sangsad',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
    tag: 'নিয়মিত কার্যক্রম',
    title: 'নির্বাচিত সাংসদসহ যুবকদের সন্ধ্যায় মিলাদ মাহফিল',
    description: 'দারুল কুরআন মাদ্রাসা ও এতিমখানার সন্ধ্যায় মিলাদ মাহফিল অনুষ্ঠিত হয়েছে।',
    href: '/activities/nibirbachito-sangsad',
  },
  {
    id: 'winter',
    image: 'https://images.unsplash.com/photo-1579447727886-69928b1d9587?q=80&w=1600&auto=format&fit=crop',
    tag: 'নিয়মিত কার্যক্রম',
    title: 'শীতবস্ত্র বিতরণ',
    description: 'দরিদ্র মানুষের শরীরে উষ্ণতা ছড়িয়ে দিতে আমাদের আয়োজন।',
    href: '/activities/winter',
  },
  {
    id: 'water',
    image: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1600&auto=format&fit=crop',
    tag: 'নিয়মিত কার্যক্রম',
    title: 'নলকূপ ও পানি শোধনাগার স্থাপন',
    description: 'নিরাপদ পানির জন্য মানবিক উদ্যোগ।',
    href: '/activities/water',
  },
  {
    id: 'dev',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop',
    tag: 'নিয়মিত কার্যক্রম',
    title: 'দারুল কুরআন স্কিল ডেভেলপমেন্ট…',
    description: 'দক্ষতা উন্নয়ন, কর্মমুখী প্রশিক্ষণ এবং জ্ঞান বৃদ্ধি।',
    href: '/activities/dev',
  },
];

export function buildStaticActivities(): ActivityItem[] {
  // Try to read imported activities JSON first (client-safe)
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const parsed = require('./assunnah.activities.json') as Array<Partial<ActivityItem> & { id: string }>;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p) => ({
        id: p.id,
        image: p.image || '',
        tag: p.tag || 'কার্যক্রম',
        title: p.title || (p.id as string),
        description: p.description || '',
        href: `/activities/${p.id}`,
      }));
    }
  } catch {
    // fall back silently
  }

  const list: ActivityItem[] = [];
  for (let i = 0; i < 24; i++) {
    const b = baseActivities[i % baseActivities.length];
    const newId = `${b.id}-${i}`;
    list.push({ ...b, id: newId, href: b.href || `/activities/${b.id}` });
  }
  return list;
}

export function getLatestActivities(count: number = 3): ActivityItem[] {
  // Return the first count activities from base (latest/newest)
  return baseActivities.slice(0, count);
}

