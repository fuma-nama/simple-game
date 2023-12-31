import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./provider";
import { NavItem } from "@/components/nav-item";
import { SidebarTrigger, SidebarContainer } from "@/components/sidebar";
import {
  HomeIcon,
  BarChartIcon,
  Settings,
  Gamepad2Icon,
  GithubIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Game",
  description: "A simple game to consume your free time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <DashboardLayout>{children}</DashboardLayout>
        </Provider>
      </body>
    </html>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen container md:py-8">
      <div className="z-[-2] absolute top-0 right-0 [mask-image:linear-gradient(to_left,var(--tw-gradient-stops))] from-white from-50%">
        <div className="bg-gradient-to-r from-emerald-400 to-green-400 w-[1000px] h-[200px] opacity-20 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <nav className="flex flex-row items-center h-14 px-4 rounded-lg bg-background border mb-8 max-md:sticky max-md:top-2">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium transition-colors duration-100 hover:text-muted-foreground"
        >
          <Gamepad2Icon className="w-5 h-5 mr-1.5" />
          Simple Game
        </Link>
        <Button size="icon" variant="ghost" className="ml-auto" asChild>
          <a
            href="https://github.com/SonMooSans/simple-game"
            rel="noreferrer onopener"
            target="_blank"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </Button>
        <SidebarTrigger className="md:hidden" />
      </nav>
      <div className="flex flex-row items-start gap-8 flex-1">
        <SidebarContainer>
          <div className="flex flex-col px-2 py-4">
            <p className="font-semibold p-2 mb-4 md:hidden">Simple Game</p>

            <NavItem href="/">
              <HomeIcon className="w-4 h-4 mr-2" />
              Home
            </NavItem>
            <NavItem href="/analyst">
              <BarChartIcon className="w-4 h-4 mr-2" />
              Analyst
            </NavItem>
            <NavItem href="/settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </NavItem>
          </div>

          <div className="mt-auto p-3 rounded-lg flex flex-row items-center gap-3 hover:bg-muted/50">
            <div className="rounded-full w-8 h-8 bg-gradient-to-b from-orange-300 to-blue-200" />
            <div>
              <p className="text-sm font-medium">Unknown User</p>
              <p className="text-xs text-muted-foreground">No more info</p>
            </div>
          </div>
        </SidebarContainer>
        <div className="flex flex-col flex-1 py-8">{children}</div>
      </div>
    </main>
  );
}
