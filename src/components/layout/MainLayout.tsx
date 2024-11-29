import { useState, useEffect } from "react";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { Sidebar } from "./SidebarFilter";
import { PortfolioSidebarFilter } from "./filters/PortfolioSidebarFilter";
import { EnvSelector } from "./EnvSelector";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ChevronRight, ChevronLeft } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider className="flex h-screen overflow-hidden bg-background">
      <PortfolioSidebarFilter />
      <SidebarInset className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger className="-ml-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
