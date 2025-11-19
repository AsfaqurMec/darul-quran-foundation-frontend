'use client';

import Container from '@/components/layout/Container';
import Tabs, { TabItem } from '@/components/ui/Tabs';
import { useI18n } from '@/components/i18n/LanguageProvider';

function List({ items }: { items: ReadonlyArray<string> }): JSX.Element {
  return (
    <ul className="space-y-4">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1 h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FinancePolicy(): JSX.Element {
  const { t } = useI18n();

  const income: ReadonlyArray<string> = [
    t('income1'),
    t('income2'),
    t('income3'),
    t('income4'),
    t('income5'),
    t('income6'),
  ];

  const expense: ReadonlyArray<string> = [
    t('expense1'),
    t('expense2'),
    t('expense3'),
    t('expense4'),
  ];

  const management: ReadonlyArray<string> = [
    t('management1'),
    t('management2'),
    t('management3'),
    t('management4'),
  ];

  const items: ReadonlyArray<TabItem> = [
    { id: 'income', label: t('incomeSources'), content: <List items={income} /> },
    { id: 'expense', label: t('expenseAreas'), content: <List items={expense} /> },
    { id: 'manage', label: t('managementPolicy'), content: <List items={management} /> },
  ];

  return (
    <section className="py-10">
      <Container>
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-emerald-900 mb-6">{t('financePolicyTitle')}</h2>
        <Tabs items={items} />
      </Container>
    </section>
  );
}


