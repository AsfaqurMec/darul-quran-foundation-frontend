'use client';

import * as React from 'react';
import Input from '@/components/ui/Input';
import Select, { SelectOption } from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export type DonationFormProps = {
  purposes?: ReadonlyArray<SelectOption>;
};

const defaultPurposes: ReadonlyArray<SelectOption> = [
  { value: '', label: 'নির্বাচন করুন' },
  { value: 'orphan_responsibility', label: 'এতিমদের দায়িত্ব গ্রহণ' },
  { value: 'deprived_students', label: 'সুবিধাবঞ্চিত ছাত্রদের দায়িত্ব গ্রহণ' },
  { value: 'widow_responsibility', label: 'বিধবা নারীর দায়িত্ব গ্রহণ' },
  { value: 'rehabilitation_poor_family', label: 'দরিদ্র পরিবারের পুনর্বাসন' },
  { value: 'tube_well_install', label: 'নলকূপ খনন' },
  { value: 'wudu_place_install', label: 'ওযুখানা স্থাপন' },
  { value: 'dowry_responsibility', label: 'দায়গ্রস্ত কন্যার বিবাহ' },
  { value: 'skill_development', label: 'স্কিল ডেভেলপমেন্ট' },
  { value: 'winter_clothes', label: 'শীত বস্ত্র বিতরণ' },
  { value: 'mosque_construction', label: 'মসজিদ নির্মাণ' },
  { value: 'orphanage_construction', label: 'এতিমখানা নির্মাণ' },
  { value: 'zakat_fund', label: 'যাকাত তহবিল' },
  { value: 'general_fund', label: 'সাধারণ তহবিল' },
  { value: 'iftar_program', label: 'ইফতার প্রোগ্রাম' },
  { value: 'qurbani_program', label: 'কুরবানী প্রোগ্রাম' },
  { value: 'emergency_relief', label: 'দুর্যোগে জরুরি ত্রাণ' },
  { value: 'shelterless_housing', label: 'গৃহহীনদের গৃহ নির্মাণ' }
];

export default function DonationForm({ purposes = defaultPurposes }: DonationFormProps): JSX.Element {
  const [purpose, setPurpose] = React.useState<string>('');
  const [contact, setContact] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [submitted, setSubmitted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedLabel = purposes.find((opt) => opt.value === purpose)?.label || 'নির্বাচন করুন';

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!purpose || !contact || !amount) return;
    // Placeholder submit handling - replace with API later
    // console.log({ purpose, contact, amount: Number(amount) });
    alert('ধন্যবাদ! আপনার অনুদানের তথ্য গৃহীত হয়েছে।');
  };

  const purposeError = submitted && !purpose ? 'তহবিল নির্বাচন করুন' : null;
  const contactError = submitted && !contact ? 'মোবাইল অথবা ইমেইল দিন' : null;
  const amountError = submitted && !amount ? 'সংখ্যা লিখুন' : null;

  return (
    <div className="relative rounded-3xl border border-brand/30 bg-brand/10 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-brand/10 to-brand/5 opacity-50"></div>
      
      {/* Glass morphism effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/12 via-brand/8 to-brand/12 backdrop-blur-2xl"></div>
      
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-8" aria-hidden>
        <svg viewBox="0 0 400 200" className="h-full w-full fill-none stroke-brand/30">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20h40M20 0v40" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <h2 className="relative z-10 text-center text-xl sm:text-2xl font-extrabold text-white mb-6 drop-shadow-lg">
        আপনার অনুদান প্রদান করুন
      </h2>
      <form onSubmit={onSubmit} className="relative z-10 space-y-4">
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium mb-2 text-white drop-shadow-md">
            তহবিল <span className="text-red-300">*</span>
          </label>
          <div className="relative" ref={dropdownRef}>
            {/* Dropdown Header */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full text-left rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all flex items-center justify-between"
            >
              <span className={purpose ? 'text-white' : 'text-white/70'}>{selectedLabel}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dropdown List */}
            {isOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                {/* Scrollable Options List */}
                <div className="overflow-y-auto custom-scrollbar rounded-t-lg" style={{ maxHeight: '420px' }}>
                  {purposes.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setPurpose(opt.value);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-gray-900 font-semibold hover:bg-brand/20 transition-colors ${
                        purpose === opt.value ? 'bg-gray-100' : ''
                      } ${opt.value === '' ? 'text-gray-400' : ''}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {/* Bottom indicator */}
                <div className="flex justify-end px-2 py-1 border-t border-gray-100 bg-white rounded-b-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-400">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {purposeError && <p className="mt-1 text-xs text-red-300 drop-shadow-md">{purposeError}</p>}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="contact" className="block text-sm font-medium mb-2 text-white drop-shadow-md">
              মোবাইল / ইমেইল <span className="text-red-300">*</span>
            </label>
            <input
              id="contact"
              type="text"
              placeholder="মোবাইল নম্বর / ইমেইল লিখুন"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all"
            />
            {contactError && <p className="mt-1 text-xs text-red-300 drop-shadow-md">{contactError}</p>}
          </div>
          
          <div className="flex-1">
            <label htmlFor="amount" className="block text-sm font-medium mb-2 text-white drop-shadow-md">
              পরিমাণ <span className="text-red-300">*</span>
            </label>
            <input
              id="amount"
              type="text"
              inputMode="numeric"
              placeholder="৳ সংখ্যা লিখুন"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/20 backdrop-blur-md px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all"
            />
            {amountError && <p className="mt-1 text-xs text-red-300 drop-shadow-md">{amountError}</p>}
          </div>
        </div>
        
        <div className="pt-2">
          <Button type="submit" className="w-full px-4 py-3 text-base font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-lg">
            দান করুন
          </Button>
        </div>
      </form>
      <p className="relative z-0 mt-4 text-center text-xs sm:text-sm text-white/90 drop-shadow-md">
        দারুল কুরআন ফাউন্ডেশনে দান করতে করেই আপনি | <a className="underline hover:text-white transition-colors" href="#details">বিস্তারিত জানতে ক্লিক করুন</a>
      </p>
    </div>
  );
}


