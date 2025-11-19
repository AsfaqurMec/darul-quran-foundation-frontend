// 'use client';

// import * as React from 'react';
// import Link from 'next/link';
// import Container from '@/components/layout/Container';
// import Button from '@/components/ui/button';
// import BlogCard, { BlogPost } from '@/components/blog/BlogCard';
// import { getLatestBlogs } from '@/data/blogs';
// import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/Carousel';

// export default function BlogList({ posts }: { posts?: ReadonlyArray<BlogPost> }): JSX.Element {
//   // Use provided posts or get latest 3 blogs from shared data
//   const blogPosts = posts || getLatestBlogs(12);

//   return (
//     <section className="py-10">
//       <Container>
//         <div className="text-center mb-6">
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">ব্লগসমূহ</h2>
//         </div>
//         <Carousel
//           opts={{
//             align: 'start',
//             loop: true,
//           }}
//           autoplay={{ delay: 5000, stopOnInteraction: false }}
//           className="w-full overflow-hidden"
//         >
//           <CarouselContent className="flex gap-4">
//             {blogPosts.map((post) => (
//               <CarouselItem key={post.id} className="basis-full sm:basis-1/2 lg:basis-1/3 flex-shrink-0">
                
//                      <BlogCard post={post} />
                 
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="-left-4" />
//           <CarouselNext className="-right-4" />
//         </Carousel>
//         <div className="mt-8 flex justify-center">
//           <Link href="/blog">
//             <Button className="px-6">আরও দেখুন</Button>
//           </Link>
//         </div>
//       </Container>
//     </section>
//   );
// }

'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/button';
import BlogCard, { BlogPost } from '@/components/blog/BlogCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useI18n } from '../i18n/LanguageProvider';

export default function BlogList({ posts = [] as ReadonlyArray<BlogPost> }): JSX.Element {
  const prevRef = React.useRef<HTMLButtonElement | null>(null);
  const nextRef = React.useRef<HTMLButtonElement | null>(null);
  const { t } = useI18n();
  return (
    <section className="py-10 w-[350px] md:w-[800px] lg:w-[1400px]  mx-auto">
      <Container className="w-full px-0">

        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">{t('blog')}</h2>
        </div>
        <div className="relative overflow-hidden w-full ">
          {/* Custom navigation buttons */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white  shadow-sm ring-1 ring-gray-200 hover:bg-emerald-50 text-emerald-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M14.53 5.47a.75.75 0 0 1 0 1.06L9.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            ref={nextRef}
            aria-label="Next"
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white  shadow-sm ring-1 ring-gray-200 hover:bg-emerald-50 text-emerald-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M9.47 18.53a.75.75 0 0 1 0-1.06L14.94 12 9.47 6.53a.75.75 0 0 1 1.06-1.06l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            loop={true}
            onSwiper={(swiper: SwiperType) => {
              swiper.params.navigation = {
                ...(swiper.params.navigation as object),
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              };
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10 "
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/blog">
          <Button className="px-6">{t('readMore')}</Button>
          </Link>
        </div>

      </Container>
    </section>
  );
}

