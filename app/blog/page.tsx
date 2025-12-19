'use server';

import Container from '../../components/layout/Container';
import Pagination from '../../components/ui/Pagination';
import BlogCard, { BlogPost } from '../../components/blog/BlogCard';
import TranslatablePageHero from '../../components/common/TranslatablePageHero';
import { GetAllBlog } from '../../services/blogs';
import { getImageUrl } from '../../lib/imageUtils';

export default async function BlogArchive({ searchParams }: { searchParams: Promise<{ page?: string }> }): Promise<React.JSX.Element> {
  const perPage = 12;
  const params = await searchParams;
  const current = Math.max(1, Number(params?.page || '1'));

  const res = await GetAllBlog();
  const list = Array.isArray(res?.data) ? res!.data : [];
  const all: BlogPost[] = list.map((b: any) => ({
    id: String(b.id ?? b._id ?? ''),
    title: String(b.title ?? ''),
    excerpt: String(b.excerpt ?? b.shortDescription ?? ''),
    date: String(b.createdAt ?? b.date ?? ''),
    image: getImageUrl(b.thumbnail ?? (Array.isArray(b.images) ? b.images[0] : '')),
    href: `/blog/${b.id ?? b._id}`,
  }));

  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const start = (current - 1) * perPage;
  const items = all.slice(start, start + perPage);
  const makeHref = (p: number) => `/blog?page=${p}`;

  return (
    <div className="py-0">
      <TranslatablePageHero translationKey="blogArchive" />
      <Container className="py-20">
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


