import Container from '@/components/layout/Container';

type Props = {
  title: string;
  imageSrc?: string;
  overlayClassName?: string;
};

export default function PageHero({ title, imageSrc = '/img/hero.png', overlayClassName }: Props): JSX.Element {
  return (
    <section className="relative overflow-hidden">
      <div
        className="h-48 sm:h-56 md:h-64 w-full bg-center bg-cover"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      >
        <div className={`h-full w-full ${overlayClassName ?? 'bg-black/50'}`}>
          <Container className="h-full flex items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">{title}</h1>
          </Container>
        </div>
      </div>
    </section>
  );
}


