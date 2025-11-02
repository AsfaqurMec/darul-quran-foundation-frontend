import Container from '@/components/layout/Container';
import BlogDetail from '@/components/blog/BlogDetail';
import { getBlogDetail } from '@/data/blogs';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;
  const blog = getBlogDetail(id);

  if (!blog) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <a href="/blog" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              ← Back to Blog
            </a>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
}

