import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import BlogCard, { BlogPost } from '@/components/blog/BlogCard';
import { getLatestBlogs } from '@/data/blogs';

export default function BlogList({ posts }: { posts?: ReadonlyArray<BlogPost> }): JSX.Element {
  // Use provided posts or get latest 3 blogs from shared data
  const blogPosts = posts || getLatestBlogs(3);

  return (
    <section className="py-10">
      <Container>
        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">ব্লগসমূহ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/blog">
            <Button className="px-6">আরও দেখুন</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}


