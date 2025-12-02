// 'use client';

// import Link from 'next/link';
// import type { Route } from 'next';
// import { useI18n } from '../i18n/LanguageProvider';

// type Props = {
//   currentType: 'image' | 'video';
//   makeHref: (page: number, overrides?: { type?: string }) => Route;
// };

// export default function GalleryTypeTabs({ currentType, makeHref }: Props): JSX.Element {
//   const { t } = useI18n();

//   return (
//     <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
//       {['image', 'video'].map((typeKey) => (
//         <Link
//           key={typeKey}
//           href={makeHref(1, { type: typeKey })}
//           className={`px-6 py-3 rounded-full border font-semibold transition-all ${
//             currentType === typeKey
//               ? 'bg-brand text-white border-brand shadow-md'
//               : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
//           }`}
//         >
//           {t(typeKey as 'image' | 'video')}
//         </Link>
//       ))}
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { useI18n } from '../i18n/LanguageProvider';
import { Route } from 'next';

type Props = {
  currentType: 'image' | 'video';
  imageHref: string;
  videoHref: string;
};

export default function GalleryTypeTabs({ currentType, imageHref, videoHref }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
      <Link
        href={imageHref as Route}
        className={`px-6 py-3 rounded-full border font-semibold transition-all ${
          currentType === 'image'
            ? 'bg-brand text-white border-brand shadow-md'
            : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
        }`}
      >
        {t('image')}
      </Link>

      <Link
        href={videoHref as Route}
        className={`px-6 py-3 rounded-full border font-semibold transition-all ${
          currentType === 'video'
            ? 'bg-brand text-white border-brand shadow-md'
            : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
        }`}
      >
        {t('video')}
      </Link>
    </div>
  );
}

