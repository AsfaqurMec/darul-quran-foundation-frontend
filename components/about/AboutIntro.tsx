import Container from '@/components/layout/Container';

export default function AboutIntro(): JSX.Element {
  return (
    <section className="py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
              alt="About collage"
              className="rounded-2xl shadow border border-gray-200"
            />
          </div>
          <div className="text-gray-800 leading-8">
            <p>
              দারুল কুরআন ফাউন্ডেশন শিক্ষা, দাওয়াহ ও পূর্ণ মানবকল্যাণে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সেবামূলক প্রতিষ্ঠান।
              নিবন্ধন নম্বর: এস-১৩১১১/২০১৯। ২০১৯ সালে শায়খ আহমাদুল্লাহ (হাফিযাহুল্লাহ) এই প্রতিষ্ঠানটি প্রতিষ্ঠা করেন।
            </p>
            <p className="mt-4">
              এই প্রতিষ্ঠান মানবতার শিক্ষা, মানুষের মুক্তি ও শান্তির দাওয়াহ, মানবকল্যাণের আদর্শ, সামাজিক সেবা, মসজিদ-সংস্কার, অনাথ সহায়তা
              এবং দারিদ্র্য মোকাবিলাসহ নানাবিধ কল্যাণমূলক কাজ পরিচালনা করছে।
            </p>
            <p className="mt-4">
              লক্ষ্য ও উদ্দেশ্য—সুন্নাহভিত্তিক জীবন ও সমাজ গঠন করা এবং বিভিন্ন ইসলামী প্রজেক্টের বিস্তারের মাধ্যমে মানবতার কল্যাণে কাজ করা।
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}


