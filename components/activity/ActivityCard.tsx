import Link from "next/link";

export type ActivityItem = {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  href?: string;
};

export default function ActivityCard({ item }: { item: ActivityItem }): JSX.Element {
  const href = item.href || `/activities/${item.id}`;
  
  return (
    <Link href={href} className="block rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group">
      <div className="aspect-[16/10] w-full bg-gray-200 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="text-emerald-700 text-sm mb-3 font-medium">✎ {item.tag}</div>
        <h3 className="text-xl md:text-2xl font-extrabold text-emerald-900 mb-3 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
        <p className="text-gray-700 leading-7 line-clamp-3 mb-4 flex-1">{item.description}</p>
        <div className="mt-auto">
          <span className="inline-flex items-center gap-1 text-emerald-700 group-hover:text-emerald-800 font-semibold transition-colors">
            <span>বিস্তারিত দেখুন</span>
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}


