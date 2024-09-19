"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import DashboardNav from "./dashboard-nav";
import DashboardNavFolded from "./dashboard-nav-folded";

export default function Sidebar() {
  const [unfold, setUnfold] = useState(true);

  return (
    <aside className="relative border-r rounded-3xl hidden lg:block">
      <div
        className={cn("flex w-72 h-full max-h-screen flex-col", {
          "w-24": !unfold,
        })}
      >
        <div className="flex items-center h-16 md:h-20 lg:h-[100px] px-6 md:px-8">
          <Link href="/">
            {/* {unfold ? <Logo height={25} /> : <LogoIcon height={40} />} */}
            {unfold ? "NextUp" : "N"}
          </Link>
        </div>
        <div className="flex-1 px-6 md:px-8">
          <div className="text-sm text-[#7B7B7B] mb-2">Menu</div>
          {unfold ? <DashboardNav /> : <DashboardNavFolded />}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setUnfold(!unfold)}
        className="absolute top-10 -right-3 w-6 h-6 shadow-md rounded-full"
      >
        {unfold ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </Button>
    </aside>
  );
}
