import React from "react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import Link from "next/link";

export default function Footer() {
  // Tableau des sections avec leurs liens
  const footerLinks = [
    {
      title: "Home",
      href: "/",
      links: [
        { label: "À Propos", href: "/#about" },
        { label: "Nos Services", href: "/#services" },
        { label: "Témoignages", href: "/#review" },
      ],
    },
    {
      title: "Nos Services",
      href: "/nos-services",
      links: [
        {
          label: "Business Développement",
          href: "/nos-services/#buisness-developpement",
        },
        {
          label: "Développement Digital",
          href: "/nos-services/#developpement-digital",
        },
        { label: "Pourquoi-Nous ?", href: "/nos-services/#pourquoi-nous" },
      ],
    },
    {
      title: "À Propos",
      href: "/about",
      links: [
        { label: "Notre Histoire", href: "/about/#notre-histoire" },
        { label: "Notre Équipe", href: "/about/#notre-equipe" },
        { label: "Notre Vision", href: "/about/#notre-vision" },
      ],
    },
    {
      title: "Legal",
      href: "/legal",
      links: [{ label: "Mentions Légales", href: "/legal/mentions-legales" }],
    },
  ];

  return (
    <div className="py-16">
      <div className="lg:h-[16rem] h-[12rem] hidden md:flex items-center justify-center">
        <TextHoverEffect text="IKOVALINE" />
      </div>

      <div className="grid grid-cols-40/60 justify-center">
        <div className="flex justify-center w-full">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold">Ikovaline</h2>
            <div className="space-y-2">
              <p className="text-neutral-600">06 50 73 37 37</p>
              <p className="text-neutral-600">adrienlelege@gmal.com</p>
              <p>© {new Date().getFullYear()} Ikovaline</p>
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-4 gap-5">
          {footerLinks.map((section, index) => (
            <ul key={index} className="space-y-2">
              <li className="text-neutral-600 font-bold">
                <Link href={section.href} className="hover:text-neutral-800">
                  {section.title}
                </Link>
              </li>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 hover:text-neutral-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </ul>
      </div>
    </div>
  );
}
