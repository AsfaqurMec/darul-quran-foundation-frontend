'use client';

import * as React from 'react';
import Button from '@/components/ui/Button';

type Period = 'daily' | 'monthly';

export default function DonationWidget(): JSX.Element {
  const [period, setPeriod] = React.useState<Period>('daily');
  const [amount, setAmount] = React.useState<string>('300');
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [behalf, setBehalf] = React.useState('');
  const [method, setMethod] = React.useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [submitted, setSubmitted] = React.useState(false);

  const presetsTop = ['300', '500', '1000'];
  const presetsBottom = ['2000', '5000'];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!contact || !amount) return;
    alert('ধন্যবাদ! আপনার অনুদান গ্রহণ করা হয়েছে।');
  };

  return (
    <div className="rounded-2xl bg-emerald-700 text-white shadow overflow-hidden">
      <div className="p-5">
        <h3 className="text-xl font-extrabold leading-tight">অংশ নিন ফাউন্ডেশনের সকল কল্যাণমূলক কাজে</h3>
        <p className="mt-2 text-emerald-50 text-sm">
          এই খাতে দানের মাধ্যমে ফাউন্ডেশনের সকল কল্যাণমূলক কাজের অংশীদার হতে পারবেন।
        </p>
      </div>
      <form onSubmit={onSubmit} className="bg-white text-gray-900 rounded-t-2xl p-5 space-y-4">
        {/* period tabs */}
        <div className="grid grid-cols-2 rounded-lg overflow-hidden border">
          {([
            { id: 'daily', label: 'দৈনিক' },
            { id: 'monthly', label: 'মাসিক' },
          ] as const).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPeriod(t.id)}
              className={`py-2 font-semibold ${period === t.id ? 'bg-emerald-600 text-white' : 'bg-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* preset amounts */}
        <div className="grid grid-cols-3 gap-3">
          {presetsTop.map((v) => (
            <button key={v} type="button" className={`rounded-lg border py-2 font-semibold ${amount === v ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white'}`} onClick={() => setAmount(v)}>৳ {v}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {presetsBottom.map((v) => (
            <button key={v} type="button" className={`rounded-lg border py-2 font-semibold ${amount === v ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white'}`} onClick={() => setAmount(v)}>৳ {v}</button>
          ))}
          <button type="button" className={`rounded-lg border py-2 font-semibold ${!presetsTop.concat(presetsBottom).includes(amount) ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white'}`} onClick={() => setAmount('')}>যে কোনো পরিমাণ</button>
        </div>

        {/* fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">পরিমাণ *</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" className={`w-full rounded-lg border px-3 py-2 ${submitted && !amount ? 'border-red-400' : 'border-gray-300'}`} placeholder="৳ 300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">আপনার নাম</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="লিখুন" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">মোবাইল / ইমেইল *</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} className={`w-full rounded-lg border px-3 py-2 ${submitted && !contact ? 'border-red-400' : 'border-gray-300'}`} placeholder="লিখুন" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">অন্য কারো পক্ষ থেকে দান করলে তার নাম লিখুন</label>
            <input value={behalf} onChange={(e) => setBehalf(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="লিখুন" />
          </div>
        </div>

        {/* payment methods */}
        <div className="rounded-xl border p-4 space-y-3">
          <div className="text-sm font-semibold mb-1">পেমেন্ট মেথড *</div>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" checked={method === 'bkash'} onChange={() => setMethod('bkash')} /> বিকাশ
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" checked={method === 'nagad'} onChange={() => setMethod('nagad')} /> নগদ
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" checked={method === 'card'} onChange={() => setMethod('card')} /> কার্ড
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full py-3 text-base font-semibold">পরবর্তী ধাপ</Button>
      </form>
    </div>
  );
}


