import Container from '@/components/layout/Container';
import Pagination from '@/components/ui/Pagination';
import NoticeCard from '@/components/notice/NoticeCard';
import PageHero from '@/components/common/PageHero';
import { buildStaticNotices } from '@/data/notices';

export default async function NoticePage({ searchParams }: { searchParams?: { page?: string } }): Promise<JSX.Element> {
  const perPage = 10;
  const current = Math.max(1, Number(searchParams?.page || '1'));
  const all = buildStaticNotices();
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const start = (current - 1) * perPage;
  const items = all.slice(start, start + perPage);
  const makeHref = (p: number) => `/notice?page=${p}`;

  return (
    <div className="py-0">
      <PageHero title="নোটিশ বোর্ড" />
      <Container>
        <div className="py-12 md:py-16">
          <div className="space-y-6  mx-auto">
            {items.map((n) => (
              <NoticeCard key={n.id} notice={n} />
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


