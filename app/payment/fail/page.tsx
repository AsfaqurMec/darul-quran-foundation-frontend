'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useI18n } from '../../../components/i18n/LanguageProvider';

function PaymentFailContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const reason = searchParams.get('reason') || searchParams.get('status');
  const transactionId = searchParams.get('tran_id') || searchParams.get('tranid');

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">{t('paymentFailSorry')}</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('paymentFailCancelled')}</h2>
          <p className="text-gray-700">
            {t('paymentFailMessage')}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('paymentFailWhatToDo')}</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">{t('paymentFailCheckCard')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">{t('paymentFailCheckInternet')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">{t('paymentFailContactUs')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('paymentFailContact')}</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{t('paymentFailHotline')}</p>
                <p className="text-gray-700">+8809610-001089</p>
                <p className="text-sm text-gray-600">{t('paymentFailOperatingHours')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{t('paymentFailEmail')}</p>
                <p className="text-gray-700">contact@assunnahfoundation.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage(): JSX.Element {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-xl w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <PaymentFailContent />
    </Suspense>
  );
}

