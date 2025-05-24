"use client";

import React from "react";
import { Carousel, Blog } from "@/components/ui/apple-cards-carousel";
import { dataBlog } from "@/components/BlogPage/Blog";

export default function BlogLanding() {
  const blogs = dataBlog.map((blog) => (
    <Blog key={blog.date + blog.slug} blog={blog} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={blogs} />
    </div>
  );
}
