import Container from '../../../components/layout/Container';
import { getDonationCategoryBySlug } from '../../../services/donationCategories';
import { getImageUrl } from '../../../lib/imageUtils';
import DonationDetail, { type DonationDetailData } from '../../../components/donation/DonationDetail';

export default async function DonationCategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  const { slug } = await params;

  const res = await getDonationCategoryBySlug(slug);
  const d: any = res?.data ?? null;

  if (!d) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Donation Category Not Found</h1>
            <p className="text-gray-600 mb-6">The donation category you're looking for doesn't exist.</p>
            <a href="/donation" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              ← Back to Donation Categories
            </a>
          </div>
        </Container>
      </div>
    );
  }

  // Map DonationCategory fields to DonationDetailData
  const program: DonationDetailData = {
    id: String(d.id ?? d._id ?? slug),
    slug: String(d.slug ?? ''),
    title: String(d.title ?? ''),
    subtitle: String(d.subtitle ?? ''),
    description: String(d.description ?? ''),
    image: getImageUrl(d.thumbnail ?? ''),
    videoUrl: String(d.video ?? ''),
    expenditureCategories: Array.isArray(d.expenseCategory) ? d.expenseCategory : undefined,
    formTitle: String(d.formTitle ?? ''),
    formDescription: String(d.formDescription ?? ''),
    daily: Array.isArray(d.daily) ? d.daily : undefined,
    monthly: Array.isArray(d.monthly) ? d.monthly : undefined,
    amount: Array.isArray(d.amount) ? d.amount : undefined,
  };

  return (
    <div>
      <DonationDetail data={program} />
    </div>
  );
}



