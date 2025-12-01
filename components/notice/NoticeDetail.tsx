import Container from '../../components/layout/Container';

export type NoticeDetailData = {
  id: string;
  title: string;
  date: string;
  tag?: string;
  excerpt?: string;
  href?: string;
  category?: string;
  fullContent?: string;
  relatedNotices?: string[];
};

type Props = {
  notice: NoticeDetailData;
};

function formatDateParts(iso: string) {
  const d = new Date(iso);
  const day = d.getDate();
  const weekday = d.toLocaleDateString('bn-BD', { weekday: 'long' });
  const month = d.toLocaleDateString('bn-BD', { month: 'long' });
  const year = d.toLocaleDateString('bn-BD', { year: 'numeric' });
  return { day, weekday, month, year };
}

export default function NoticeDetail({ notice }: Props): JSX.Element {
  const { day, weekday, month, year } = formatDateParts(notice.date);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-dark to-brand py-12 md:py-16">
        <Container>
          <div className="mx-auto">
            {/* Date Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <div className="text-center flex items-center gap-2">
                  <div className="text-xs text-white/80">{weekday}</div>
                  <div className="text-lg font-extrabold text-white">{day}</div>
                  <div className="text-xs text-white/80">{month} {year}</div>
                </div>
              </div>
              {notice.tag && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white text-sm font-medium">
                  {notice.tag}
                </span>
              )}
              {/* {notice.category && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white text-sm font-medium">
                  {notice.category}
                </span>
              )} */}
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
              {notice.title}
            </h1>

            {/* Excerpt */}
            {notice.excerpt && (
              <p className="text-md md:text-lg text-white/90 leading-relaxed">
                {notice.excerpt}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <div className="py-12 md:py-16">
        <Container>
          <div className=" mx-auto">
            {/* Full Content */}
            {notice.fullContent && (
              <article className="prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm">
                  <div className="text-gray-700 leading-8 space-y-6 text-base md:text-lg">
                    {notice.fullContent.split('\n\n').map((para, idx) => {
                      // Check if paragraph starts with bullet points
                      if (para.trim().startsWith('•')) {
                        const items = para.split('\n').filter((line) => line.trim().startsWith('•'));
                        return (
                          <ul key={idx} className="space-y-3 list-none pl-0">
                            {items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3">
                                <span className="text-brand mt-2 font-bold">•</span>
                                <span>{item.replace('•', '').trim()}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      // Regular paragraph
                      return (
                        <p key={idx} className="mb-6 leading-relaxed">
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </article>
            )}

            {/* Back Button */}
            <div className="mt-10 flex items-center">
              <a
                href="/notice"
                className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold transition-colors"
              >
                <span>←</span>
                <span>নোটিশ বোর্ডে ফিরে যান</span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

