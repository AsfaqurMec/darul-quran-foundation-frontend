import Container from '@/components/layout/Container';
import Tabs, { TabItem } from '@/components/ui/Tabs';

const policies = (
  <ul className="space-y-4">
    {[
      'পবিত্র কুরআন ও রাসুলের সুন্নাহর আলোকে নীতি ও আদর্শ।',
      'ইসলামের প্রাথমিক যুগের শ্রেষ্ঠ মুসলিমদের অনুসরণ।',
      'ঐক্য, সংহতি ও পারস্পরিক আন্তরিক নীতি মেনে চলা।',
      'সমাজের জন্য সহায়তামূলক ও মানবিক চেতনায় কাজ।',
      'দাওয়াহ, শিক্ষা ও কল্যাণমুখী কার্যক্রমে জোর দেয়া।',
      'সব মানুষের জন্য সেবা – বর্ণ, ধর্ম বা গোত্র নির্বিশেষে।',
    ].map((t, idx) => (
      <li key={idx} className="flex gap-3">
        <span className="mt-1 h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</span>
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const vision = (
  <div className="space-y-3">
    <p>সুন্নাহভিত্তিক জ্ঞানচর্চা ও কর্মের মাধ্যমে সত্যিকার ইসলামি জীবন গড়ে তোলা।</p>
    <p>শিক্ষা, দাওয়াহ ও মানবকল্যাণকে প্রযুক্তি-সমর্থ আধুনিক পদ্ধতিতে এগিয়ে নেয়া।</p>
  </div>
);

const faq = (
  <div className="space-y-3">
    <p><strong>প্রশ্ন:</strong> কিভাবে যুক্ত হব?</p>
    <p><strong>উত্তর:</strong> নিয়মিত দাতা/সদস্য/স্বেচ্ছাসেবক/ক্যারিয়ার অপশন থেকে শুরু করতে পারেন।</p>
  </div>
);

export default function PolicyTabs(): JSX.Element {
  const items: ReadonlyArray<TabItem> = [
    { id: 'policy', label: 'নীতি ও আদর্শ', content: policies },
    { id: 'vision', label: 'ভিশন', content: vision },
    { id: 'faq', label: 'প্রশ্নোত্তর', content: faq },
  ];

  return (
    <section className="py-10">
      <Container>
        <Tabs items={items} />
      </Container>
    </section>
  );
}


