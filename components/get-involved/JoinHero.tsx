import Container from '@/components/layout/Container';

export default function JoinHero(): JSX.Element {
  return (
    <section className="relative overflow-hidden">
      <div className="h-52 sm:h-64 bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1600&auto=format&fit=crop')" }}>
        <div className="h-full w-full bg-black/50">
          <Container className="h-full flex items-center justify-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">আমাদের সাথে যুক্ত হন</h1>
          </Container>
        </div>
      </div>
    </section>
  );
}


