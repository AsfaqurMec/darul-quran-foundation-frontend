import Container from '@/components/layout/Container';
import Pagination from '@/components/ui/Pagination';
import Gallery from '@/components/sections/Gallery';
import Link from 'next/link';
import PageHero from '@/components/common/PageHero';
import { GetGallery } from '@/services/gallery';

export default async function GalleryPage({ searchParams }: { searchParams?: { page?: string; year?: string; category?: string; type?: string } }) {
  const current = Math.max(1, Number(searchParams?.page || '1'));
  const year = searchParams?.year ? Number(searchParams.year) : undefined;
  const category = searchParams?.category || 'সবগুলো';
  const type = searchParams?.type || 'image';
  const perPage = 12;

  const data = await GetGallery({
    page: current,
    limit: perPage,
    year,
    category: category === 'সবগুলো' ? undefined : category,
    type: type as 'image' | 'video',
  });
  const totalPages = Math.max(1, Math.ceil((data.total || 0) / perPage));
  const pageItems = data.items;

  const makeHref = (p: number) => {
    const qs = new URLSearchParams();
    qs.set('page', String(p));
    if (year) qs.set('year', String(year));
    if (category) qs.set('category', category);
    if (type) qs.set('type', type);
    return `/gallery?${qs.toString()}`;
  };

  return (
    <div className="py-0">
      <PageHero title="ছবিসমূহ" />
      <Container>
        <div className="py-12 md:py-16">
          {/* Type Tabs */}
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            {['image', 'video'].map((t) => (
              <Link
                key={t}
                href={makeHref(1).replace(`type=${type}`, `type=${t}`)}
                className={`px-6 py-3 rounded-full border font-semibold transition-all ${
                  type === t
                    ? 'bg-brand text-white border-brand shadow-md'
                    : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                }`}
              >
                {t === 'image' ? 'ছবি' : 'ভিডিও'}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
            {/* Left category filter */}
            <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 h-max sticky top-8">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">বিষয়শ্রেণী</h3>
              <div className="space-y-2">
                {data.categories.map((c) => {
                  const selected = (category || 'সবগুলো') === c;
                  const href = (() => {
                    const qs = new URLSearchParams();
                    qs.set('page', '1');
                    if (year) qs.set('year', String(year));
                    qs.set('category', c);
                    qs.set('type', type);
                    return `/gallery?${qs.toString()}`;
                  })();
                  return (
                    <Link
                      key={c}
                      href={href}
                      className={`block rounded-lg px-4 py-3 transition-all ${
                        selected
                          ? 'bg-white text-brand font-semibold shadow-sm border border-brand/20'
                          : 'hover:bg-white/60 text-gray-700'
                      }`}
                    >
                      {c}
                    </Link>
                  );
                })}
              </div>
            </aside>

            {/* Right content */}
            <div className="space-y-8">
              {/* Year tabs */}
              <div className="relative overflow-x-auto pb-2">
                <div className="flex items-center gap-3 min-w-max">
                  <Link
                    href={makeHref(1).replace(/year=\d+/, '').replace('??', '?')}
                    className={`px-5 py-2.5 rounded-full border font-medium transition-all whitespace-nowrap ${
                      !year
                        ? 'bg-brand text-white border-brand shadow-md'
                        : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                    }`}
                  >
                    সবগুলো
                  </Link>
                  {data.years.map((y) => {
                    const href = (() => {
                      const qs = new URLSearchParams();
                      qs.set('page', '1');
                      qs.set('year', String(y));
                      qs.set('category', category);
                      qs.set('type', type);
                      return `/gallery?${qs.toString()}`;
                    })();
                    const selected = year === y;
                    return (
                      <Link
                        key={y}
                        href={href}
                        className={`px-5 py-2.5 rounded-full border font-medium transition-all whitespace-nowrap ${
                          selected
                            ? 'bg-brand text-white border-brand shadow-md'
                            : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                        }`}
                      >
                        {y}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Grid */}
              <div className="mb-8">
                <Gallery items={pageItems.map((i) => ({ id: i.id, src: i.src, alt: i.alt }))} />
              </div>

              {/* Pagination */}
              <div className="mt-12 md:mt-16">
                <Pagination currentPage={current} totalPages={totalPages} makeHref={makeHref} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


