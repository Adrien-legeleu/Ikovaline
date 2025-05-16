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
    <div className="fixed bottom-24  sm:bottom-5 space-y-2 right-2 sm:right-5">
      <Button
        className=" w-12 h-12  flex items-center justify-center "
        variant={"secondary"}
        onClick={scrollUp}
      >
        <IconArrowUp className="min-w-7 min-h-7" stroke={2} />
      </Button>
      <Link href={"/blog"} className="inline-block">
        <Button className="h-12 w-12 flex items-center justify-center ">
          <IconHome className="min-w-7 min-h-7" />
        </Button>
      </Link>
    </div>
  );
}
