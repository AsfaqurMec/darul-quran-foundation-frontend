import { Notice } from '@/components/notice/NoticeCard';

export type NoticeDetailData = Notice & {
  fullContent?: string;
  author?: string;
  category?: string;
  relatedNotices?: string[];
};

const baseNotices: NoticeDetailData[] = [
  {
    id: 'n1',
    title: 'শিক্ষক প্রশিক্ষণ প্রোগ্রাম',
    date: '2025-08-23',
    tag: 'কোর্স',
    excerpt: '৩ ও ৪ মাস মেয়াদি শিক্ষক প্রশিক্ষণ—রেজিস্ট্রেশন চলছে।',
    category: 'প্রশিক্ষণ',
    fullContent: `দারুল কুরআন মাদ্রাসা ও এতিমখানার উদ্যোগে শিক্ষক প্রশিক্ষণ প্রোগ্রাম চালু করা হয়েছে। এই প্রোগ্রামে অংশগ্রহণকারী শিক্ষকদের বিভিন্ন বিষয়ে প্রশিক্ষণ প্রদান করা হবে।

প্রশিক্ষণের বিস্তারিত:
• ৩ মাস মেয়াদি বেসিক কোর্স
• ৪ মাস মেয়াদি অ্যাডভান্সড কোর্স
• কুরআন শিক্ষার পদ্ধতি
• শিশু মনস্তত্ত্ব ও শিক্ষা
• আধুনিক শিক্ষা প্রযুক্তি

রেজিস্ট্রেশন প্রক্রিয়া:
রেজিস্ট্রেশন করতে অনলাইন ফর্ম পূরণ করুন অথবা সরাসরি আমাদের অফিসে যোগাযোগ করুন। রেজিস্ট্রেশন চলছে এবং সীমিত সংখ্যক আসন উপলব্ধ।`,
  },
  {
    id: 'n2',
    title: 'স্কলারশিপ আবেদন চলছে',
    date: '2025-07-10',
    tag: 'স্কলারশিপ',
    excerpt: 'দরিদ্র মেধাবী শিক্ষার্থীদের জন্য স্কলারশিপ।',
    category: 'স্কলারশিপ',
    fullContent: `দারুল কুরআন ফাউন্ডেশন থেকে দরিদ্র ও মেধাবী শিক্ষার্থীদের জন্য স্কলারশিপ প্রদান করা হচ্ছে। এই স্কলারশিপ কার্যক্রমে অংশগ্রহণ করতে পারবেন যারা:

যোগ্যতার শর্তাবলী:
• মাসিক পারিবারিক আয় ২০,০০০ টাকার নিচে
• শিক্ষা প্রতিষ্ঠানে নিয়মিত উপস্থিতি
• পূর্ববর্তী পরীক্ষায় ভালো ফলাফল
• সামাজিক ও আর্থিক সুবিধাবঞ্চিত পরিবার

আবেদনের প্রক্রিয়া:
আবেদন করতে প্রয়োজনীয় কাগজপত্রসহ অনলাইন ফর্ম পূরণ করুন। আবেদনের শেষ তারিখ: আগামী ৩০ দিনের মধ্যে।`,
  },
];

export function buildStaticNotices(): NoticeDetailData[] {
  const arr: NoticeDetailData[] = [];
  for (let i = 0; i < 25; i++) {
    const b = baseNotices[i % baseNotices.length];
    const d = new Date(b.date);
    d.setDate(d.getDate() - i);
    arr.push({
      ...b,
      id: `${b.id}-${i}`,
      date: d.toISOString(),
      href: `/notice/${b.id}-${i}`,
      relatedNotices: [
        baseNotices[(i + 1) % baseNotices.length].id + `-${i + 1}`,
        baseNotices[(i + 2) % baseNotices.length].id + `-${i + 2}`,
      ],
    });
  }
  return arr;
}

export function getNoticeDetail(id: string): NoticeDetailData | null {
  const all = buildStaticNotices();
  return all.find((notice) => notice.id === id || notice.href?.includes(id)) || null;
}

