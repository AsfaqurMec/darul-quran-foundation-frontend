import Container from '@/components/layout/Container';

type JoinItem = {
  href: string;
  title: string;
  icon?: JSX.Element;
  gradient: string; // tailwind gradient classes
};

const items: ReadonlyArray<JoinItem> = [
  {
    href: '#donate-regular',
    title: 'নিয়মিত দাতা',
    gradient: 'from-emerald-600 via-emerald-600 to-emerald-700',
  },
  {
    href: '#donor-member',
    title: 'আজীবন ও দাতা সদস্য',
    gradient: 'from-sky-500 via-sky-500 to-sky-600',
  },
  {
    href: '#volunteer',
    title: 'স্বেচ্ছাসেবক',
    gradient: 'from-amber-400 via-amber-400 to-amber-500',
  },

];

function JoinCard({ href, title, gradient }: JoinItem): JSX.Element {
  return (
    <a href={href} className="group block">
      <div className={`rounded-3xl p-1 border border-dashed border-emerald-700/40`}> 
        <div className={`rounded-2xl h-40 sm:h-44 w-full bg-gradient-to-br ${gradient} 
          text-white flex items-center justify-center text-2xl sm:text-3xl font-extrabold 
          shadow transition-transform group-hover:-translate-y-0.5`}>
          {title}
        </div>
      </div>
    </a>
  );
}

export default function JoinUs(): JSX.Element {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">আমাদের সাথে যুক্ত হোন</h2>
          <p className="text-emerald-800/80 mt-2">নিচের যে কোনো পদ্ধতিতে যুক্ত হয়ে আত্মমানবতার সেবায় ভূমিকা রাখুন</p>
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <JoinCard {...items[0]} />
          <JoinCard {...items[1]} />
          <JoinCard {...items[2]} />
        </div>
      </Container>
    </section>
  );
}


