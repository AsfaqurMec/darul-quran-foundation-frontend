'use server';

import Container from '../../../components/layout/Container';
import BlogDetail from '../../../components/blog/BlogDetail';
import { GetAllBlog, SingleBlog } from '../../../services/blogs';
import { getImageUrl } from '../../../lib/imageUtils';
import type { BlogPost } from '../../../components/blog/BlogCard';

export default async function BlogDetailPage({ params }: { params: { id: string } }): Promise<React.ReactElement> {
  const { id } = params;
  const blogRes = await SingleBlog(id);
  const blog = blogRes?.data;

  if (!blog) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ব্লগ পাওয়া যায়নি</h1>
            <p className="text-gray-600 mb-6">আপনি যে ব্লগটি খুঁজছেন সেটি অনুপস্থিত বা মুছে ফেলা হয়েছে।</p>
            <a href="/blog" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              সব ব্লগে ফিরে যান
            </a>
          </div>
        </Container>
      </div>
    );
  }

  const othersRes = await GetAllBlog();
  const othersRaw = Array.isArray(othersRes?.data) ? othersRes!.data : [];
  const otherBlogs: BlogPost[] = othersRaw
    .filter((b: any) => String(b.id ?? b._id) !== String(id))
    .slice(0, 8)
    .map((b: any) => ({
      id: String(b.id ?? b._id ?? ''),
      title: String(b.title ?? ''),
      excerpt: String(b.excerpt ?? b.shortDescription ?? ''),
      date: String(b.createdAt ?? b.date ?? ''),
      image: getImageUrl(b.thumbnail ?? (Array.isArray(b.images) ? b.images[0] : '')),
      href: `/blog/${b.id ?? b._id}`,
    }));

  const mapped = {
    id: String(blog.id ?? blog._id ?? ''),
    title: String(blog.title ?? ''),
    excerpt: String(blog.excerpt ?? blog.shortDescription ?? ''),
    date: String(blog.createdAt ?? blog.date ?? ''),
    thumbnail: getImageUrl(blog.thumbnail ?? ''),
    images: Array.isArray(blog.images) ? blog.images.map((u: string) => getImageUrl(u)) : [],
    fullContent: String(blog.fullContent ?? blog.description ?? ''),
  };

  return (
    <div>
      <BlogDetail blog={mapped} otherBlogs={otherBlogs} />
    </div>
  );
}

