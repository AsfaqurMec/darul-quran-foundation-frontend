'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { submitMemberAfterPayment } from '@/services/memberApplication';

export default function MemberPaymentSuccessPage(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const processPayment = async () => {
      try {
        // Extract transaction details from SSLCommerz callback
        // SSLCommerz typically sends data as query parameters or in the response body
        const transactionId = searchParams.get('tran_id') || searchParams.get('tranid');
        const status = searchParams.get('status');
        const amount = searchParams.get('amount');
        const currency = searchParams.get('currency');
        const bankTxnId = searchParams.get('bank_tran_id');
        const cardType = searchParams.get('card_type');
        const storeAmount = searchParams.get('store_amount');
        const valId = searchParams.get('val_id');

        // Check if payment was successful
        if (status !== 'VALID' && status !== 'VALIDATED') {
          setStatus('error');
          setMessage('পেমেন্ট সফল হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
          return;
        }

        if (!transactionId) {
          setStatus('error');
          setMessage('লেনদেন আইডি পাওয়া যায়নি। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।');
          return;
        }

        // Prepare data to send to backend
        const paymentData: Record<string, any> = {
          transactionId: transactionId!, // We already checked it exists above
          status,
          amount,
          currency,
          bankTxnId,
          cardType,
          storeAmount,
          valId,
        };

        // Add all query parameters from SSLCommerz response
        searchParams.forEach((value, key) => {
          paymentData[key] = value;
        });

        // Submit application data with transaction ID to backend
        const response = await submitMemberAfterPayment(paymentData as any);

        if (response.success) {
          setStatus('success');
          setMessage('আলহামদুলিল্লাহ! আপনার আবেদন সফলভাবে জমা দেওয়া হয়েছে। ধন্যবাদ।');
        } else {
          setStatus('error');
          setMessage(response.message || 'আবেদন সম্পন্ন করতে সমস্যা হয়েছে। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setStatus('error');
        setMessage('পেমেন্ট প্রক্রিয়াকরণে সমস্যা হয়েছে। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।');
      }
    };

    processPayment();
  }, [searchParams]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mb-2">
              প্রক্রিয়াকরণ হচ্ছে...
            </h1>
            <p className="text-gray-600 mb-6">
              আপনার পেমেন্ট প্রক্রিয়াকরণ করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mb-2">
              আলহামদুলিল্লাহ!
            </h1>
            <p className="text-xl font-semibold mb-4">পেমেন্ট সফল হয়েছে</p>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                হোমে ফিরে যান
              </button>
              <button
                onClick={() => router.push('/get-involved')}
                className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-5 py-3 font-semibold text-emerald-600 hover:bg-emerald-50"
              >
                আরও তথ্য দেখুন
              </button>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
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
              সমস্যা হয়েছে
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
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
          </>
        )}
      </div>
    </div>
  );
}

