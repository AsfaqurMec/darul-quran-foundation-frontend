import Container from '../../../components/layout/Container';
import ProgramDetail, { ProgramDetailData } from '../../../components/program/ProgramDetail';
import { getProgramById } from '../../../services/programs';
import { getImageUrl } from '../../../lib/imageUtils';

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
  const { id } = await params;

  const res = await getProgramById(id);
  const p: any = res?.data ?? null;
 // console.log(p);

  if (!p) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-6">The program you're looking for doesn't exist.</p>
            <a href="/programs" className="text-emerald-700 hover:text-emerald-800 font-semibold">
              ← Back to Programs
            </a>
          </div>
        </Container>
      </div>
    );
  }

  // Map API fields to ProgramDetailData
  const program: ProgramDetailData = {
    id: String(p.id ?? p._id ?? id),
    slug: String(p.slug ?? ''),
    title: String(p.title ?? ''),
    subtitle: String(p.subtitle ?? p.shortDescription ?? p.description ?? ''),
    date: String(p.createdAt ?? p.date ?? ''),
    description: String(p.description ?? ''),
    // Thumbnail should be background image
    image: getImageUrl(
      p.thumbnail ?? p.image ?? (Array.isArray(p.media) && p.media.length ? p.media[0] : '')
    ),
    // Use media image(s) on the right
    galleryImages: (
      Array.isArray(p.media)
        ? p.media.map((m: string) => getImageUrl(m))
        : [getImageUrl(p.image ?? p.thumbnail ?? '')]
    ).filter(Boolean),
    videoUrl: String(p.video ?? p.videoUrl ?? ''),
    goals: Array.isArray(p.projectGoalsAndObjectives) ? p.projectGoalsAndObjectives : undefined,
    beneficiaries: Array.isArray(p.beneficiary) ? p.beneficiary.join(', ') : undefined,
    expenditureCategories: Array.isArray(p.expenseCategory) ? p.expenseCategory : undefined,
    projectArea: p.area ?? undefined,
    duration: p.duration ?? undefined,
    ctaText: String(p.ctaText ?? ''),
    ctaButtonText: String(p.ctaButtonText ?? ''),
    ctaButtonLink: String(p.ctaButtonLink ?? ''),
  };

  return (
    <div>
      <ProgramDetail program={program} />
    </div>
  );
}


