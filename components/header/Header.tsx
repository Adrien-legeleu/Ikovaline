"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import IkovalineLogo from "@/public/images/logo/ikovaline_logo.png";

// export function NavbarDemo() {
//   return (
//     <div className="relative w-full flex items-center justify-center">
//       <Navbar className="top-2" />
//       <p className="text-black dark:text-white">
//         The Navbar will show on top of the page
//       </p>
//     </div>
//   );
// }

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [upToZero, setUpToZero] = useState(false);

  useEffect(() => {
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
    <div
      className={cn(
        "fixed font-poppins  inset-x-0 duration-500 ease-in-out flex items-center justify-center mx-auto z-[10000]  ",
        upToZero ? "top-4" : "top-0",
        className
      )}
    >
      <Menu setActive={setActive} upToZero={upToZero}>
        <div className="flex items-center justify-center">
          <Image
            src={IkovalineLogo}
            alt="logo de la start-up Ikovaline"
            width={50}
            height={50}
            className="min-h-10 min-w-28 object-contain"
          />
        </div>
        <div className="flex items-center gap-10 justify-center">
          <MenuItem setActive={setActive} active={active} item="Home">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">
                Interface Design
              </HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Service">
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Algochurn"
                href="https://algochurn.com"
                src=""
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href="https://tailwindmasterkit.com"
                src=""
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href="https://gomoonbeam.com"
                src=""
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href="https://userogue.com"
                src=""
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="About">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
          <Button variant={"destructive"} className="rounded-2xl py-5">
            Contactez-nous
          </Button>
        </div>
      </Menu>
    </div>
  );
}
