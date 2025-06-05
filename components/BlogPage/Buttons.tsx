"use client";
import React from "react";
import { Button } from "../ui/button";
import { IconArrowUp, IconHome } from "@tabler/icons-react";
import Link from "next/link";

export default function Buttons() {
  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="fixed bottom-24   z-20 sm:bottom-5 space-y-2 right-2 sm:right-5">
      <Button
        className=" w-12 h-12  flex items-center justify-center "
        variant={"secondary"}
        onClick={scrollUp}
      >
        <IconArrowUp
          className="min-w-7 min-h-7"
          stroke={2}
          aria-hidden="true"
          focusable="false"
        />
      </Button>

      <Button
        asChild
        className="h-12 w-12 flex items-center justify-center "
        aria-label="Aller au blog"
      >
        <Link href="/blog">
          <IconHome
            className="min-w-7 min-h-7"
            aria-hidden="true"
            focusable="false"
          />
        </Link>
      </Button>
    </div>
  );
}
