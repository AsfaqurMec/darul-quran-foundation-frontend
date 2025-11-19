'use client';

import Button from '@/components/ui/button';
import Container from '@/components/layout/Container';
import { useI18n } from '@/components/i18n/LanguageProvider';

type Feature = {
  titleKey: keyof ReturnType<typeof useI18n>['t'];
  bodyKey: keyof ReturnType<typeof useI18n>['t'];
  icon: JSX.Element;
};

function FeatureCard({ titleKey, bodyKey, icon }: Feature): JSX.Element {
  const { t } = useI18n();
  return (
    <div className="text-center px-4">
      <div className="mx-auto mb-4 h-14 w-14 text-amber-700">{icon}</div>
      <h3 className="text-3xl font-extrabold text-emerald-900 mb-3">{t(titleKey)}</h3>
      <p className="text-gray-700 leading-8">{t(bodyKey)}</p>
    </div>
  );
}

export default function MissionTriplet(): JSX.Element {
  const { t } = useI18n();
  const features: ReadonlyArray<Feature> = [
    {
      titleKey: 'education',
      bodyKey: 'educationDesc',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 mx-auto">
          <path d="M11.7 2.5a1 1 0 0 1 .6 0l8 3a1 1 0 0 1 0 1.88l-8 3a1 1 0 0 1-.6 0l-8-3A1 1 0 0 1 3 5.5l8-3Z" />
          <path d="M4 9.36V13a9 9 0 0 0 8 5 9 9 0 0 0 8-5V9.36l-7.4 2.77a3 3 0 0 1-1.2.2 3 3 0 0 1-1.2-.2L4 9.36Z" />
        </svg>
      ),
    },
    {
      titleKey: 'service',
      bodyKey: 'serviceDesc',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 mx-auto">
          <path d="M7.5 8.25a2.25 2.25 0 1 1 3 2.122V15a.75.75 0 0 1-1.5 0v-1.5H7.5A2.25 2.25 0 0 1 7.5 8.25Zm9 0a2.25 2.25 0 1 0-3 2.122V15a.75.75 0 0 0 1.5 0v-1.5h1.5a2.25 2.25 0 0 0 0-4.5Z" />
        </svg>
      ),
    },
    {
      titleKey: 'dawah',
      bodyKey: 'dawahDesc',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 mx-auto">
          <path d="M4.5 5.25A2.25 2.25 0 0 1 6.75 3h8.25A2.25 2.25 0 0 1 17.25 5.25v13.5A2.25 2.25 0 0 1 15 21H6.75A2.25 2.25 0 0 1 4.5 18.75V5.25Z" />
          <path d="M18 6h.75A2.25 2.25 0 0 1 21 8.25v10.5A2.25 2.25 0 0 1 18.75 21H15a.75.75 0 0 1-.75-.75V6H18Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="pt-[500px] md:pt-[530px] lg:pt-[220px] pb-10">
      <Container>
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-emerald-900 mb-10">{t('missionTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, idx) => (
            <FeatureCard key={idx} {...f} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button className="px-6 py-3 text-base">{t('learnMore')}</Button>
        </div>
      </Container>
    </section>
  );
}


