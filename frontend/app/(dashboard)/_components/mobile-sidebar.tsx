"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

import React from "react";
import DashboardNav from "./dashboard-nav";

const MobileSidebar = ({ className }: SidebarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon className="shrink-0 lg:hidden" />
        {/* <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button> */}
      </SheetTrigger>
      <SheetContent side="left" className="!px-0">
        <div className="space-y-4 py-5">
          <div className="p-3">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            <DashboardNav setOpen={setOpen} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
