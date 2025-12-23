'use client';

import Container from '../../components/layout/Container';
import Tabs, { TabItem } from '../../components/ui/Tabs';
import { useI18n } from '../../components/i18n/LanguageProvider';
import { FaArrowCircleRight } from "react-icons/fa";
function List({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ul className="space-y-4">
      {items.map((t, i) => (
        <div key={i} className="flex items-start justify-start gap-3 pl-2">
          {/* <span className="mt-1 h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</span> */}
          <FaArrowCircleRight className="text-emerald-600 mt-1 h-5 w-5 flex-shrink-0" />
          <span>{t}</span>
        </div>
      ))}
    </ul>
  );
}

export default function FinancePolicy() {
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


