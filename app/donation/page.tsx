import React from 'react';
import Container from '../../components/layout/Container';
import DonationCard, { type DonationItem } from '../../components/donation/DonationCard';
import Pagination from '../../components/ui/Pagination';
import TranslatablePageHero from '../../components/common/TranslatablePageHero';
import { getAllDonationCategoriesPublic, type DonationCategory } from '../../services/donationCategories';
import { getImageUrl } from '../../lib/imageUtils';

export default async function DonationCategoriesPage({ searchParams }: { searchParams?: Promise<{ page?: string }> }): Promise<React.ReactElement> {
  const perPage = 9;
  const params = await searchParams;
  const current = Math.max(1, Number(params?.page || '1'));

  const res = await getAllDonationCategoriesPublic();
  const list: DonationCategory[] = Array.isArray(res?.data) ? (res.data as DonationCategory[]) : [];
  const all: DonationItem[] = list.map((d) => ({
    id: String(d.id ?? d.slug ?? ''),
    title: String(d.title ?? ''),
    description: String(d.subtitle ?? d.description ?? ''),
    tag: String(d.slug ?? ''),
    image: getImageUrl(d.thumbnail ?? ''),
    href: `/donation/${d.slug ?? ''}`,
  }));
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const start = (current - 1) * perPage;
  const items = all.slice(start, start + perPage);

  const makeHref = (p: number) => `/donation?page=${p}`;

  return (
    <div className="py-0">
      <TranslatablePageHero translationKey="donationCategory" />
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((it) => (
              <DonationCard key={it.id} item={it} />
            ))}
          </div>

          <div className="mt-12 md:mt-16">
            <Pagination currentPage={current} totalPages={totalPages} makeHref={makeHref} />
          </div>
        </div>
      </Container>
    </div>
  );
}



