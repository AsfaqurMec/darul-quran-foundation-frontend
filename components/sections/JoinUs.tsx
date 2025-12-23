'use client';

import Container from '../../components/layout/Container';
import { useI18n } from '../../components/i18n/LanguageProvider';

type JoinItem = {
  href: string;
  titleKey: keyof ReturnType<typeof useI18n>['t'];
  icon?: React.ReactElement;
  gradient: string; // tailwind gradient classes
};

const items: ReadonlyArray<JoinItem> = [
  {
    href: '/get-involved',
    titleKey: 'regularDonor' as keyof ReturnType<typeof useI18n>['t'],
    gradient: 'from-emerald-600 via-emerald-600 to-emerald-700',
  },
  {
    href: '/get-involved',
    titleKey: 'lifetimeMember' as keyof ReturnType<typeof useI18n>['t'],
    gradient: 'from-sky-500 via-sky-500 to-sky-600',
  },
  {
    href: '/get-involved',
    titleKey: 'volunteer' as keyof ReturnType<typeof useI18n>['t'],
    gradient: 'from-amber-400 via-amber-400 to-amber-500',
  },

];

function JoinCard({ href, titleKey, gradient }: JoinItem) {
  const { t } = useI18n();
  return (
    <a href={href} className="group block">
      <div className={`rounded-3xl p-1 border border-dashed border-emerald-700/40`}> 
        <div className={`rounded-2xl h-40 sm:h-44 w-full bg-gradient-to-br ${gradient} 
          text-white flex items-center justify-center text-2xl sm:text-3xl font-extrabold 
          shadow transition-transform group-hover:-translate-y-0.5 cursor-pointer text-center`}>
          {t(titleKey)}
        </div>
      </div>
    </a>
  );
}

export default function JoinUs() {
  const { t } = useI18n();
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">{t('joinUsTitle')}</h2>
          <p className="text-emerald-800/80 mt-2">{t('joinUsSubtitle')}</p>
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <JoinCard {...items[0]} />
          <JoinCard {...items[1]} />
          <JoinCard {...items[2]} />
        </div>
      </Container>
    </section>
  );
}


