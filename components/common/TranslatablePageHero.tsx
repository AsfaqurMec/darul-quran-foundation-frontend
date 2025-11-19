'use client';

import PageHero from './PageHero';
import { useI18n } from '@/components/i18n/LanguageProvider';

type Props = {
  translationKey: Parameters<ReturnType<typeof useI18n>['t']>[0];
  imageSrc?: string;
  overlayClassName?: string;
};

export default function TranslatablePageHero({ translationKey, imageSrc, overlayClassName }: Props): JSX.Element {
  const { t } = useI18n();
  return <PageHero title={t(translationKey)} imageSrc={imageSrc} overlayClassName={overlayClassName} />;
}

