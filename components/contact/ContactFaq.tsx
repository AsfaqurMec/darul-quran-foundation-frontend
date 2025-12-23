'use client';

import * as React from 'react';
import Accordion, { AccordionItem } from '../../components/ui/Accordion';
import { useI18n } from '../../components/i18n/LanguageProvider';

export default function ContactFaq(): React.ReactElement {
  const { t } = useI18n();
  const [active, setActive] = React.useState<string>('shaykh');

  const categories = React.useMemo(() => [
    {
      id: 'shaykh',
      labelKey: 'shaykhAhmadullah' as const,
      items: [
        {
          id: 's1',
          question: t('shaykhQ1'),
          answer: (
            <div>
              <p>{t('shaykhA1')}</p>
            </div>
          ),
        },
        {
          id: 's2',
          question: t('shaykhQ2'),
          answer: <p>{t('shaykhA2')}</p>,
        },
      ],
    },
    {
      id: 'donation',
      labelKey: 'donationRelated' as const,
      items: [
        { id: 'd1', question: t('donationQ1'), answer: <p>{t('donationA1')}</p> },
        { id: 'd2', question: t('donationQ2'), answer: <p>{t('donationA2')}</p> },
      ],
    },
    {
      id: 'volunteer',
      labelKey: 'volunteerRelated' as const,
      items: [
        { id: 'v1', question: t('volunteerQ1'), answer: <p>{t('volunteerA1')}</p> },
      ],
    },
  ], [t]);

  const current = categories.find((c) => c.id === active)!;

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 h-max">
          <div className="space-y-2">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`w-full text-left rounded-lg px-3 py-2 ${active === c.id ? 'bg-white text-emerald-800 font-semibold' : 'hover:bg-white/60'}`}>{t(c.labelKey)}</button>
            ))}
          </div>
        </aside>
        <div>
          <Accordion items={current.items} />
        </div>
      </div>
    </section>
  );
}


