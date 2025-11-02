'use client';

import * as React from 'react';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';

const categories: { id: string; label: string; items: AccordionItem[] }[] = [
  {
    id: 'shaykh',
    label: 'শায়খ আহমাদুল্লাহ',
    items: [
      {
        id: 's1',
        question: 'শায়খ আহমাদুল্লাহর কাছ থেকে শরয়ী প্রশ্ন বা পরামর্শ জানতে চাই।',
        answer: (
          <div>
            <p>লাইভ অনুষ্ঠান “শরয়ী সমাধান” এবং অফিসিয়াল পেইজ/ইউটিউবে প্রশ্ন করতে পারেন। ফোন: +8809610-001089 (শুক্রবার ব্যতীত)।</p>
          </div>
        ),
      },
      {
        id: 's2',
        question: 'শায়খ আহমাদুল্লাহর সাথে সাক্ষাৎ করতে চাই।',
        answer: <p>সময় নির্ধারণ করে সাক্ষাৎ করতে হবে; ইমেইল বা ফোনে যোগাযোগ করুন।</p>,
      },
    ],
  },
  {
    id: 'donation',
    label: 'ডোনেশন সংক্রান্ত',
    items: [
      { id: 'd1', question: 'কিভাবে দান করবো?', answer: <p>গেট ইনভলভড পেইজ থেকে দান করুন বা ব্যাংক/মোবাইল ফাইন্যান্সিং ব্যবহার করুন।</p> },
      { id: 'd2', question: 'রসিদ কীভাবে পাব?', answer: <p>ইমেইলে কনফার্মেশন ও রসিদ পাঠানো হবে।</p> },
    ],
  },
  {
    id: 'volunteer',
    label: 'স্বেচ্ছাসেবক',
    items: [
      { id: 'v1', question: 'কীভাবে স্বেচ্ছাসেবক হব?', answer: <p>স্বেচ্ছাসেবক ফর্ম পূরণ করে জমা দিন; নির্বাচিত হলে আপনাকে জানানো হবে।</p> },
    ],
  },
];

export default function ContactFaq(): JSX.Element {
  const [active, setActive] = React.useState<string>(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 h-max">
          <div className="space-y-2">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`w-full text-left rounded-lg px-3 py-2 ${active === c.id ? 'bg-white text-emerald-800 font-semibold' : 'hover:bg-white/60'}`}>{c.label}</button>
            ))}
          </div>
        </aside>
        <div>
          <Accordion items={current.items} />
        </div>
      </div>
    </section>
  );
}


