'use client';

import { useEffect, useState } from 'react';
import Container from '../../components/layout/Container';
import ImageCarousel from '../activity/ImageCarousel';
import { useI18n, Lang } from '../../components/i18n/LanguageProvider';
import { translateText } from '../../lib/translate';

export type ProgramDetailData = {
  id: string;
  image: string;
  formTitle?: string;
  formDescription?: string;
  slug: string;
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
  daily?: number[] | null;
  monthly?: number[] | null;
  amount?: number[] | null;
  locale?: "en" | "bn" | "ar";
};

type Props = {
  program: ProgramDetailData;
};

// Extract YouTube video ID from URL
function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function ProgramDetail({ program }: Props): JSX.Element {
  const { lang, t } = useI18n();
  const [translatedTitle, setTranslatedTitle] = useState(program.title);
  const [translatedSubtitle, setTranslatedSubtitle] = useState(program.subtitle || '');
  const [translatedDescription, setTranslatedDescription] = useState(program.description);
  const [translatedFullContent, setTranslatedFullContent] = useState(program.fullContent || '');
  const [translatedGoals, setTranslatedGoals] = useState(program.goals || []);
  const [translatedBeneficiaries, setTranslatedBeneficiaries] = useState(program.beneficiaries || '');
  const [translatedCategories, setTranslatedCategories] = useState(program.expenditureCategories || []);
  const [translatedProjectArea, setTranslatedProjectArea] = useState(program.projectArea || '');
  const [translatedDuration, setTranslatedDuration] = useState(program.duration || '');
  const [translatedCtaButtonText, setTranslatedCtaButtonText] = useState(program.ctaButtonText || '');
  const [isTranslating, setIsTranslating] = useState(false);

  const videoId = program.videoId || getYouTubeVideoId(program.videoUrl);
  const formattedDate = formatProgramDate(program.date, lang);

  // Translate dynamic content when language changes
  useEffect(() => {
    const translateContent = async () => {
      if (program.locale && program.locale === lang) {
        setTranslatedTitle(program.title);
        setTranslatedSubtitle(program.subtitle || '');
        setTranslatedDescription(program.description);
        setTranslatedFullContent(program.fullContent || '');
        setTranslatedGoals(program.goals || []);
        setTranslatedBeneficiaries(program.beneficiaries || '');
        setTranslatedCategories(program.expenditureCategories || []);
        setTranslatedProjectArea(program.projectArea || '');
        setTranslatedDuration(program.duration || '');
        setTranslatedCtaButtonText(program.ctaButtonText || '');
        return;
      }

      setIsTranslating(true);
      try {
        const [
          titleResult,
          subtitleResult,
          descriptionResult,
          fullContentResult,
          beneficiariesResult,
          projectAreaResult,
          durationResult,
          ctaButtonResult,
        ] = await Promise.all([
          translateText(program.title, lang, program.locale),
          program.subtitle ? translateText(program.subtitle, lang, program.locale) : Promise.resolve(''),
          translateText(program.description, lang, program.locale),
          program.fullContent ? translateText(program.fullContent, lang, program.locale) : Promise.resolve(''),
          program.beneficiaries ? translateText(program.beneficiaries, lang, program.locale) : Promise.resolve(''),
          program.projectArea ? translateText(program.projectArea, lang, program.locale) : Promise.resolve(''),
          program.duration ? translateText(program.duration, lang, program.locale) : Promise.resolve(''),
          program.ctaButtonText ? translateText(program.ctaButtonText, lang, program.locale) : Promise.resolve(''),
        ]);

        const [goalsResult, categoriesResult] = await Promise.all([
          program.goals && program.goals.length
            ? Promise.all(program.goals.map((goal) => translateText(goal, lang, program.locale)))
            : Promise.resolve(program.goals || []),
          program.expenditureCategories && program.expenditureCategories.length
            ? Promise.all(
                program.expenditureCategories.map((category) => translateText(category, lang, program.locale))
              )
            : Promise.resolve(program.expenditureCategories || []),
        ]);

        setTranslatedTitle(titleResult);
        setTranslatedSubtitle(program.subtitle ? subtitleResult : '');
        setTranslatedDescription(descriptionResult);
        setTranslatedFullContent(program.fullContent ? fullContentResult : '');
        setTranslatedGoals(goalsResult);
        setTranslatedBeneficiaries(program.beneficiaries ? beneficiariesResult : '');
        setTranslatedCategories(categoriesResult);
        setTranslatedProjectArea(program.projectArea ? projectAreaResult : '');
        setTranslatedDuration(program.duration ? durationResult : '');
        setTranslatedCtaButtonText(program.ctaButtonText ? ctaButtonResult : '');
      } catch (error) {
        console.error('Failed to translate program detail content:', error);
        setTranslatedTitle(program.title);
        setTranslatedSubtitle(program.subtitle || '');
        setTranslatedDescription(program.description);
        setTranslatedFullContent(program.fullContent || '');
        setTranslatedGoals(program.goals || []);
        setTranslatedBeneficiaries(program.beneficiaries || '');
        setTranslatedCategories(program.expenditureCategories || []);
        setTranslatedProjectArea(program.projectArea || '');
        setTranslatedDuration(program.duration || '');
        setTranslatedCtaButtonText(program.ctaButtonText || '');
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [
    lang,
    program.title,
    program.subtitle,
    program.description,
    program.fullContent,
    program.goals,
    program.beneficiaries,
    program.expenditureCategories,
    program.projectArea,
    program.duration,
    program.ctaButtonText,
    program.locale,
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${program.image}')`,
          }}
        >
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <Container className="relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Title and Subtitle */}
            <div className="space-y-6">
              {/* Tag */}
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-white text-sm font-medium">{program.slug}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight">
                {isTranslating ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="animate-pulse">{program.title}</span>
                    <span className="text-sm">...</span>
                  </span>
                ) : (
                  translatedTitle
                )}
              </h1>

              {/* Subtitle */}
              {program.subtitle && (
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                  {isTranslating ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="animate-pulse">{program.subtitle}</span>
                      <span className="text-xs text-white/70">...</span>
                    </span>
                  ) : (
                    translatedSubtitle
                  )}
                </p>
              )}

              <div className="text-white/80 text-sm font-medium">
                {formattedDate}
              </div>
            </div>

            {/* Right Side - Rounded Images */}
            {program.galleryImages && program.galleryImages.length > 0 && (
              <div className={`relative hidden lg:block w-[820px] h-[700px] ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
                {/* Large right-edge dashed arcs (matching sweep in reference) */}
                {lang === 'ar' ? (
                  <div className="absolute -bottom-[22%] -left-[25%] w-[800px] h-[800px] rounded-full border-4 border-dashed border-white/70 pointer-events-none"></div>
                ) : (
                  <div className="absolute -bottom-[22%] -right-[25%] w-[800px] h-[800px] rounded-full border-4 border-dashed border-white/70 pointer-events-none"></div>
                )}

                {/* Central large image circle */}
                {lang === 'ar' ? (
                  <div className="absolute right-[75%] -bottom-[65%] translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-4 border-white shadow-2xl w-[700px] h-[700px] z-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={program.galleryImages[0]}
                      alt="Gallery image 1"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                  </div>
                ) : (
                  <div className="absolute left-[75%] -bottom-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-4 border-white shadow-2xl w-[700px] h-[700px] z-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={program.galleryImages[0]}
                      alt="Gallery image 1"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                  </div>
                )}

                {/* Top small image circle (slightly left of main's right edge) */}
                {program.galleryImages[1] && (
                  <div className={`absolute ${lang === 'ar' ? 'left-[48%]' : 'right-[48%]'} top-[4%] rounded-full overflow-hidden border-4 border-white shadow-2xl w-[160px] h-[160px] z-30`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={program.galleryImages[1]}
                      alt="Gallery image 2 (top)"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                  </div>
                )}

                {program.galleryImages[2] && (
                  <div className={`absolute ${lang === 'ar' ? 'left-[65%]' : 'right-[65%]'} top-[25%] rounded-full overflow-hidden border-4 border-white shadow-2xl w-[220px] h-[220px] z-30`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={program.galleryImages[2]}
                      alt="Gallery image 2 (top)"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                  </div>
                )}

                {/* Bottom-right small image circle */}
                {program.galleryImages[3] && (
                  <div className={`absolute ${lang === 'ar' ? 'left-[68%]' : 'right-[68%]'} bottom-[17%] rounded-full overflow-hidden border-4 border-white shadow-2xl w-[130px] h-[130px] z-30`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={program.galleryImages[3]}
                      alt="Gallery image 3 (bottom-right)"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                  </div>
                )}

                {/* Subtle glow blobs */}
                {lang === 'ar' ? (
                  <>
                    <div className="absolute -top-12 -left-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-16 right-6 w-48 h-48 bg-brand/40 rounded-full blur-3xl"></div>
                  </>
                ) : (
                  <>
                    <div className="absolute -top-12 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-16 left-6 w-48 h-48 bg-brand/40 rounded-full blur-3xl"></div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Gallery */}
            {program.galleryImages && program.galleryImages.length > 0 && (
              <div className="lg:hidden grid grid-cols-3 gap-4 mt-8">
                {program.galleryImages.slice(0, 3).map((img, idx) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Video and Description */}
          <div className="lg:col-span-1 space-y-6">
            {/* Video Player */}
            {videoId && (
              <div className="rounded-2xl overflow-hidden bg-gray-200">
                <div className="aspect-video w-full relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={program.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Description Text */}
            <div className="text-gray-700 leading-8 text-base space-y-4">
              <p>
                {isTranslating ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="animate-pulse">{program.description}</span>
                    <span className="text-xs text-gray-400">...</span>
                  </span>
                ) : (
                  translatedDescription
                )}
              </p>
              {program.fullContent && (
                <div className="space-y-4">
                  {(isTranslating ? program.fullContent : translatedFullContent)
                    ?.split('\n\n')
                    .map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar Panels */}
          <div className="lg:col-span-1 space-y-6">
            {/* Panel 1: Project Goals-Objectives */}
            {program.goals && program.goals.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">প্রকল্পের লক্ষ্য-উদ্দেশ্য</h2>
                <ul className="space-y-3">
                  {(isTranslating ? program.goals || [] : translatedGoals).map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 leading-7">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Panel 2: Beneficiaries */}
            {program.beneficiaries && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4zm-8 0c1.657 0 3-1.79 3-4S9.657 3 8 3 5 4.79 5 7s1.343 4 3 4zm0 2c-2.761 0-8 1.382-8 4.125V20h16v-2.875C16 14.382 10.761 13 8 13zm8 0c-.507 0-1.074.035-1.68.1 1.568.862 2.68 2.075 2.68 3.9V20h7v-2.875C24 14.382 18.761 13 16 13z"/>
                    </svg>
                  </span>
                  <span>উপকারভোগী</span>
                </h2>
                <p className="text-gray-700 leading-7">
                  {isTranslating ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="animate-pulse">{program.beneficiaries}</span>
                      <span className="text-xs text-gray-400">...</span>
                    </span>
                  ) : (
                    translatedBeneficiaries
                  )}
                </p>
              </div>
            )}

            {/* Panel 3: Expenditure Categories */}
            {program.expenditureCategories && program.expenditureCategories.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">ব্যয়ের খাত</h2>
                <ul className="space-y-3">
                  {(isTranslating ? program.expenditureCategories || [] : translatedCategories).map((category, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 leading-7">{category}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Panel 4: Project Area */}
            {program.projectArea && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">প্রকল্পের এলাকা</h2>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 leading-7">
                    {isTranslating ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-pulse">{program.projectArea}</span>
                        <span className="text-xs text-gray-400">...</span>
                      </span>
                    ) : (
                      translatedProjectArea
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Panel 5: Duration */}
            {program.duration && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">মেয়াদ</h2>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" />
                      <path d="M18 9H2v7a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    </svg>
                  </span>
                  <span className="text-gray-700 leading-7">
                    {isTranslating ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-pulse">{program.duration}</span>
                        <span className="text-xs text-gray-400">...</span>
                      </span>
                    ) : (
                      translatedDuration
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

          {/* Call to Action Banner */}
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
                  {isTranslating ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="animate-pulse">{program.title}</span>
                      <span className="text-xs text-white/80">...</span>
                    </span>
                  ) : (
                    translatedTitle
                  )}
                </h2>
              </div>

              {/* Right Side - CTA Button */}
              <a
                href={program.ctaButtonLink || `/donate/${program.slug}`}
                className="bg-secondary hover:brightness-110 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 whitespace-nowrap inline-block"
              >
                {program.ctaButtonText
                  ? isTranslating
                    ? program.ctaButtonText
                    : translatedCtaButtonText
                  : t('donate')}
              </a>
            </div>
          </div>

          {/* Image Carousel - At the End */}
          {program.galleryImages && program.galleryImages.length > 0 && (
            <div className="mt-12 md:mt-16">
              <ImageCarousel images={program.galleryImages} title={isTranslating ? program.title : translatedTitle} />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

function formatProgramDate(dateString: string, locale: Lang): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const formatter =
    locale === 'bn'
      ? new Intl.DateTimeFormat('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
      : locale === 'ar'
      ? new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return formatter.format(date);
}


