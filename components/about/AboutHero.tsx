import Container from '../../components/layout/Container';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="h-60 sm:h-72 md:h-80 w-full bg-center bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="h-full w-full bg-black/50">
          <Container className="h-full flex items-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">আমাদের সম্পর্কে</h1>
          </Container>
        </div>
      </div>
    </section>
  );
}


