import TranslatablePageHero from '@/components/common/TranslatablePageHero';
import AboutIntro from '@/components/about/AboutIntro';
import PolicyTabs from '@/components/about/PolicyTabs';
import FinancePolicy from '@/components/about/FinancePolicy';

export default function AboutPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <TranslatablePageHero translationKey="about" />
      <AboutIntro />
      <PolicyTabs />
      <FinancePolicy />
    </div>
  );
}


