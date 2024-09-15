"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: Props) => {
  const [pathname, setPathname] = useState("");
  const params = useParams();

  useEffect(() => {
    setPathname(window.location.hash);
  }, [params]);

  const isActive = "/" + pathname === href;

  return (
    <Link
      href={href}
      className={`hover:underline underline-offset-8 decoration-2 ${
        isActive ? "underline" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
