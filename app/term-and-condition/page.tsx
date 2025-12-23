'use client';

import Container from '../../components/layout/Container';
import TranslatablePageHero from '../../components/common/TranslatablePageHero';
import { useI18n } from '../../components/i18n/LanguageProvider';

type TranslateFn = ReturnType<typeof useI18n>['t'];
type TranslationKey = Parameters<TranslateFn>[0];

type Section = {
  titleKey: TranslationKey;
  bodyKeys: TranslationKey[];
};

const sections: Section[] = [
  {
    titleKey: 'termsIntroTitle',
    bodyKeys: ['termsIntroBody1', 'termsIntroBody2'],
  },
  {
    titleKey: 'termsTrademarkTitle',
    bodyKeys: ['termsTrademarkBody'],
  },
  {
    titleKey: 'termsCopyrightTitle',
    bodyKeys: ['termsCopyrightBody'],
  },
  {
    titleKey: 'termsAccountSecurityTitle',
    bodyKeys: ['termsAccountSecurityBody'],
  },
  {
    titleKey: 'termsLicenseTitle',
    bodyKeys: ['termsLicenseBody1', 'termsLicenseBody2'],
  },
  {
    titleKey: 'termsUserContentTitle',
    bodyKeys: ['termsUserContentBody1', 'termsUserContentBody2'],
  },
  {
    titleKey: 'termsLiabilityTitle',
    bodyKeys: ['termsLiabilityBody1', 'termsLiabilityBody2'],
  },
  {
    titleKey: 'termsRefundTitle',
    bodyKeys: ['termsRefundBody1', 'termsRefundBody2', 'termsRefundBody3'],
  },
  {
    titleKey: 'termsGoverningLawTitle',
    bodyKeys: ['termsGoverningLawBody'],
  },
  {
    titleKey: 'termsChangesTitle',
    bodyKeys: ['termsChangesBody'],
  },
];

export default function TermsAndConditionPage(): React.ReactElement {
  const { t } = useI18n();

  return (
    <div className="space-y-10">
      <TranslatablePageHero translationKey="termsPageTitle" />

      <Container>
        <article className="max-w-4xl space-y-8 text-lg leading-relaxed text-slate-700">
          {sections.map((section) => (
            <section key={section.titleKey} className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">{t(section.titleKey)}</h2>
              {section.bodyKeys.map((bodyKey) => (
                <p key={bodyKey}>{t(bodyKey)}</p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </div>
  );
}


