import Container from '@/components/layout/Container';
import ActivityCard from '@/components/activity/ActivityCard';
import Pagination from '@/components/ui/Pagination';
import PageHero from '@/components/common/PageHero';
import { buildStaticActivities } from '@/data/activities';

export default async function ActivitiesPage({ searchParams }: { searchParams?: { page?: string } }): Promise<JSX.Element> {
  const perPage = 9;
  const current = Math.max(1, Number(searchParams?.page || '1'));
  const all = buildStaticActivities();
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const start = (current - 1) * perPage;
  const items = all.slice(start, start + perPage);

  const makeHref = (p: number) => `/activities?page=${p}`;

  return (
    <div className="py-0">
      <PageHero title="কার্যক্রম আর্কাইভ" />
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((it) => (
              <ActivityCard key={it.id} item={it} />
            ))}
          </div>

          <div className="mt-12 md:mt-16">
            <Pagination currentPage={current} totalPages={totalPages} makeHref={makeHref} />
          </div>
        </div>
      </Container>
    </div>
  );
}


