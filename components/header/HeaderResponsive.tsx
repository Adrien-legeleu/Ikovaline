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
import { IconMenuDeep } from "@tabler/icons-react";
import IkovalineLogoDark from "@/public/images/logo/ikovaline_logo_dark.png";

import { ModeToggle } from "../toggle-darkmode";

export function HeaderResponsive() {
  const theme = useTheme();
  return (
    <Drawer>
      <div className="fixed bottom-5 left-1/2 flex gap-12 bg-white dark:bg-black dark:border-white/20 border shadow-lg items-center  p-4 rounded-3xl -translate-x-1/2 z-[50] ">
        <div className="flex items-center justify-center ">
          <Link href="/">
            <Image
              src={theme.theme === "dark" ? IkovalineLogoDark : IkovalineLogo}
              alt="logo de la start-up Ikovaline"
              width={50}
              height={50}
              className="min-h-10 min-w-28 object-contain"
            />
          </Link>
        </div>
        <ModeToggle />
        <DrawerTrigger asChild>
          <IconMenuDeep stroke={2} className="w-8 h-8" />
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <div className="mx-auto w-full  max-w-sm">
          <DrawerHeader>
            <Image
              src={theme.theme === "dark" ? IkovalineLogoDark : IkovalineLogo}
              alt="logo de la start-up Ikovaline"
              width={50}
              height={50}
              className="min-h-10 min-w-28 mx-auto object-contain"
            />
          </DrawerHeader>
          <div className="gap-2 py-5 flex  flex-col items-center justify-center">
            <DrawerClose asChild>
              <Link href="/">
                <Button variant="ghost" className="w-full text-lg">
                  Home
                </Button>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href="/nos-services">
                <Button variant="ghost" className="w-full text-lg">
                  Nos Services
                </Button>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href="/about">
                <Button variant="ghost" className="w-full text-lg">
                  A Propos
                </Button>
              </Link>
            </DrawerClose>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Link href="/contact">
                <Button variant="destructive" className="w-full">
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
