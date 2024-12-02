import type { PropsWithChildren } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { EnvSelector } from "./EnvSelector";
import { PortfolioSidebarFilter } from "@/use-cases/portfolio/components/PortfolioSidebarLazy";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider className="flex h-screen overflow-hidden bg-background">
      <PortfolioSidebarFilter className="bg-white bg-background" />
      <SidebarInset className="flex flex-col flex-1 bg-background">
        <div className="flex items-center justify-between p-4 border-b h-[70px]">
          <SidebarTrigger className="-ml-1" />
          <EnvSelector />
        </div>
        <main className="flex-1 overflow-auto">
          <div>{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
