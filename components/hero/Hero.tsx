// 'use client';

// import heroimage from '@/public/img/hero.png';
// import DonationForm from '@/components/donation/DonationForm';
// import Container from '@/components/layout/Container';
// import { useI18n } from '@/components/i18n/LanguageProvider';

// export default function Hero(): JSX.Element {
//   const { t } = useI18n();
//   return (
//     <section className="relative overflow-hidden">
//       <div
//         className="relative min-h-[550px] md:min-h-[650px] w-full bg-center bg-cover py-20"
//         style={{ backgroundImage: `url(${heroimage.src})` }}
//       >
//         <div className="absolute inset-0 bg-black/50" />
//         {/* left pattern approximation */}
//         <div className="absolute inset-y-0 left-0 w-72 pointer-events-none">
//           <svg viewBox="0 0 200 800" className="h-full w-auto opacity-30 fill-none stroke-white/30">
//             <defs>
//               <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
//                 <path d="M0 20h40M20 0v40" />
//               </pattern>
//             </defs>
//             <rect width="200" height="800" fill="url(#p)" />
//           </svg>
//         </div>

//         <div className="relative z-10 h-full flex items-center py-12 md:py-16">
//           <Container>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//               {/* Left Side - Hero Content */}
//               <div className="text-white">
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
//                   {t('heroTitle')}
//                 </h1>
//                 <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-2 leading-relaxed">
//                   {t('heroSubtitle')}. {t('regNoLabel')}: {t('regNo')}.
//                 </p>
//                 <div className="mt-6 flex flex-wrap items-center gap-4">
//                   <a
//                     href="#about"
//                     className="rounded-lg bg-brand hover:bg-brand-dark text-white px-6 py-3 font-semibold transition-all hover:shadow-lg"
//                   >
//                     {t('learnMore')}
//                   </a>
//                   <a
//                     href="#programs"
//                     className="rounded-lg bg-white/10 hover:bg-white/20 text-white px-6 py-3 font-semibold border border-white/30 transition-all"
//                   >
//                     {t('programs')}
//                   </a>
//                 </div>
//               </div>

//               {/* Right Side - Donation Form */}
//               <div className="lg:mt-0">
//                 <DonationForm />
//               </div>
//             </div>
//           </Container>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import * as React from 'react';
import DonationForm from '../../components/donation/DonationForm';
import Container from '../../components/layout/Container';
import { useI18n } from '../../components/i18n/LanguageProvider';
import { getAllActiveHeroImages, HeroImage } from '../../services/hero';
import { getImageUrl } from '../../lib/imageUtils';
import heroimage from '../../public/img/hero.png';

export default function Hero(): React.ReactElement {
  const { t } = useI18n();
  const [heroImages, setHeroImages] = React.useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    const loadHeroImages = async () => {
      try {
        const response = await getAllActiveHeroImages();
        if (response.success && response.data) {
          const images = Array.isArray(response.data) ? response.data : [response.data];
          // Filter only active images and sort by order
          const activeImages = images.filter(img => img.isActive !== false);
          const sortedImages = activeImages.sort((a, b) => (a.order || 0) - (b.order || 0));
          setHeroImages(sortedImages.length > 0 ? sortedImages : [{ image: heroimage.src }]);
        } else {
          // Fallback to default image
          setHeroImages([{ image: heroimage.src }]);
        }
      } catch (error) {
        console.error('Error loading hero images:', error);
        setHeroImages([{ image: heroimage.src }]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadHeroImages();
  }, []);

  // Preload images for smoother transitions
  React.useEffect(() => {
    if (heroImages.length === 0) return;

    heroImages.forEach((img) => {
      if (img.image) {
        const imageUrl = getImageUrl(img.image);
        const imageElement = new Image();
        imageElement.src = imageUrl;
        imageElement.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(imageUrl));
        };
      }
    });
  }, [heroImages]);

  // Auto-slide functionality
  React.useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Debug: Log images
  React.useEffect(() => {
    if (heroImages.length > 0) {
  //    console.log('Hero images loaded:', heroImages);
      heroImages.forEach((img, idx) => {
        const imageUrl = img.image ? getImageUrl(img.image) : heroimage.src;
    //    console.log(`Image ${idx}:`, { image: img.image, url: imageUrl, isActive: img.isActive });
      });
    }
  }, [heroImages]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden">
        <div className="relative min-h-[700px] md:min-h-[800px] lg:min-h-[900px] w-full bg-center bg-cover" />
      </section>
    );
  }

  return (
    <section className="relative">
      {/* Background Images Container with Fade Effect */}
      <div className="relative min-h-[550px] md:min-h-[650px] lg:min-h-[700px] w-full ">
        {heroImages.length > 0 ? (
          heroImages.map((img, index) => {
            let imageUrl = heroimage.src;
            if (img.image) {
              const url = getImageUrl(img.image);
              imageUrl = url || heroimage.src;
            }
            const isActive = index === currentIndex;
            
            return (
              <div
                key={img.id || `hero-img-${index}`}
                className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={{ 
                  backgroundImage: imageUrl ? `url("${imageUrl}")` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '100%'
                }}
                aria-hidden={!isActive}
              />
            );
          })
        ) : (
          // Fallback background
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-[1]"
            style={{ 
              backgroundImage: `url("${heroimage.src}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-[2]" />
        
        {/* Left pattern overlay */}
        {/* <div className="absolute inset-y-0 left-0 w-72 pointer-events-none opacity-60 z-[2]">
          <svg viewBox="0 0 200 800" className="h-full w-auto fill-none stroke-white/30">
            <defs>
              <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40M20 0v40" />
              </pattern>
            </defs>
            <rect width="200" height="800" fill="url(#hero-pattern)" />
          </svg>
        </div> */}

        {/* Slider Navigation Arrows */}
        {/* {heroImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[4] bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 transition-all"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[4] bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 transition-all"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </>
        )} */}

        {/* Slide Indicators */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[4] flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="relative z-[3]  flex items-center py-12 md:py-16  ">
          <Container>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"> */}
            <div className="relative h-full px-4 md:px-16 lg:px-32 py-12 md:py-32">
              {/* Left Side - Hero Content */}
              <div className="text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight drop-shadow-lg">
                  {heroImages[currentIndex]?.title || t('heroTitle')}
                </h1>
                <p className="text-md sm:text-lg lg:text-xl text-gray-100 mb-2 leading-relaxed drop-shadow-md w-[90%] lg:w-2/3  ">
                  {heroImages[currentIndex]?.description || `${t('heroSubtitle')} ${t('regNoLabel')}: ${t('regNo')}`}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="/about"
                    className="text-base md:text-xl rounded-lg bg-brand hover:bg-brand-dark text-white px-6 py-3 font-semibold transition-all hover:shadow-lg"
                  >
                    {t('learnMore')}
                  </a>
                  <a
                    href="/programs"
                    className="text-base md:text-xl rounded-lg bg-white/10 hover:bg-white/20 text-white px-6 py-3 font-semibold border border-white/30 transition-all"
                  >
                    {t('programs')}
                  </a>
                </div>
              </div>

              {/* Right Side - Donation Form */}
              
            </div>
          </Container>
        </div>
        <div className="absolute -bottom-[500px] md:-bottom-[500px] lg:-bottom-32 z-[5] w-full  px-4 flex justify-center">
          
            <DonationForm />
          
        </div>
      </div>
    </section>
  );
}
