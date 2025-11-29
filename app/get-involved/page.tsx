'use client';

import TranslatablePageHero from '../../components/common/TranslatablePageHero';
import Container from '../../components/layout/Container';
import JoinTabs from '../../components/get-involved/JoinTabs';
import InfoCard from '../../components/get-involved/InfoCard';
import { useI18n } from '../../components/i18n/LanguageProvider';

export default function GetInvolvedPage(): JSX.Element {
  const { t } = useI18n();

  return (
    <div className="space-y-10">
      <TranslatablePageHero translationKey="joinUsTitle" />
      <Container>
        <div className="space-y-6 mb-10">
          <h2 className="text-2xl font-semibold">{t('getInvolvedHeading')}</h2>
          <JoinTabs />

          {/* <InfoCard title="ব্যাংক ট্রান্সফার / বিকাশ / নগদ">
            <p>ম্যানুয়াল ডোনেশন পাঠাতে চাইলে আমাদের অফিসিয়াল অ্যাকাউন্টে পাঠান এবং প্রমাণপত্র ইমেইল করুন: autopay@assunnahfoundation.org</p>
            <div className="mt-2 text-sm">
              <p>বিকাশ: 01XXXXXXXXX (Merchant)</p>
              <p>নগদ: 01XXXXXXXXX</p>
            </div>
          </InfoCard> */}

          {/* <InfoCard title="ব্যবহার খাত">
            <ul className="list-disc pl-5 space-y-1">
              <li>শিক্ষা, দাওয়াহ, সেবা কার্যক্রম</li>
              <li>এতিম ও অসহায় সহায়তা</li>
              <li>দুর্যোগকালীন সহায়তা</li>
            </ul>
          </InfoCard> */}
        </div>
      </Container>
    </div>
  );
}


