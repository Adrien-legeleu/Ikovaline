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
      url: `https://tonsite.fr/blog/${id}`,
      images: [
        { url: `https://tonsite.fr${meta.ogImage}`, width: 1200, height: 630 },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`https://tonsite.fr${meta.ogImage}`],
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
    <div className="lg:py-24 py-12 px-2 max-w-[1400px] mx-auto sm:px-10 ">
      <Component />
    </div>
  );
}
