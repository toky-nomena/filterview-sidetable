import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Database, Hexagon, Layers } from "lucide-react";

function createKeys(prefix: string) {
  return Array.from({ length: 5 }).map((_, index) => `${prefix}-${index}`);
}

export function PortfolioSidebarSkeleton() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="space-y-4 p-4">
          {createKeys("title").map((title) => (
            <div key={title} className="space-y-3">
              <Skeleton className="h-8 w-24" />
              <div className="space-y-2">
                {createKeys("content").map((content) => (
                  <Skeleton key={content} className="h-6 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Skeleton className="h-9 w-full" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
