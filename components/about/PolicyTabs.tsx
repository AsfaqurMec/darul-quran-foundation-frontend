'use client';

import Container from '../../components/layout/Container';
import Tabs, { TabItem } from '../../components/ui/Tabs';
import { useI18n } from '../../components/i18n/LanguageProvider';

export default function PolicyTabs(): JSX.Element {
  const { t } = useI18n();

  const policies = (
    <ul className="space-y-4">
      {[
        t('policy1'),
        t('policy2'),
        t('policy3'),
        t('policy4'),
        t('policy5'),
        t('policy6'),
      ].map((text, idx) => (
        <li key={idx} className="flex gap-3">
          <span className="mt-1 h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );

  const vision = (
    <div className="space-y-3">
      <p>{t('vision1')}</p>
      <p>{t('vision2')}</p>
    </div>
  );

  const faq = (
    <div className="space-y-3">
      <p><strong>{t('faqQuestion')}</strong> {t('faqQuestionText')}</p>
      <p><strong>{t('faqAnswer')}</strong> {t('faqAnswerText')}</p>
    </div>
  );

  const items: ReadonlyArray<TabItem> = [
    { id: 'policy', label: t('policyAndIdeals'), content: policies },
    { id: 'vision', label: t('vision'), content: vision },
    { id: 'faq', label: t('faq'), content: faq },
  ];

  return (
    <section className="py-10">
      <Container>
        <Tabs items={items} />
      </Container>
    </section>
  );
}


