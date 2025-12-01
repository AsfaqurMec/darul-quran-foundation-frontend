'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  clearDonationPayload,
  readDonationPayload,
  VALID_SSL_STATUSES,
  type DonationCachePayload,
} from '../../../lib/donationPayment';
import { createDonation } from '../../../services/donations';
import { useI18n } from '../../../components/i18n/LanguageProvider';

type PageState = 'loading' | 'success' | 'error';

function PaymentSuccessContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [state, setState] = React.useState<PageState>('loading');
  const [message, setMessage] = React.useState(t('paymentSuccessProcessing'));
  const [transactionId, setTransactionId] = React.useState<string | null>(null);
  const [donation, setDonation] = React.useState<Pick<DonationCachePayload, 'amount' | 'purposeLabel'> | null>(null);

  React.useEffect(() => {
    const finalizeDonation = async () => {
      try {
        const transaction =
          searchParams.get('tran_id') ||
          searchParams.get('tranid') ||
          searchParams.get('transactionId');
        const statusParam = searchParams.get('status')?.toUpperCase();
        const amountParam = searchParams.get('amount');

        if (!transaction) {
          setState('error');
          setMessage(t('paymentSuccessErrorNoTransactionId'));
          return;
        }

        // if (statusParam && !VALID_SSL_STATUSES.has(statusParam)) {
        //   setState('error');
        //   setMessage('পেমেন্ট যাচাই ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        //   return;
        // }

        // const cachedPayload = readDonationPayload();
        // if (!cachedPayload) {
        //   setState('error');
        //   setMessage('অনুদানের পূর্ববর্তী তথ্য খুঁজে পাওয়া যায়নি। আবার অনুদান দেওয়ার চেষ্টা করুন।');
        //   return;
        // }

        // const resolvedAmount =
        //   typeof amountParam === 'string' && amountParam.trim()
        //     ? parseFloat(amountParam)
        //     : cachedPayload.amount;

        const gatewayData = Object.fromEntries(searchParams.entries());

        // const response = await createDonation({
        //   purpose: cachedPayload.purpose,
        //   contact: cachedPayload.contact,
        //   amount: resolvedAmount,
        //   transactionId: transaction,
        //   gatewayData,
        // });

        // if (!response.success) {
        //   throw new Error(response.message || 'অনুদান সংরক্ষণ করা যায়নি।');
        // }

        clearDonationPayload();
        setTransactionId(transaction);
       // setDonation({ amount: resolvedAmount, purposeLabel: cachedPayload.purposeLabel });
        setMessage(t('paymentSuccessMessage'));
        setState('success');
      } catch (error) {
        console.error('Error completing donation payment:', error);
        setState('error');
        setMessage(
          error instanceof Error
            ? error.message
            : t('paymentSuccessErrorProcessing'),
        );
      }
    };

    finalizeDonation();
  }, [searchParams, t]);

  const renderContent = () => {
    if (state === 'loading') {
      return (
        <>
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-b-2 border-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700 mb-2 sm:mb-3">{t('loginProcessing')}</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">{message}</p>
        </>
      );
    }

    if (state === 'success') {
      return (
        <>
          <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700 mb-2 sm:mb-3">{t('paymentSuccessTitle')}</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">{t('paymentSuccessSubtitle')}</p>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">{message}</p>
          {transactionId && (
            <div className="w-full mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-mono bg-emerald-50 text-emerald-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 break-all sm:break-normal">
                <span className="uppercase tracking-[0.2em] text-[10px] sm:text-xs text-emerald-500 whitespace-nowrap">{t('transactionId').toUpperCase()}</span>
                <span className="break-all text-center sm:text-left">{transactionId}</span>
              </p>
            </div>
          )}
          {/* {donation && (
            <div className="w-full border border-emerald-100 rounded-xl bg-emerald-50/60 p-3 sm:p-4 text-left mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-emerald-700 font-semibold mb-1">{t('paymentSuccessDonationDetails')}</p>
              <p className="text-base sm:text-lg font-bold text-emerald-900">
                ৳ {donation.amount.toLocaleString('bn-BD', { maximumFractionDigits: 2 })}
              </p>
              {donation.purposeLabel && (
                <p className="text-xs sm:text-sm text-emerald-800 mt-1">{t('paymentSuccessPurpose')} {donation.purposeLabel}</p>
              )}
            </div>
          )} */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center w-full">
            <button
              onClick={() => router.push('/')}
              className="w-full sm:flex-1 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-emerald-700 transition-colors active:bg-emerald-800"
            >
              {t('paymentSuccessGoHome')}
            </button>
            <button
              onClick={() => router.push('/donation')}
              className="w-full sm:flex-1 inline-flex items-center justify-center rounded-lg border border-emerald-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors active:bg-emerald-100"
            >
              {t('paymentSuccessDonateAgain')}
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-red-700 mb-2 sm:mb-3">{t('paymentFailCancelled')}</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">{message}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center w-full">
          <button
            onClick={() => router.push('/donation')}
            className="w-full sm:flex-1 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-emerald-700 transition-colors active:bg-emerald-800"
          >
            {t('tryAgain')}
          </button>
          <button
            onClick={() => router.push('/contact')}
            className="w-full sm:flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors active:bg-gray-100"
          >
            {t('getHelp')}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <div className="max-w-xl w-full rounded-xl sm:rounded-2xl border border-emerald-200 bg-white/95 backdrop-blur p-4 sm:p-6 md:p-8 text-center shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage(): JSX.Element {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-xl w-full rounded-xl sm:rounded-2xl border border-emerald-200 bg-white/95 backdrop-blur p-4 sm:p-6 md:p-8 text-center shadow-lg">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-b-2 border-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700 mb-2 sm:mb-3">Loading...</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Processing payment information...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}


