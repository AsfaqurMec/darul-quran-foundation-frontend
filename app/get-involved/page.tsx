import PageHero from '@/components/common/PageHero';
import Container from '@/components/layout/Container';
import DonationWidget from '@/components/donation/DonationWidget';
import JoinTabs from '@/components/get-involved/JoinTabs';
import InfoCard from '@/components/get-involved/InfoCard';

export default function GetInvolvedPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <PageHero title="আমাদের সাথে যুক্ত হন" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* Left column - content blocks */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">আমাদের সাথে যুক্ত হতে পারেন বিভিন্নভাবে</h2>
            <JoinTabs />

            <InfoCard title="ব্যাংক ট্রান্সফার / বিকাশ / নগদ">
              <p>ম্যানুয়াল ডোনেশন পাঠাতে চাইলে আমাদের অফিসিয়াল অ্যাকাউন্টে পাঠান এবং প্রমাণপত্র ইমেইল করুন: autopay@assunnahfoundation.org</p>
              <div className="mt-2 text-sm">
                <p>বিকাশ: 01XXXXXXXXX (Merchant)</p>
                <p>নগদ: 01XXXXXXXXX</p>
              </div>
            </InfoCard>

            <InfoCard title="ব্যবহার খাত">
              <ul className="list-disc pl-5 space-y-1">
                <li>শিক্ষা, দাওয়াহ, সেবা কার্যক্রম</li>
                <li>এতিম ও অসহায় সহায়তা</li>
                <li>দুর্যোগকালীন সহায়তা</li>
              </ul>
            </InfoCard>
          </div>

          {/* Right column - Donation form */}
          <div className="sticky top-20">
            <DonationWidget />
          </div>
        </div>
      </Container>
    </div>
  );
}


