import Link from "next/link";

export type Notice = {
  id: string;
  title: string;
  date: string; // ISO date
  tag?: string;
  excerpt?: string;
  href?: string;
};

function formatDateParts(iso: string) {
  const d = new Date(iso);
  const day = d.getDate();
  const weekday = d.toLocaleDateString('bn-BD', { weekday: 'short' });
  const monthYear = d.toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' });
  return { day, weekday, monthYear };
}

export default function NoticeCard({ notice }: { notice: Notice }): JSX.Element {
  const { day, weekday, monthYear } = formatDateParts(notice.date);
  const href = notice.href || `/notice/${notice.id}`;
  
  return (
    <Link href={href} className="block rounded-2xl border border-emerald-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group hover:border-brand">
      <div className="text-center min-w-[80px] flex-shrink-0 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
        <div className="text-xs font-medium text-gray-600 mb-1">{weekday}</div>
        <div className="text-4xl font-extrabold text-brand">{day}</div>
        <div className="text-xs text-gray-600 mt-1">{monthYear}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {notice.tag && (
            <span className="inline-block rounded-full bg-brand/10 text-brand px-3 py-1 text-sm font-medium border border-brand/20">
              {notice.tag}
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-emerald-900 mb-3 group-hover:text-brand transition-colors leading-tight">
          {notice.title}
        </h3>
        {notice.excerpt && (
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">{notice.excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-2 text-brand text-sm font-medium group-hover:text-brand-dark transition-colors">
          <span>বিস্তারিত দেখুন</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}


