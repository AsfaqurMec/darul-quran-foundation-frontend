import type { Metadata } from 'next';
import './globals.css';
import LanguageProvider from '@/components/i18n/LanguageProvider';
import SiteFrame from '@/components/layout/SiteFrame';

export const metadata: Metadata = {
  title: 'DarulQuran Dashboard',
  description: 'Next.js app with auth, dashboard, and Tailwind CSS',
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
      </body>
    </html>
  );
}


