import Hero from '@/components/hero/Hero';
import MissionTriplet from '@/components/sections/MissionTriplet';
import ActivityCarousel from '@/components/sections/ActivityCarousel';
import DonationCarousel from '@/components/sections/DonationCarousel';
import JoinUs from '@/components/sections/JoinUs';
import Gallery from '@/components/sections/Gallery';
import BlogList from '@/components/sections/BlogList';

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-10">
      <Hero />
      <MissionTriplet />
      <ActivityCarousel />
      <DonationCarousel />
      <JoinUs />
      <Gallery />
      <BlogList />
    </div>
  );
}


