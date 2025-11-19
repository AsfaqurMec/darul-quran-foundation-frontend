'use client';

import * as React from 'react';
import Button from '@/components/ui/button';
import { useI18n } from '@/components/i18n/LanguageProvider';

type Period = 'daily' | 'monthly';

export default function DonationWidget(): JSX.Element {
  const { t } = useI18n();
  const [period, setPeriod] = React.useState<Period>('daily');
  const [amount, setAmount] = React.useState<string>('20');
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [behalf, setBehalf] = React.useState('');
  const [method, setMethod] = React.useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [submitted, setSubmitted] = React.useState(false);

  const dailyPresetsTop = ['10', '20', '30'];
  const dailyPresetsBottom = ['50', '100'];
  const monthlyPresetsTop = ['300', '500', '1000'];
  const monthlyPresetsBottom = ['2000', '5000'];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!contact || !amount) return;
    alert(t('donationReceived'));
  };

  React.useEffect(() => {
    // Set sensible default when period changes
    if (period === 'daily') {
      setAmount('20');
    } else {
      setAmount('300');
    }
  }, [period]);

  return (
    <div className="rounded-2xl bg-emerald-700 text-white shadow overflow-hidden">
      <div className="p-5">
        <h3 className="text-xl font-extrabold leading-tight">{t('donationWidgetTitle')}</h3>
        <p className="mt-2 text-emerald-50 text-sm">
          {t('donationWidgetDesc')}
        </p>
      </div>
      <form onSubmit={onSubmit} className="bg-white text-gray-900 rounded-t-2xl p-5 space-y-4">
        {/* period tabs - pill style */}
        <div className="rounded-xl border border-emerald-100 p-1 grid grid-cols-2 gap-2">
          {([
            { id: 'daily', label: t('daily') },
            { id: 'monthly', label: t('monthly') },
          ] as const).map((tab) => {
            const isActive = period === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPeriod(tab.id)}
                className={`py-2 font-semibold rounded-lg border ${
                  isActive ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-emerald-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* preset amounts areas */}
        {period === 'daily' ? (
          <>
            <div className="rounded-xl border border-emerald-100 p-3 grid grid-cols-3 gap-3">
              {dailyPresetsTop.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`rounded-lg border py-2 font-semibold ${amount === v ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-emerald-200'}`}
                  onClick={() => setAmount(v)}
                >
                  ৳ {v}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-emerald-100 p-3 grid grid-cols-3 gap-3">
              {dailyPresetsBottom.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`rounded-lg border py-2 font-semibold ${amount === v ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-emerald-200'}`}
                  onClick={() => setAmount(v)}
                >
                  ৳ {v}
                </button>
              ))}
              <button
                type="button"
                className={`rounded-lg border py-2 font-semibold ${!dailyPresetsTop.concat(dailyPresetsBottom).includes(amount) ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-emerald-200'}`}
                onClick={() => setAmount('')}
              >
                {t('anyAmount')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3">
              {monthlyPresetsTop.map((v) => (
                <button key={v} type="button" className={`rounded-lg border py-2 font-semibold ${amount === v ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white'}`} onClick={() => setAmount(v)}>৳ {v}</button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {monthlyPresetsBottom.map((v) => (
                <button key={v} type="button" className={`rounded-lg border py-2 font-semibold ${amount === v ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white'}`} onClick={() => setAmount(v)}>৳ {v}</button>
              ))}
              <button type="button" className={`rounded-lg border py-2 font-semibold ${!monthlyPresetsTop.concat(monthlyPresetsBottom).includes(amount) ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white'}`} onClick={() => setAmount('')}>{t('anyAmount')}</button>
            </div>
          </>
        )}

        {/* fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">{t('donationAmount')} *</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" className={`w-full rounded-lg border px-3 py-2 ${submitted && !amount ? 'border-red-400' : 'border-gray-300'}`} placeholder="৳ 300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('yourName')}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder={t('write')} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('mobileOrEmail')} *</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} className={`w-full rounded-lg border px-3 py-2 ${submitted && !contact ? 'border-red-400' : 'border-gray-300'}`} placeholder={t('write')} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('donateOnBehalf')}</label>
            <input value={behalf} onChange={(e) => setBehalf(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder={t('write')} />
          </div>
        </div>

        {/* payment methods */}
        <div className="rounded-xl border p-4 space-y-3">
          <div className="text-sm font-semibold mb-1">{t('paymentMethod')} *</div>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" checked={method === 'bkash'} onChange={() => setMethod('bkash')} /> {t('bkash')}
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" checked={method === 'nagad'} onChange={() => setMethod('nagad')} /> {t('nagad')}
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" checked={method === 'card'} onChange={() => setMethod('card')} /> {t('card')}
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full py-3 text-base font-semibold">{t('nextStep')}</Button>
      </form>
    </div>
  );
}


