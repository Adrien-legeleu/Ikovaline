"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";

import IkovalineLogo from "@/public/images/logo/ikovaline_logo.png";
import IkovalineLogoDark from "@/public/images/logo/ikovaline_logo_dark.png";
import Link from "next/link";
import { HeaderResponsive } from "./HeaderResponsive";
import { ModeToggle } from "../toggle-darkmode";
import { useTheme } from "next-themes";
import {
  IconApps,
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconMessage,
  IconShieldCheck,
  IconThumbUp,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";

export function Header({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
  const [active, setActive] = useState<string | null>(null);
  
  const [upToZero, setUpToZero] = useState(false);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
  
    setMounted(true);
    const handleHeader = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setUpToZero(true);
      } else {
        setUpToZero(false);
      }
    };
    window.addEventListener("scroll", handleHeader);
  }, []);

  return (
    <>
      <HeaderResponsive />

      <div
        className={cn(
          "fixed max-lg:hidden bg-transparent  inset-x-0 duration-500 ease-in-out flex items-center justify-center mx-auto z-[10000]  ",
          upToZero ? "top-4" : "top-0",
          className
        )}
      >
        <Menu setActive={setActive} upToZero={upToZero}>
          <div className={` flex items-center justify-center `}>
            <Link href="/">
              {mounted && (
                <Image
                  src={(theme === "system" ? systemTheme : theme ) === "dark" ? IkovalineLogoDark : IkovalineLogo}
                  alt="logo de la start-up Ikovaline"
                  width={150}
                  height={150}
                  className="h-10 object-contain"
                />
              )}
            </Link>
          </div>
          <div className="flex items-center  w-full gap-10  justify-end">
            <MenuItem
              setActive={setActive}
              active={active}
              item="Home"
              link="/"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/#about">
                  <IconUser stroke={2} />A Propos
                </HoveredLink>
                <HoveredLink href="/#services">
                  {" "}
                  <IconApps stroke={2} />
                  Nos Services
                </HoveredLink>
                <HoveredLink href="/#review">
                  {" "}
                  <IconMessage stroke={2} />
                  Témoignages
                </HoveredLink>
              </div>
            </MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Nos Services"
              link="/nos-services"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/nos-services/#buisness-developpement">
                  <IconChartLine stroke={2} /> Accélérez votre croissance
                </HoveredLink>
                <HoveredLink href="/nos-services/#developpement-digital">
                  <IconDeviceLaptop stroke={2} /> Modernisez votre présence en
                  ligne
                </HoveredLink>
                <HoveredLink href="/nos-services/#pourquoi-nous">
                  <IconThumbUp stroke={2} /> Ce qui fait notre différence
                </HoveredLink>

                <HoveredLink href="/nos-services/#faq">
                  <IconHelpHexagon stroke={2} /> Foire aux questions
                </HoveredLink>
              </div>
            </MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              item="A Propos"
              link="/about"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/about/#notre-histoire">
                  <IconHistory stroke={2} />
                  Notre Histoire
                </HoveredLink>
                <HoveredLink href="/about/#notre-equipe">
                  <IconUsersGroup stroke={2} />
                  Notre Equipe
                </HoveredLink>
                <HoveredLink href="/about/#notre-vision">
                  <IconEye stroke={2} /> Notre Vision
                </HoveredLink>
                <HoveredLink href="/about/#notre-garantie">
                  <IconShieldCheck stroke={2} /> Notre Garantie
                </HoveredLink>
              </div>
            </MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Conseils Digitaux"
              link="/blog"
            ></MenuItem>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button
                asChild
                variant={"secondary"}
                className="rounded-3xl py-5"
              >
                <Link href={"/contact"}>Contactez-nous</Link>
              </Button>
            </div>
          </div>
        </Menu>
      </div>
    </>
  );
}
