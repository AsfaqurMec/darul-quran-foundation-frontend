import Link from "next/link";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href?: string;
};

export default function BlogCard({ post }: { post: BlogPost }): JSX.Element {
  const href = post.href || `/blog/${post.id}`;
  
  return (
    <Link href={href} className="block rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="aspect-[16/10] w-full bg-gray-200 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-extrabold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">{post.title}</h3>
        <p className="text-gray-700 leading-7 line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 text-sm text-gray-500">{post.date}</div>
      </div>
    </Link>
  );
}


