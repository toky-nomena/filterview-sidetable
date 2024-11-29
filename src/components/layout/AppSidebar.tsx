import { Hexagon } from "lucide-react";
import { data } from "@/services/data/data";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { EnvSelector } from "./EnvSelector";
import {
  CollapsibleFilter,
  type CollapsibleFilterProps,
} from "./filters/CollapsibleFilter";

interface FilterGroup {
  title: string;
  stateKey: CollapsibleFilterProps["stateKey"];
  items: string[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const items: FilterGroup[] = [
    {
      title: "Risk State",
      stateKey: "riskState",
      items: data.riskState,
    },
    {
      title: "Transaction",
      stateKey: "transaction",
      items: data.transaction,
    },
    {
      title: "Province",
      stateKey: "province",
      items: data.province,
    },
    {
      title: "Brand",
      stateKey: "brand",
      items: data.brand,
    },
    {
      title: "State",
      stateKey: "state",
      items: data.state,
    },
    {
      title: "Product Type",
      stateKey: "productType",
      items: data.productType,
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="rounded-none">
              <div className="">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Hexagon className="size-7 stroke-[3]" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">Search</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <EnvSelector />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {items.map((item) => (
          <CollapsibleFilter
            key={item.title}
            title={item.title}
            items={item.items}
            stateKey={item.stateKey}
          />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
