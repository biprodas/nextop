"use client";

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

interface DashboardNavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardNav({ setOpen }: DashboardNavProps) {
  const path = usePathname();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4 " />,
    },
    {
      name: "My Programs",
      path: "/programs",
      icon: <List className="w-4 h-4 " />,
    },
    {
      name: "Universities",
      path: "/universities",
      icon: <List className="w-4 h-4 " />,
    },
    {
      name: "Professors",
      path: "/professors",
      icon: <List className="w-4 h-4 " />,
    },
    {
      name: "Log Monitor",
      path: "/log-monitor",
      icon: <MonitorDot className="w-4 h-4 " />,
    },
    {
      name: "Account Settings",
      path: "/account",
      icon: <Settings className="w-4 h-4 " />,
    },
  ];

  return (
    <nav className="grid items-start text-sm font-medium">
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item.path}
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
