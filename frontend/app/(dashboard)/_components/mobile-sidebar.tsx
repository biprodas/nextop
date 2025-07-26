"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

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
      <SheetContent side="left" className="w-[300px] space-y-5">
        <SheetHeader>
          <SheetTitle>Overview</SheetTitle>
          <SheetDescription>
            select a menu item to navigate
          </SheetDescription>
        </SheetHeader>
        <DashboardNav setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
