'use client';

import Container from '../../components/layout/Container';
import TranslatablePageHero from '../../components/common/TranslatablePageHero';
import { useI18n } from '../../components/i18n/LanguageProvider';

type TranslateFn = ReturnType<typeof useI18n>['t'];
type TranslationKey = Parameters<TranslateFn>[0];

const usageList: TranslationKey[] = [
  'privacyUsageItem1',
  'privacyUsageItem2',
  'privacyUsageItem3',
  'privacyUsageItem4',
];

const disclosureList: TranslationKey[] = [
  'privacyLegalItem1',
  'privacyLegalItem2',
  'privacyLegalItem3',
];

export default function PrivacyPolicyPage(): JSX.Element {
  const { t } = useI18n();

  return (
    <div className="space-y-10">
      <TranslatablePageHero translationKey="privacyPageTitle" />
      <Container>
        <article className="space-y-8 max-w-4xl text-lg leading-relaxed text-slate-700">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('privacyStatementTitle')}</h2>
            <p>{t('privacyStatementBody1')}</p>
            <p>{t('privacyStatementBody2')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('privacyCollectionTitle')}</h2>
            <p>{t('privacyCollectionBody1')}</p>
            <p>{t('privacyCollectionBody2')}</p>
            <p>{t('privacyCollectionBody3')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('privacyUsageTitle')}</h2>
            <p>{t('privacyUsageIntro')}</p>
            <ul className="list-disc space-y-2 pl-6">
              {usageList.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
            <p>{t('privacyUsageBody1')}</p>
            <p>{t('privacyUsageBody2')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('privacyLegalTitle')}</h2>
            <p>{t('privacyLegalIntro')}</p>
            <ul className="list-disc space-y-2 pl-6">
              {disclosureList.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('privacyControlTitle')}</h2>
            <p>
              {t('privacyControlBody1')}{' '}
              <a className="text-primary-600 underline" href={`mailto:${t('privacyControlEmail')}`}>
                {t('privacyControlEmail')}
              </a>
              {' '}{t('privacyControlBody2')}
            </p>
            <p>{t('privacyControlBody3')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('privacySecurityTitle')}</h2>
            <p>{t('privacySecurityBody1')}</p>
            <p>{t('privacySecurityBody2')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">{t('privacyChangesTitle')}</h2>
            <p>{t('privacyChangesBody1')}</p>
            <p>{t('privacyChangesBody2')}</p>
          </section>
        </article>
      </Container>
    </div>
  );
}


