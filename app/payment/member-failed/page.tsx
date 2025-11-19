'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function MemberPaymentFailedPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-red-700 mb-2">
          পেমেন্ট সফল হয়নি
        </h1>
        <p className="text-gray-600 mb-6">
          দুঃখিত, আপনার পেমেন্ট প্রক্রিয়াকরণ করা যায়নি। এটি বিভিন্ন কারণে হতে পারে যেমন 
          ইনসাফিশিয়েন্ট ফান্ড, কার্ড সীমাবদ্ধতা, বা নেটওয়ার্ক সমস্যা।
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push('/get-involved')}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            আবার চেষ্টা করুন
          </button>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            হোমে ফিরে যান
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          যদি সমস্যা অব্যাহত থাকে, অনুগ্রহ করে আমাদের সাথে সরাসরি যোগাযোগ করুন।
        </p>
      </div>
    </div>
  );
}

