'use client';

import * as React from 'react';
import Button from '@/components/ui/Button';

export default function MemberApplication(): JSX.Element {
  const [type, setType] = React.useState<'lifetime' | 'donor'>('lifetime');
  const [amount, setAmount] = React.useState('100000');
  const [name, setName] = React.useState('');
  const [gender, setGender] = React.useState<'male' | 'female'>('male');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [thana, setThana] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!name || !mobile || !amount) return;
    alert('আবেদন গ্রহণ করা হয়েছে');
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">সদস্য আবেদন</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 rounded-lg overflow-hidden border">
          <button type="button" onClick={() => setType('lifetime')} className={`py-2 font-semibold ${type === 'lifetime' ? 'bg-emerald-600 text-white' : 'bg-white'}`}>আজীবন সদস্য</button>
          <button type="button" onClick={() => setType('donor')} className={`py-2 font-semibold ${type === 'donor' ? 'bg-emerald-600 text-white' : 'bg-white'}`}>দাতা সদস্য</button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">মুল্যমান *</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" className={`w-full rounded-lg border px-3 py-2 ${submitted && !amount ? 'border-red-400' : 'border-gray-300'}`} placeholder="৳ 100,000" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">নাম *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={`w-full rounded-lg border px-3 py-2 ${submitted && !name ? 'border-red-400' : 'border-gray-300'}`} placeholder="লিখুন" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">আমি একজন *</label>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2"><input type="radio" name="gender" checked={gender==='male'} onChange={() => setGender('male')} /> পুরুষ</label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="gender" checked={gender==='female'} onChange={() => setGender('female')} /> নারী</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">মোবাইল নম্বর *</label>
          <input value={mobile} onChange={(e)=>setMobile(e.target.value)} className={`w-full rounded-lg border px-3 py-2 ${submitted && !mobile ? 'border-red-400' : 'border-gray-300'}`} placeholder="01XXXXXXXXX" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ইমেইল</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-lg border px-3 py-2 border-gray-300" placeholder="example@mail.com" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">জেলা</label>
            <input value={district} onChange={(e)=>setDistrict(e.target.value)} className="w-full rounded-lg border px-3 py-2 border-gray-300" placeholder="লিখুন" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">থানা</label>
            <input value={thana} onChange={(e)=>setThana(e.target.value)} className="w-full rounded-lg border px-3 py-2 border-gray-300" placeholder="লিখুন" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ঠিকানা</label>
          <input value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full rounded-lg border px-3 py-2 border-gray-300" placeholder="লিখুন" />
        </div>
        <Button type="submit" className="w-full py-3 text-base font-semibold">আবেদন করুন</Button>
      </form>
    </div>
  );
}


