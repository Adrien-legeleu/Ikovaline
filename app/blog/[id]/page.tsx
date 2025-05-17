import Buttons from "@/components/BlogPage/Buttons";

import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { blogMetadata } from "@/lib/blogMetadata";
import { notFound } from "next/navigation";
import { ComponentType } from "react";
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const componentsMap: Record<
  string,
  () => Promise<{ default: ComponentType<unknown> }>
> = {
  "comment-heberger-un-site-web": () => import("@/components/BlogPage/Blog1"),
  "arborescence-site-web": () => import("@/components/BlogPage/Blog2"),
  "comment-etre-reference-sur-google-gratuitement": () =>
    import("@/components/BlogPage/Blog3"),
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const meta = blogMetadata[id];
  if (!meta) {
    return {
      title: "Article de blog | Ikovaline",
      description:
        "Découvrez nos conseils digitaux pour améliorer votre présence en ligne.",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.ikovaline.com//blog/${id}`,
      images: [
        {
          url: `https://www.ikovaline.com${meta.ogImage}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`https://www.ikovaline.com${meta.ogImage}`],
    },
  };
}

export default async function Blog({ params }: ProductPageProps) {
  const { id } = await params;
  const loader = componentsMap[id];

  if (!loader) {
    notFound();
  }

  const mod = await loader();
  const Component = mod.default;

  return (
    <div className="lg:py-24 py-12 px-2 sm:px-10 ">
      <ScrollProgress />
      <Component />
      <Buttons />
    </div>
  );
}
