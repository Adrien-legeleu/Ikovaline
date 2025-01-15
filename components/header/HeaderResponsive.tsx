"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import Image from "next/image";
import IkovalineLogo from "@/public/images/logo/ikovaline_logo.png";
import { IconMenuDeep } from "@tabler/icons-react";

export function HeaderResponsive() {
  return (
    <Drawer>
      <div className="fixed bottom-5 left-1/2 flex gap-12 bg-white border shadow-lg items-center  p-4 rounded-3xl -translate-x-1/2 z-[50] ">
        <div className="flex items-center justify-center ">
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
        <DrawerTrigger asChild>
          <IconMenuDeep stroke={2} className="w-8 h-8" />
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <div className="mx-auto w-full  max-w-sm">
          <DrawerHeader>
            <Image
              src={IkovalineLogo}
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
