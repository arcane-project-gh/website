"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "#servers", label: "Servers" },
  { href: "#donate", label: "Donate" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-x">
      <nav className="flex h-14 items-stretch justify-between">
        <div className="flex items-stretch h-full">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-full w-auto justify-start px-5 font-medium cursor-pointer",
            )}
          >
            <Logo className="size-6 text-white" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-stretch h-full">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-full w-auto justify-start px-5 text-xs text-foreground/80 hover:text-foreground cursor-pointer",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={
            <Button variant="ghost" size="icon" className="md:hidden rounded-sm mr-4 my-auto">
              <Menu className="size-5" />
            </Button>
          }>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}