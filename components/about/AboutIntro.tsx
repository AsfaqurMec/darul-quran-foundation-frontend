'use client';

import Container from '@/components/layout/Container';
import { useI18n } from '@/components/i18n/LanguageProvider';

export default function AboutIntro(): JSX.Element {
  const { t } = useI18n();
  return (
    <section className="py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
              alt="About collage"
              className="rounded-2xl shadow border border-gray-200"
            />
          </div>
          <div className="text-gray-800 leading-8">
            <p>
              {t('aboutIntro1')}
            </p>
            <p className="mt-4">
              {t('aboutIntro2')}
            </p>
            <p className="mt-4">
              {t('aboutIntro3')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}


