import React from 'react';
import Container from '../../components/layout/Container';

type Props = {
  title: string;
  imageSrc?: string;
  overlayClassName?: string;
};

export default function PageHero({ title, imageSrc = '/img/hero.png', overlayClassName }: Props): React.ReactElement {
  return (
    <section className="relative overflow-hidden">
      <div
        className="h-48 sm:h-56 md:h-64 w-full bg-center bg-cover"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      >
        <div className={`h-full w-full ${overlayClassName ?? 'bg-black/50'}`}>
          <Container className="h-full flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-white text-center">{title}</h1>
          </Container>
        </div>
      </div>
    </section>
  );
}


