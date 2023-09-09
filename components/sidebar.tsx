"use client";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { RemoveScroll } from "react-remove-scroll";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";

export const SidebarContext = createContext<
  [open: boolean, setOpen: (v: boolean) => void]
>([false, () => {}]);

export function SidebarProivder({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={[open, setOpen]}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger(props: HTMLAttributes<HTMLButtonElement>) {
  const [open, setOpen] = useContext(SidebarContext);

  return (
    <Button
      size="icon"
      variant="ghost"
      {...props}
      onClick={() => setOpen(!open)}
    >
      <MenuIcon className="w-5 h-5" />
    </Button>
  );
}

const minWidth = 768; // md
export function SidebarContainer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useContext(SidebarContext);
  const [isMobile, setIsMobile] = useState(false);
  const isOpen = open && isMobile;

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(min-width: ${minWidth}px)`);

    const handleChange = () => setIsMobile(!mediaQueryList.matches);
    handleChange();

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [minWidth]);

  return (
    <RemoveScroll
      enabled={isOpen}
      allowPinchZoom={false}
      as="nav"
      className={cn(
        "relative flex flex-col border bg-background rounded-lg md:w-[240px] md:h-[calc(100vh-9.5rem)] md:sticky md:top-8 max-md:fixed max-md:inset-0 max-md:p-4 max-md:overflow-auto",
        !isOpen && "max-md:hidden"
      )}
    >
      {isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-8 right-8"
          onClick={() => setOpen(false)}
        >
          <XIcon className="w-5 h-5" />
        </Button>
      )}
      {children}
    </RemoveScroll>
  );
}
