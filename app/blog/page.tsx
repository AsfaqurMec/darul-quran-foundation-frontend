import Container from '@/components/layout/Container';
import Pagination from '@/components/ui/Pagination';
import BlogCard from '@/components/blog/BlogCard';
import PageHero from '@/components/common/PageHero';
import { buildStaticBlogs } from '@/data/blogs';

export default async function BlogArchive({ searchParams }: { searchParams?: { page?: string } }): Promise<JSX.Element> {
  const perPage = 9;
  const current = Math.max(1, Number(searchParams?.page || '1'));
  const all = buildStaticBlogs();
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const start = (current - 1) * perPage;
  const items = all.slice(start, start + perPage);
  const makeHref = (p: number) => `/blog?page=${p}`;

  return (
    <div className="py-0">
      <PageHero title="ব্লগসমূহ" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8">
          <Pagination currentPage={current} totalPages={totalPages} makeHref={makeHref} />
        </div>
      </Container>
    </div>
  );
}


