"use client";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const navItem = cva(
  "inline-flex items-center text-sm transition-colors px-2 py-1.5 rounded-md hover:text-accent-foreground hover:bg-accent",
  {
    variants: {
      active: {
        true: "font-medium",
        false: "text-muted-foreground",
      },
    },
  }
);

export function NavItem({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname.startsWith(href + "/") || pathname === href;

  return (
    <Link href="/" className={cn(navItem({ active }))}>
      {children}
    </Link>
  );
}
