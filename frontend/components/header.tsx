"use client";

import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import Container from "~/components/container";
import NavLink from "~/components/nav-link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { CiMenuKebab } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ModeToggle } from "~/components/mode-toggle";
import useScroll from "~/hooks/use-scroll";

const Header = () => {
  const scrolled = useScroll(50);
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 w-full border-b z-30 transition-all duration-100",
        {
          "h-16 xl:16 2xl:20 border-b backdrop-blur-2xl duration-300": scrolled,
          "h-20 xl:h-24 2xl:h-32": !scrolled,
        }
      )}
    >
      <Container className="h-full flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold">Next Up</span>
        </Link>
        <nav
          className={cn(
            "hidden lg:flex w-full xl:w-[56%] justify-evenly items-center 2xl:text-xl",
            {
              "2xl:text-lg": scrolled,
            }
          )}
        >
          <NavLink href="/#home">Home</NavLink>
          <NavLink href="/#how-it-works">How It Works</NavLink>
          <NavLink href="/#services">Prepare Yourself</NavLink>
          <NavLink href="/#faqs">FAQ</NavLink>
          <NavLink href="/#contact-us">Contact Us</NavLink>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-2 border rounded-full hover:bg-slate-50">
                <CiMenuKebab size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push("/about-us")}>
                About Us
              </DropdownMenuItem>
              <DropdownMenuItem>University Selection</DropdownMenuItem>
              <DropdownMenuItem>Find your Professor</DropdownMenuItem>
              <DropdownMenuItem>Prepare for IELTS in Your Way</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex space-x-5">
          <ModeToggle />
          <Button variant="outline">Signin</Button>
          <Button
            variant="outline"
            size="icon"
            className={cn("sm:hidden", {
              "size-9": scrolled,
            })}
          >
            <FaRegCalendarAlt className="size-5" />
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
