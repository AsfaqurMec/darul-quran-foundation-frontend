import type { Metadata } from 'next';
import './globals.css';
import 'react-phone-input-2/lib/style.css';
import LanguageProvider from '../components/i18n/LanguageProvider';
import SiteFrame from '../components/layout/SiteFrame';
import { AppToaster } from '../components/ui/toaster';

export const metadata: Metadata = {
  title: 'DarulQuran Foundation',
  description: 'DarulQuran Foundation is a non-profit organization that provides education and training to children and adults in the Islamic faith.',
  keywords: ['DarulQuran Foundation', 'DarulQuran', 'Foundation', 'Islam', 'Education', 'Training', 'Children', 'Adults', 'Quran', 'Hadith', 'Islamic', 'Islamic Education', 'Islamic Training', 'Islamic Children', 'Islamic Adults', 'Islamic Quran', 'Islamic Hadith'],
  authors: [{ name: 'DarulQuran Foundation', url: 'https://darulquranfoundation.org' }],
  creator: 'DarulQuran Foundation',
  publisher: 'DarulQuran Foundation',
  openGraph: {
    title: 'DarulQuran Foundation',
    description: 'DarulQuran Foundation is a non-profit organization that provides education and training to children and adults in the Islamic faith.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans" suppressHydrationWarning>
        <LanguageProvider>
          <SiteFrame>{children}</SiteFrame>
        </LanguageProvider>
        <AppToaster />
      </body>
    </html>
  );
}


