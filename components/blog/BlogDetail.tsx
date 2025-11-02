import Container from '@/components/layout/Container';
import BlogCard from './BlogCard';
import { getBlogDetail } from '@/data/blogs';

export type BlogDetailData = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href?: string;
  author?: string;
  authorImage?: string;
  category?: string;
  readTime?: string;
  fullContent?: string;
  tags?: string[];
  relatedPosts?: string[];
};

type Props = {
  blog: BlogDetailData;
};

export default function BlogDetail({ blog }: Props): JSX.Element {
  const relatedBlogs = blog.relatedPosts
    ?.map((id) => getBlogDetail(id))
    .filter((b) => b !== null) as BlogDetailData[] || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${blog.image}')`,
          }}
        >
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark/70"></div>
        </div>

        <Container className="relative z-10 pb-12 md:pb-20 pt-12">
          <div className="max-w-4xl">
            {/* Category Badge */}
            {blog.category && (
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
                <span className="text-white text-sm font-medium">{blog.category}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90">
              {blog.author && (
                <div className="flex items-center gap-3">
                  {blog.authorImage && (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={blog.authorImage} alt={blog.author} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="font-medium">{blog.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{blog.date}</span>
              </div>
              {blog.readTime && (
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{blog.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <div className="py-8 md:py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <article className="prose prose-lg max-w-none">
              {/* Excerpt */}
              <div className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-brand pl-6">
                {blog.excerpt}
              </div>

              {/* Full Content */}
              {blog.fullContent && (
                <div className="text-gray-700 leading-8 space-y-6 text-base md:text-lg">
                  {blog.fullContent.split('\n\n').map((para, idx) => (
                    <p key={idx} className="mb-6">{para}</p>
                  ))}
                </div>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-gray-600 font-semibold">ট্যাগ:</span>
                    {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-semibold">শেয়ার করুন:</span>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors flex items-center justify-center">
                      <span className="text-lg">f</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors flex items-center justify-center">
                      <span className="text-lg">t</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors flex items-center justify-center">
                      <span className="text-lg">in</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <Container>
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-2">সম্পর্কিত ব্লগ</h2>
              <p className="text-gray-600">আরও পড়ুন</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} post={relatedBlog} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}

