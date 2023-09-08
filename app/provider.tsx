"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SidebarProivder } from "@/components/sidebar";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <SidebarProivder>
      <ThemeProvider attribute="class" enableSystem>
        {children}
      </ThemeProvider>
    </SidebarProivder>
  );
}
