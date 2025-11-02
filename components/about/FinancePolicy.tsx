import Container from '@/components/layout/Container';
import Tabs, { TabItem } from '@/components/ui/Tabs';

function List({ items }: { items: ReadonlyArray<string> }): JSX.Element {
  return (
    <ul className="space-y-4">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1 h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FinancePolicy(): JSX.Element {
  const income: ReadonlyArray<string> = [
    'বিভিন্ন ব্যক্তি ও প্রতিষ্ঠান থেকে প্রাপ্ত স্বেচ্ছা অনুদান ও অর্থসহায়তা।',
    'সদস্য, সমর্থক ও শুভাকাঙ্ক্ষীদের এককালীন ও নিয়মিত অনুদান।',
    'ফাউন্ডেশনের যে কোনো প্রকল্পের জন্য সংরক্ষিত অর্থ।',
    'সৎ মুসলিমদের প্রেরণা যাকাত।',
    'ইফতার ও কুরবানিসহ বিশেষ প্রকল্প খাতে উৎসর্গকৃত অর্থ।',
    'ফাউন্ডেশনের বিভিন্ন আয়োজনে প্রাপ্ত অর্থ।',
  ];

  const expense: ReadonlyArray<string> = [
    'শিক্ষা, দাওয়াহ, সেবা—আলোর পথে মানবকল্যাণমূলক খাতে ব্যয়।',
    'প্রকল্প অনুযায়ী নির্ধারিত খাতে ব্যয়।',
    'গবেষণা, প্রকাশনা, ট্রেনিং, সচেতনতা কর্মসূচিতে ব্যয়।',
    'ফাউন্ডেশনের তত্ত্বাবধানে বিপর্যস্ত মানুষের সহায়তা।',
  ];

  const management: ReadonlyArray<string> = [
    'হিসাবরক্ষণ ও অডিট নীতিমালা অনুযায়ী স্বচ্ছ ব্যবস্থাপনা।',
    'বোর্ডের সিদ্ধান্ত ব্যতীত কোনো খাতে ব্যয় নয়।',
    'প্রকল্পভিত্তিক তহবিলের অর্থ নির্দিষ্ট খাতে সংরক্ষণ ও ব্যয়।',
    'দাতাদের কাছে প্রয়োজনানুযায়ী রিপোর্টিং ও আপডেট প্রদান।',
  ];

  const items: ReadonlyArray<TabItem> = [
    { id: 'income', label: 'আয়ের উৎস', content: <List items={income} /> },
    { id: 'expense', label: 'ব্যয়মুখুল বর্ণ', content: <List items={expense} /> },
    { id: 'manage', label: 'ব্যবস্থাপনা নীতি', content: <List items={management} /> },
  ];

  return (
    <section className="py-10">
      <Container>
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-emerald-900 mb-6">আয়-ব্যয়ের নীতিমালা</h2>
        <Tabs items={items} />
      </Container>
    </section>
  );
}


