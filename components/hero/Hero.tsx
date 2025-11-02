import heroimage from '@/public/img/hero.png';
import DonationForm from '@/components/donation/DonationForm';
import Container from '@/components/layout/Container';

const hero = {
  title: 'দারুল কুরআন ফাউন্ডেশন',
  subtitle: 'একটি অরাজনৈতিক, অলাভজনক শিক্ষা, দাওয়াহ ও পূর্ণ মানবকল্যাণে নিবেদিত সেবামূলক বেসরকারি-নিবন্ধিত প্রতিষ্ঠান',
  regNo: 'এস-১৩১১১/২০১৯',
  ctaPrimary: 'আরও জানুন',
  ctaSecondary: 'কার্যক্রমসমূহ',
  backgroundImage: heroimage,
};

export default function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden">
      <div
        className="relative min-h-[550px] md:min-h-[650px] w-full bg-center bg-cover py-20"
        style={{ backgroundImage: `url(${heroimage.src})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        {/* left pattern approximation */}
        <div className="absolute inset-y-0 left-0 w-72 pointer-events-none">
          <svg viewBox="0 0 200 800" className="h-full w-auto opacity-30 fill-none stroke-white/30">
            <defs>
              <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40M20 0v40" />
              </pattern>
            </defs>
            <rect width="200" height="800" fill="url(#p)" />
          </svg>
        </div>

        <div className="relative z-10 h-full flex items-center py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Hero Content */}
              <div className="text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                  {hero.title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-2 leading-relaxed">
                  {hero.subtitle}। নিবন্ধন নম্বর: {hero.regNo}।
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="#about"
                    className="rounded-lg bg-brand hover:bg-brand-dark text-white px-6 py-3 font-semibold transition-all hover:shadow-lg"
                  >
                    {hero.ctaPrimary}
                  </a>
                  <a
                    href="#programs"
                    className="rounded-lg bg-white/10 hover:bg-white/20 text-white px-6 py-3 font-semibold border border-white/30 transition-all"
                  >
                    {hero.ctaSecondary}
                  </a>
                </div>
              </div>

              {/* Right Side - Donation Form */}
              <div className="lg:mt-0">
                <DonationForm />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}


