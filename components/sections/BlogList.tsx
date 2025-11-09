'use client';

import * as React from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import BlogCard, { BlogPost } from '@/components/blog/BlogCard';
import { getLatestBlogs } from '@/data/blogs';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/Carousel';

export default function BlogList({ posts }: { posts?: ReadonlyArray<BlogPost> }): JSX.Element {
  // Use provided posts or get latest 3 blogs from shared data
  const blogPosts = posts || getLatestBlogs(12);

  return (
    <section className="py-10">
      <Container>
        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900">ব্লগসমূহ</h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          autoplay={{ delay: 5000, stopOnInteraction: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {blogPosts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <BlogCard post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
        <div className="mt-8 flex justify-center">
          <Link href="/blog">
            <Button className="px-6">আরও দেখুন</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}


