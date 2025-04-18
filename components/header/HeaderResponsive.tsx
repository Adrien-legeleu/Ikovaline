"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import Image from "next/image";
import IkovalineLogo from "@/public/images/logo/ikovaline_logo.png";
import { IconMenu3, IconShieldCheck } from "@tabler/icons-react";
import IkovalineLogoDark from "@/public/images/logo/ikovaline_logo_dark.png";

import { ModeToggle } from "../toggle-darkmode";
import { useTheme } from "next-themes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  IconApps,
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconMessage,
  IconThumbUp,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";

export function HeaderResponsive() {
  const theme = useTheme();
  const headerLinks = [
    {
      title: "Home",
      href: "/",
      links: [
        { label: "À Propos", href: "/#about", icon: <IconUser stroke={2} /> },
        {
          label: "Nos Services",
          href: "/#services",
          icon: <IconApps stroke={2} />,
        },
        {
          label: "Témoignages",
          href: "/#review",
          icon: <IconMessage stroke={2} />,
        },
      ],
    },
    {
      title: "Nos Services",
      href: "/nos-services",
      links: [
        {
          label: "Business Développement",
          href: "/nos-services/#buisness-developpement",
          icon: <IconChartLine stroke={2} />,
        },
        {
          label: "Développement Digital",
          href: "/nos-services/#developpement-digital",
          icon: <IconDeviceLaptop stroke={2} />,
        },
        {
          label: "Pourquoi-Nous ?",
          href: "/nos-services/#pourquoi-nous",
          icon: <IconThumbUp stroke={2} />,
        },
        {
          label: "Notre FAQ",
          href: "/nos-services/#faq",
          icon: <IconHelpHexagon stroke={2} />,
        },
      ],
    },
    {
      title: "À Propos",
      href: "/about",
      links: [
        {
          label: "Notre Histoire",
          href: "/about/#notre-histoire",
          icon: <IconHistory stroke={2} />,
        },
        {
          label: "Notre Équipe",
          href: "/about/#notre-equipe",
          icon: <IconUsersGroup stroke={2} />,
        },
        {
          label: "Notre Vision",
          href: "/about/#notre-vision",
          icon: <IconEye stroke={2} />,
        },
        {
          label: "Notre Garantie",
          href: "/about/#notre-garantie",
          icon: <IconShieldCheck stroke={2} />,
        },
      ],
    },
  ];
  return (
    <Drawer>
      <div className="fixed bottom-0 max-xs:w-full xs:left-1/2 xs:-translate-x-1/2  flex xs:gap-6 gap-2 bg-white [320px]:justify-between justify-around dark:bg-black dark:border-white/20 border shadow-lg items-center  p-4 xs:rounded-[2rem] rounded-t-[2.5rem] z-[10000] ">
        <DrawerTrigger asChild>
          <IconMenu3 stroke={2} className="[360px]:min-w-9 min-w-7 min-h-9 " />
        </DrawerTrigger>
        <div className="flex items-center max-[320px]:hidden  justify-center ">
          <DrawerClose asChild>
            <Link href="/">
              <Image
                src={theme.theme === "dark" ? IkovalineLogoDark : IkovalineLogo}
                alt="logo de la start-up Ikovaline"
                width={150}
                height={150}
                className="h-10 w-24 min-w-12 xs:min-w-24 object-contain"
              />
            </Link>
          </DrawerClose>
        </div>
        <Link href={"/contact"}>
          <Button
            variant={"secondary"}
            className="rounded-3xl max-[360px]:p-3 max-[320px]:px-5 max-[320px]:text-sm text-xs"
          >
            Contactez-nous
          </Button>
        </Link>
        <ModeToggle />
      </div>
      <DrawerContent>
        <div className="mx-auto w-full  max-w-sm">
          <DrawerHeader>
            <Image
              src={theme.theme === "dark" ? IkovalineLogoDark : IkovalineLogo}
              alt="logo de la start-up Ikovaline"
              width={150}
              height={150}
              className="min-h-10 min-w-28 mx-auto object-contain"
            />
          </DrawerHeader>
          <Accordion
            type="single"
            className="gap-4 py-8  flex  flex-col max-w-[250px] mx-auto justify-center"
            collapsible
          >
            {" "}
            {headerLinks.map((section, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
                className="space-y-2"
              >
                <AccordionTrigger className="text-neutral-600 space-x-3 dark:text-neutral-300 font-bold">
                  <DrawerClose asChild>
                    <Link href={section.href}>
                      <Button variant="ghost" className="w-full px-0 text-xl">
                        {section.title}
                      </Button>
                    </Link>
                  </DrawerClose>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="list-none">
                      <DrawerClose asChild>
                        <Link
                          href={link.href}
                          className="text-neutral-500 flex items-center gap-2 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-700"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      </DrawerClose>
                    </li>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>{" "}
          <DrawerFooter>
            <DrawerClose asChild>
              <Link href="/contact">
                <Button variant="secondary" className="w-full">
                  Contactez-nous !
                </Button>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
