import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface BlogType {
  date: string;
  title: string;
  desc: string;
  img: string;
  by: string;
  slug: string;
}

const currentYear = new Date().getFullYear();

const dataBlog: BlogType[] = [
  {
    date: "2025-04-05",
    title: `Comment héberger un site web en ${currentYear} : guide complet`,
    desc: "Vous avez un site mais ne savez pas comment le mettre en ligne ? Ce guide vous explique comment héberger un site web étape par étape, avec les meilleures solutions en 2025.",
    img: "/blog/blog1/comment-heberger-un-site.jpg",
    by: "Ikovaline",
    slug: "comment-heberger-un-site-web",
  },
  {
    date: "2025-05-12",
    title:
      "Arborescence site web : guide complet pour structurer votre site efficacement",
    desc: "Comprenez comment organiser votre site pour un meilleur SEO et une navigation optimale : exemples, bonnes pratiques et schéma visuel inclus.",
    img: "/blog/blog2/arborescence-site-web-illustration.jpeg",
    by: "Ikovaline",
    slug: "arborescence-site-web",
  },
  {
    date: "2025-05-16",
    title:
      "comment être référencé sur google gratuitement: 3 étapes pour visibilité optimale",
    desc: "Boostez votre référencement Google grâce à un SEO optimisé, contenu de qualité et structure site web pour visibilité et trafic qualifié.",
    img: "/blog/blog3/comment-etre-reference-sur-google-gratuitement-illustration.jpg",
    by: "Ikovaline",
    slug: "comment-etre-reference-sur-google-gratuitement",
  },
];

function Blog() {
  return (
    <div className="w-full py-20 px-10 max-w-[1400px] max-auto">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Blogs Récents
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataBlog.map((bl: BlogType, index) => {
            return (
              <Link
                key={bl.slug}
                href={`blog/${bl.slug}`}
                className={`flex flex-col gap-4 hover:opacity-75 cursor-pointer ${
                  index === 0 ? "md:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <Image
                  width={500}
                  height={500}
                  src={bl.img}
                  alt={bl.slug}
                  className="rounded-3xl w-full object-cover aspect-video"
                />

                <div className="flex flex-row gap-4 items-center">
                  <Badge>Nouveau</Badge>
                  <p className="flex flex-row gap-2 text-sm items-center">
                    <span className="text-muted-foreground">Par</span>{" "}
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/images/logo/ikovaline_logo_unique.png" />
                      <AvatarFallback>IK</AvatarFallback>
                    </Avatar>
                    <span>{bl.by}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="max-w-3xl text-2xl tracking-tight">
                    {bl.title}
                  </h3>
                  <p className="max-w-3xl text-muted-foreground text-base">
                    {bl.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { Blog };
