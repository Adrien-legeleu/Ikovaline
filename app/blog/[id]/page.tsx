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
};

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
