
import Container from '../../components/layout/Container';
import Pagination from '../../components/ui/Pagination';
import Gallery from '../../components/sections/Gallery';
import type { Route } from 'next';
import Link from 'next/link';
import TranslatablePageHero from '../../components/common/TranslatablePageHero';
//import { useI18n } from '../../components/i18n/LanguageProvider';
import { GetGallery } from '../../services/gallery';
import { getAllGalleryCategories } from '../../services/galleryCategory';
import config from '../../config';
import GalleryTypeTabs from '../../components/gallery/GalleryTypeTabs';
import GalleryCategorySidebar from '../../components/gallery/GalleryCategorySidebar';
// const categoryOptions = ['Flood', 'Food Distribution', 'Self Reliance', 'Qurbani', 'Winter Relief'] as const;
const ALL_CATEGORY = 'All';

// const getValidCategory = (value?: string | null): string => {
//   if (!value) return ALL_CATEGORY;
//   return categoryOptions.includes(value as (typeof categoryOptions)[number]) ? value : ALL_CATEGORY;
// };
const getValidCategory = (value: string | null | undefined, availableCategories: string[]): string => {
  if (!value) return ALL_CATEGORY;
  return availableCategories.includes(value) ? value : ALL_CATEGORY;
};

const deriveYearsFromItems = (items: { year?: number; createdAt?: string }[]) => {
  const yearSet = new Set<number>();
  items.forEach((item) => {
    const fromYearProp = item.year;
    if (fromYearProp) {
      yearSet.add(fromYearProp);
      return;
    }
    if (item.createdAt) {
      const parsedYear = Number(new Date(item.createdAt).getFullYear());
      if (!Number.isNaN(parsedYear)) yearSet.add(parsedYear);
    }
  });
  return Array.from(yearSet).sort((a, b) => b - a);
};

export default async function GalleryPage({ searchParams }: { searchParams?: Promise<{ page?: string; year?: string; category?: string; type?: string }> }) {
  const params = await searchParams;
  const current = Math.max(1, Number(params?.page || '1'));
  const selectedYear = params?.year ? Number(params.year) : undefined;
  const type = params?.type === 'video' ? 'video' : 'image';
  const perPage = 12;
  //const { t } = useI18n();
  // Fetch categories dynamically
   const categories = await getAllGalleryCategories();
  // const categories = await fetch(`${config.api.baseUrl}/gallery-category`, {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  //   // next: { tags: ['gallery'] } as any,
  // });
  // //console.log(categories);
  // if (!categories.ok) {
  //   throw new Error('Failed to fetch categories');
  // }
  // const categoriesData = await categories.json();
  //console.log(categoriesData);
  const categoryOptions = categories.data?.map((cat: any) => cat.title).filter((title: any): title is string => Boolean(title)) ?? [];
  const normalizedCategory = getValidCategory(params?.category, categoryOptions);

  const data = await GetGallery({
    page: current,
    limit: perPage,
    year: selectedYear,
    category: normalizedCategory === ALL_CATEGORY ? undefined : normalizedCategory,
    type,
  });
  const totalPages = Math.max(1, Math.ceil((data.total || 0) / perPage));
  const pageItems = data.items;
  const availableYears = deriveYearsFromItems(pageItems);

  const makeHref = (p: number, overrides?: { year?: number | null; category?: string; type?: string }): Route => {
    const qs = new URLSearchParams();
    qs.set('page', String(p));
    const yearValue = overrides?.year ?? selectedYear ?? null;
    const categoryValue = overrides?.category ?? normalizedCategory;
    const typeValue = overrides?.type ?? type;
    if (yearValue) {
      qs.set('year', String(yearValue));
    }
    if (categoryValue && categoryValue !== ALL_CATEGORY) {
      qs.set('category', categoryValue);
    }
    if (typeValue) {
      qs.set('type', typeValue);
    }
    return `/gallery?${qs.toString()}` as Route;
  };

  return (
    <div className="py-0">
     <TranslatablePageHero translationKey="galleryImages" />
      <Container>
        <div className="py-12 md:py-16">
          {/* Type Tabs */}
          <GalleryTypeTabs
  currentType={type}
  imageHref={makeHref(1, { type: "image" })}
  videoHref={makeHref(1, { type: "video" })}
/>
          {/* <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            {['image', 'video'].map((a) => (
              <Link
                key={a}
                href={makeHref(1, { type: a })}
                className={`px-6 py-3 rounded-full border font-semibold transition-all ${
                  type === a
                    ? 'bg-brand text-white border-brand shadow-md'
                    : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                }`}
                >
                  {a === 'image' ? 'Image' : 'Video'}
              </Link>
            ))}
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
            {/* Left category filter */}
            {/* <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 h-max sticky top-8">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {[ALL_CATEGORY, ...categoryOptions].map((c) => {
                  const selected = normalizedCategory === c;
                  return (
                    <Link
                      key={c}
                      href={makeHref(1, { category: c, year: selectedYear ?? null })}
                      className={`block rounded-lg px-4 py-3 transition-all ${
                        selected
                          ? 'bg-white text-brand font-semibold shadow-sm border border-brand/20'
                          : 'hover:bg-white/60 text-gray-700'
                      }`}
                    >
                      {c === ALL_CATEGORY ? 'All' : c}
                    </Link>
                  );
                })}
              </div>
            </aside> */}
            <GalleryCategorySidebar
                categoryOptions={categoryOptions}
                normalizedCategory={normalizedCategory}
                selectedYear={selectedYear}
                type={type}
                allCategory={ALL_CATEGORY}
              />

            {/* Right content */}
            <div className="space-y-8 bg-white z-20 py-10 md:py-0">
              {/* Year tabs */}
              <div className="relative overflow-x-auto pb-2">
                <div className="flex items-center gap-3 min-w-max">
                  <Link
                    href={makeHref(1, { year: null })}
                    className={`px-5 py-2.5 rounded-full border font-medium transition-all whitespace-nowrap ${
                      !selectedYear
                        ? 'bg-brand text-white border-brand shadow-md'
                        : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                    }`}
                  >
                    All Years
                  </Link>
                  {availableYears.map((y) => {
                    const selected = selectedYear === y;
                    return (
                      <Link
                        key={y}
                        href={makeHref(1, { year: y })}
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
                <Gallery items={pageItems.map((i) => ({ id: i.id, src: i.src, alt: i.alt, type: i.type }))} show={false} />
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


