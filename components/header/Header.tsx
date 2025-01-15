"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import IkovalineLogo from "@/public/images/logo/ikovaline_logo.png";
import Link from "next/link";
import { HeaderResponsive } from "./HeaderResponsive";

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [upToZero, setUpToZero] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsResponsive(true);
    } else {
      setIsResponsive(false);
    }
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
      {isResponsive ? (
        <HeaderResponsive />
      ) : (
        <div
          className={cn(
            "fixed font-poppins  inset-x-0 duration-500 ease-in-out flex items-center justify-center mx-auto z-[10000]  ",
            upToZero ? "top-4" : "top-0",
            className
          )}
        >
          <Menu setActive={setActive} upToZero={upToZero}>
            <div
              className={` flex items-center justify-center  ${
                upToZero ? "max-lg:hidden" : ""
              }`}
            >
              <Link href="/">
                <Image
                  src={IkovalineLogo}
                  alt="logo de la start-up Ikovaline"
                  width={50}
                  height={50}
                  className="min-h-10 min-w-28 object-contain"
                />
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
                  <HoveredLink href="/#about">A Propos</HoveredLink>
                  <HoveredLink href="/#services">Nos Services</HoveredLink>
                  <HoveredLink href="/#review">Témoignages</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem
                setActive={setActive}
                active={active}
                item="Nos Service"
                link="/nos-services"
              >
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/nos-services/#buisness-developpement">
                    Business Développement
                  </HoveredLink>
                  <HoveredLink href="/nos-services/#developpement-digital">
                    Développement digital
                  </HoveredLink>
                  <HoveredLink href="/nos-services/#pourquoi-nous">
                    Pourquoi-Nous ?
                  </HoveredLink>
                </div>
              </MenuItem>
              <MenuItem
                setActive={setActive}
                active={active}
                item="A Propos"
                link="about"
              >
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/about/#notre-histoire">
                    Notre Histoire
                  </HoveredLink>
                  <HoveredLink href="/about/#notre-equipe">
                    Notre Equipe
                  </HoveredLink>
                  <HoveredLink href="/about/#notre-vision">
                    Notre Vision
                  </HoveredLink>
                </div>
              </MenuItem>
              <Button variant={"destructive"} className="rounded-2xl py-5">
                Contactez-nous
              </Button>
            </div>
          </Menu>
        </div>
      )}
    </>
  );
}
