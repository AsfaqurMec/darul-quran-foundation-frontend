import Container from '@/components/layout/Container';

function SocialLink({ href, label, icon }: { href: string; label: string; icon: JSX.Element }): JSX.Element {
  return (
    <a href={href} aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
      {icon}
    </a>
  );
}

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="relative text-gray-100">
      <div className="absolute inset-0 bg-emerald-950" />
      {/* mosque skyline pattern */}
      <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full fill-current text-emerald-900">
          <path d="M0 350h80c20 0 20-40 40-40s20 40 40 40h80c20 0 20-60 40-60s20 60 40 60h80c20 0 20-80 40-80s20 80 40 80h80c20 0 20-50 40-50s20 50 40 50h80c20 0 20-70 40-70s20 70 40 70h80c20 0 20-60 40-60s20 60 40 60h80c20 0 20-40 40-40s20 40 40 40h80v50H0v-50Z" />
        </svg>
      </div>
      <Container className="relative py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-emerald-500" />
              <div className="text-xl font-semibold">DarulQuran</div>
            </div>
            <p className="text-sm text-emerald-100/90 leading-7">
              এই প্রতিষ্ঠান মানবতার শিক্ষা, মানুষের মুক্তি ও শান্তির লক্ষ্য সাধনে নিবেদিত।
              মানবকল্যাণে আদর্শ প্রচার ও সেবামূলক কার্যক্রম চালিয়ে যাচ্ছে।
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href="#" label="Facebook" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M13 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h2v7h3v-7h2.5l.5-3H13V9Z"/></svg>} />
              <SocialLink href="#" label="YouTube" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M21.8 8.001a3 3 0 0 0-2.11-2.124C18.37 5.5 12 5.5 12 5.5s-6.37 0-7.69.377A3 3 0 0 0 2.2 8.001C1.833 9.336 1.833 12 1.833 12s0 2.664.366 3.999a3 3 0 0 0 2.111 2.124C5.63 18.5 12 18.5 12 18.5s6.37 0 7.69-.377a3 3 0 0 0 2.11-2.124C22.167 14.664 22.167 12 22.167 12s0-2.664-.366-3.999ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>} />
              <SocialLink href="#" label="LinkedIn" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M6.94 6.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM3.5 8.25h6.88V20.5H3.5V8.25Zm8.62 0h6.62v2.39h.09c.92-1.65 3.17-3.39 6.54-3.39v6.93c-3.58 0-6.17 1.18-6.17 4.75v1.57H12.12V8.25Z"/></svg>} />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">মেনু</h4>
            <ul className="space-y-2 text-emerald-100/90">
              <li><a href="#about" className="hover:underline">আমাদের সম্পর্কে</a></li>
              <li><a href="#programs" className="hover:underline">কার্যক্রমসমূহ</a></li>
              <li><a href="#blog" className="hover:underline">ব্লগ</a></li>
              <li><a href="#gallery" className="hover:underline">গ্যালারি</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">যুক্ত হোন</h4>
            <ul className="space-y-2 text-emerald-100/90">
              <li><a href="#donate-regular" className="hover:underline">নিয়মিত দাতা</a></li>
              <li><a href="#donor-member" className="hover:underline">আজীবন ও দাতা সদস্য</a></li>
              <li><a href="#volunteer" className="hover:underline">স্বেচ্ছাসেবক</a></li>
              <li><a href="#career" className="hover:underline">ক্যারিয়ার</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">অন্যান্য</h4>
            <ul className="space-y-2 text-emerald-100/90">
              <li><a href="#contact" className="hover:underline">যোগাযোগ</a></li>
              <li><a href="#terms" className="hover:underline">পরিবেশ ও শর্তাবলী</a></li>
              <li><a href="#privacy" className="hover:underline">গোপনীয়তা নীতি</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-emerald-800/60 pt-4 text-center text-sm text-emerald-200">
          স্বত্ব © {year} দারুল কুরআন ফাউন্ডেশন - সর্বস্বত্ব সংরক্ষিত।
        </div>
      </Container>
    </footer>
  );
}


