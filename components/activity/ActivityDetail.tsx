import Container from '@/components/layout/Container';
import ImageCarousel from './ImageCarousel';

export type ActivityDetailData = {
  id: string;
  image: string;
  tag: string;
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  fullContent?: string;
  videoUrl?: string;
  videoId?: string;
  goals?: string[];
  beneficiaries?: string;
  expenditureCategories?: string[];
  projectArea?: string;
  duration?: string;
  ctaText?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  galleryImages?: string[];
};

type Props = {
  activity: ActivityDetailData;
};

// Extract YouTube video ID from URL
function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function ActivityDetail({ activity }: Props): JSX.Element {
  const videoId = activity.videoId || getYouTubeVideoId(activity.videoUrl);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${activity.image}')`,
          }}
        >
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/70"></div>
        </div>

        <Container className="relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Title and Subtitle */}
            <div className="space-y-6">
              {/* Tag */}
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-white text-sm font-medium">{activity.tag}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {activity.title}
              </h1>

              {/* Subtitle */}
              {activity.subtitle && (
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                  {activity.subtitle}
                </p>
              )}
            </div>

            {/* Right Side - Rounded Images */}
            {activity.galleryImages && activity.galleryImages.length > 0 && (
              <div className="relative hidden lg:block">
                <div className="relative flex items-center justify-center gap-4">
                  {activity.galleryImages.slice(0, 3).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-full overflow-hidden border-4 border-white shadow-2xl"
                      style={{
                        width: idx === 1 ? '200px' : '160px',
                        height: idx === 1 ? '200px' : '160px',
                        zIndex: activity.galleryImages!.length - idx,
                        transform: `translateY(${idx * 20}px)`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`Gallery image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                    </div>
                  ))}
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand/30 rounded-full blur-3xl"></div>
              </div>
            )}

            {/* Mobile Gallery */}
            {activity.galleryImages && activity.galleryImages.length > 0 && (
              <div className="lg:hidden grid grid-cols-3 gap-4 mt-8">
                {activity.galleryImages.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-2xl overflow-hidden aspect-square border-2 border-white/30 shadow-lg"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Gallery image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <div className="py-8">
        <Container>
          {/* Page Title */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900">কার্যক্রমের বিবরণ</h2>
          </div>

          {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {videoId && (
              <div className="rounded-2xl overflow-hidden bg-gray-200">
                <div className="aspect-video w-full relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={activity.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Description Text */}
            <div className="text-gray-700 leading-8 text-base space-y-4">
              <p>{activity.description}</p>
              {activity.fullContent && (
                <div className="space-y-4">
                  {activity.fullContent.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar Panels */}
          <div className="lg:col-span-1 space-y-6">
            {/* Panel 1: Project Goals-Objectives */}
            {activity.goals && activity.goals.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">প্রকল্পের লক্ষ্য-উদ্দেশ্য</h2>
                <ul className="space-y-3">
                  {activity.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-700 mt-1">✓</span>
                      <span className="text-gray-700 leading-7">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Panel 2: Beneficiaries */}
            {activity.beneficiaries && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <span>👥</span>
                  <span>উপকারভোগী</span>
                </h2>
                <p className="text-gray-700 leading-7">{activity.beneficiaries}</p>
              </div>
            )}

            {/* Panel 3: Expenditure Categories */}
            {activity.expenditureCategories && activity.expenditureCategories.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">ব্যয়ের খাত</h2>
                <ul className="space-y-3">
                  {activity.expenditureCategories.map((category, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-700 mt-1">✓</span>
                      <span className="text-gray-700 leading-7">{category}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Panel 4: Project Area */}
            {activity.projectArea && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">প্রকল্পের এলাকা</h2>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-700 mt-1">📍</span>
                  <span className="text-gray-700 leading-7">{activity.projectArea}</span>
                </div>
              </div>
            )}

            {/* Panel 5: Duration */}
            {activity.duration && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">মেয়াদ</h2>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-700 mt-1">📅</span>
                  <span className="text-gray-700 leading-7">{activity.duration}</span>
                </div>
              </div>
            )}
          </div>
        </div>

          {/* Call to Action Banner */}
          {(activity.ctaText || activity.ctaButtonText) && (
            <div className="mt-12 rounded-2xl overflow-hidden bg-brand relative">
              {/* Subtle overlay pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
              </div>
              
              <div className="relative px-6 py-8 md:px-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                {/* Left Side - CTA Text */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {activity.ctaText || 'হাত বাড়ান দুর্গতর প্রতি'}
                  </h2>
                </div>

                {/* Right Side - CTA Button */}
                {activity.ctaButtonText && (
                  <a
                    href={activity.ctaButtonLink || '/get-involved'}
                    className="bg-secondary hover:brightness-110 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 whitespace-nowrap inline-block"
                  >
                    {activity.ctaButtonText}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Image Carousel - At the End */}
          {activity.galleryImages && activity.galleryImages.length > 0 && (
            <div className="mt-12 md:mt-16">
              <ImageCarousel images={activity.galleryImages} title={activity.title} />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

