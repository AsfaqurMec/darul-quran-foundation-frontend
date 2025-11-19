import Container from '@/components/layout/Container';
import ActivityCard, { type ActivityItem } from '@/components/activity/ActivityCard';
import Pagination from '@/components/ui/Pagination';
import PageHero from '@/components/common/PageHero';
import { getAllPrograms, type Program } from '@/services/programs';
import { getImageUrl } from '@/lib/imageUtils';

export default async function ProgramsPage({ searchParams }: { searchParams?: { page?: string } }): Promise<JSX.Element> {
  const perPage = 9;
  const current = Math.max(1, Number(searchParams?.page || '1'));

  const res = await getAllPrograms();
  console.log(res);
 // console.log(res);
  const list: Program[] = Array.isArray(res?.data) ? (res.data as Program[]) : [];
  const all: ActivityItem[] = list.map((p) => ({
    id: String(p.id ?? ''),
    title: String(p.title ?? ''),
    description: String(p.description ?? ''),
    tag: String(p.tag ?? ''),
    image: getImageUrl(p.thumbnail ?? p.image ?? ''),
    href: `/programs/${p.id}`,
  }));
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const start = (current - 1) * perPage;
  const items = all.slice(start, start + perPage);
  console.log(items);
  const makeHref = (p: number) => `/programs?page=${p}`;

  return (
    <div className="py-0">
      <PageHero title="প্রোগ্রাম আর্কাইভ" />
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


