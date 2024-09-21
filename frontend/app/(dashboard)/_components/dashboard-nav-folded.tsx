"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  DollarSign,
  LayoutDashboard,
  List,
  MonitorDot,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { cn } from "~/lib/utils";
import { FaUniversity } from "react-icons/fa";
import { TbWorldCheck } from "react-icons/tb";

interface DashboardNavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardNavFolded({ setOpen }: DashboardNavProps) {
  const path = usePathname();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      name: "My Programs",
      path: "/programs",
      icon: <List className="size-4" />,
    },
    {
      name: "Professors",
      path: "/professors",
      icon: <List className="size-4" />,
    },
    {
      name: "Universities",
      path: "/universities",
      icon: <FaUniversity className="size-4" />,
    },
    {
      name: "Country & States",
      path: "/countries",
      icon: <TbWorldCheck className="size-4" />,
    },
    {
      name: "Log Monitor",
      path: "/log-monitor",
      icon: <MonitorDot className="size-4" />,
    },
    {
      name: "Account Settings",
      path: "/account",
      icon: <Settings className="size-4" />,
    },
  ];

  return (
    <nav className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item.path}
          className={cn(
            "w-10 h-10 flex justify-center items-center rounded-full text-[#7B7B7B] transition-all hover:text-primary",
            {
              "bg-[#96C0FF] text-white hover:text-white": item.path === path,
            }
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{item.icon}</TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      ))}
    </nav>
  );
}
