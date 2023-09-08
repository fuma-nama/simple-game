"use client";

import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();
  const num = Number(pathname.split("/")[2]);

  if (Number.isNaN(num)) return <></>;

  return (
    <span className="bg-primary text-primary-foreground rounded-full w-fit text-xs font-medium px-2.5 py-1 mb-4">
      {
        {
          1: "First",
          2: "Second",
        }[num]
      }
      {" Step"}
    </span>
  );
}
