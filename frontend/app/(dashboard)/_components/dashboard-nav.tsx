"use client";

import {
  DollarSign,
  LayoutDashboard,
  List,
  ListCheck,
  MonitorDot,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FaUniversity, FaUserTie } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { TbWorldCheck } from "react-icons/tb";

import { cn } from "~/lib/utils";

interface DashboardNavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardNav({ setOpen }: DashboardNavProps) {
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
      icon: <GiGraduateCap className="size-5" />,
    },
    {
      name: "Professors",
      path: "/professors",
      icon: <FaUserTie className="size-4" />,
    },
    {
      name: "Universities",
      path: "/universities",
      icon: <FaUniversity className="size-4" />,
    },
    {
      name: "Country",
      path: "/countries",
      icon: <TbWorldCheck className="size-4" />,
    },
    {
      name: "States",
      path: "/states",
      icon: <TbWorldCheck className="size-4" />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <ListCheck className="size-4" />,
    },
    {
      name: "Log Monitor",
      path: "/log-monitor",
      icon: <MonitorDot className="size-4" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="size-4" />,
    },
  ];

  return (
    <nav className="grid items-start text-sm font-medium">
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item.path}
          // onClick={() => setOpen?.(false)}
          className={cn(
            "flex items-center gap-3 rounded-full py-1 text-[#7B7B7B] font-medium transition-all hover:text-primary px-1.5",
            { "gap-4 bg-[#E0EDFA]": item.path === path }
          )}
        >
          <span
            className={cn(
              "w-9 h-9 flex justify-center items-center rounded-full",
              {
                "bg-white border": item.path === path,
              }
            )}
          >
            {item.icon}
          </span>
          <div className={cn({ "text-primary": (item.path = path) })}>
            {item.name}
          </div>
        </Link>
      ))}
    </nav>
    // <nav className="grid items-start gap-2">
    //   {items.map((item, index) => {
    //     const Icon = Icons[item.icon || 'arrowRight'];
    //     return (
    //       item.href && (
    //         <Link
    //           key={index}
    //           href={item.disabled ? '/' : item.href}
    //           onClick={() => {
    //             if (setOpen) setOpen(false);
    //           }}
    //         >
    //           <span
    //             className={cn(
    //               'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
    //               path === item.href ? 'bg-accent' : 'transparent',
    //               item.disabled && 'cursor-not-allowed opacity-80'
    //             )}
    //           >
    //             <Icon className="mr-2 h-4 w-4" />
    //             <span>{item.title}</span>
    //           </span>
    //         </Link>
    //       )
    //     );
    //   })}
    // </nav>
  );
}
