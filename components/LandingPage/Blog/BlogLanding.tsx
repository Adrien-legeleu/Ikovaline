'use client';

import React from 'react';
import { Carousel, Blog } from '@/components/ui/apple-cards-carousel';
import { getBlogData } from '@/components/BlogPage/Blog';
import { usePathname } from 'next/navigation';

export default function BlogLanding() {
  const isEN = /^\/en(\/|$)/.test(usePathname() || '/');
  const blogs = getBlogData(isEN).map((blog) => (
    <Blog key={blog.date + blog.slug} blog={blog} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={blogs} />
    </div>
  );
}
