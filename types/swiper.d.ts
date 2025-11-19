declare module 'swiper/react' {
  import * as React from 'react';
  export interface SwiperProps extends React.HTMLAttributes<HTMLDivElement> {
    modules?: any[];
    navigation?: boolean | Record<string, any>;
    autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean; pauseOnMouseEnter?: boolean };
    loop?: boolean;
    spaceBetween?: number;
    breakpoints?: Record<number, any>;
    slidesPerView?: number | 'auto';
    onSlideChange?: (...args: any[]) => void;
    onSwiper?: (...args: any[]) => void;
    className?: string;
  }
  export const Swiper: React.FC<SwiperProps>;
  export const SwiperSlide: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module 'swiper/modules' {
  export const Navigation: any;
  export const Autoplay: any;
}


