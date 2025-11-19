import Hero from '@/components/hero/Hero';
import MissionTriplet from '@/components/sections/MissionTriplet';
import ActivityCarousel from '@/components/sections/ActivityCarousel';
import DonationCarousel from '@/components/sections/DonationCarousel';
import JoinUs from '@/components/sections/JoinUs';
import Gallery from '@/components/sections/Gallery';
import BlogList from '@/components/sections/BlogList';
import { GetAllBlog } from '@/services/blogs';
import { getImageUrl } from '@/lib/imageUtils';
import type { BlogPost } from '@/components/blog/BlogCard';
import { getAllActivities, type Activity } from '@/services/activities';
import type { ActivityItem } from '@/components/activity/ActivityCard';
import { getAllDonationCategories, type DonationCategory } from '@/services/donationCategories';

export default async function HomePage(): Promise<JSX.Element> {
  const listRes = await GetAllBlog();
  console.log(listRes);
  const items = Array.isArray(listRes?.data) ? listRes!.data : [];
  const posts: BlogPost[] = items.slice(0, 12).map((b: any) => ({
    id: String(b.id ?? b._id ?? ''),
    title: String(b.title ?? ''),
    excerpt: String(b.excerpt ?? b.shortDescription ?? ''),
    date: String(b.createdAt ?? b.date ?? ''),
    image: getImageUrl(b.thumbnail ?? (Array.isArray(b.images) ? b.images[0] : '')),
    href: `/blog/${b.id ?? b._id}`,
  }));
  console.log(posts);

  // Activities for ActivityCarousel
  const activitiesRes = await getAllActivities();
  const rawActivities: Activity[] = Array.isArray(activitiesRes?.data) ? (activitiesRes.data as Activity[]) : [];
  const activities: ActivityItem[] = rawActivities.slice(0, 12).map((a) => ({
    id: String(a.id ?? ''),
    title: String(a.title ?? ''),
    description: String(a.description ?? ''),
    tag: String(a.tag ?? ''),
    image: getImageUrl(a.image ?? a.thumbnail ?? ''),
    href: `/activities/${a.id}`,
  }));

  // Donation categories for DonationCarousel
  const donationRes = await getAllDonationCategories();
  const donationCategories: DonationCategory[] = Array.isArray(donationRes?.data) ? (donationRes.data as DonationCategory[]) : [];
  const funds = donationCategories.slice(0, 12).map((d) => ({
    id: String(d.id ?? d.slug ?? ''),
    image: getImageUrl(d.thumbnail ?? ''),
    title: String(d.title ?? ''),
    description: String(d.subtitle ?? d.description ?? ''),
  }));

  return (
    <div className="space-y-10 w-full">
      <Hero />
      <MissionTriplet />
      <ActivityCarousel items={activities} />
      <DonationCarousel funds={funds} />
      <JoinUs />
      <Gallery />
      <BlogList posts={posts} />
    </div>
  );
}


