import PageHero from '@/components/common/PageHero';
import AboutIntro from '@/components/about/AboutIntro';
import PolicyTabs from '@/components/about/PolicyTabs';
import FinancePolicy from '@/components/about/FinancePolicy';

export default function AboutPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <PageHero title="আমাদের সম্পর্কে" />
      <AboutIntro />
      <PolicyTabs />
      <FinancePolicy />
    </div>
  );
}


