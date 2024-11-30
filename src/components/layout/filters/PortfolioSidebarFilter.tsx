import { Hexagon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { EnvSelector } from "../../../components/layout/EnvSelector";
import {
  PortfolioCollapseFilter,
  type PortfolioCollapseFilterProps,
} from "./PortfolioCollapseFilter";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { LookupList } from "@/use-cases/lookup/components/LookupList";

interface FilterGroup {
  title: string;
  stateKey: PortfolioCollapseFilterProps["stateKey"];
  lookupName: LookupName;
}

const items: FilterGroup[] = [
  {
    title: "Risk State",
    stateKey: "riskState",
    lookupName: LookupName.RiskState,
  },
  {
    title: "Transaction",
    stateKey: "transaction",
    lookupName: LookupName.Transaction,
  },
  {
    title: "Province",
    stateKey: "province",
    lookupName: LookupName.Province,
  },
  {
    title: "Brand",
    stateKey: "brand",
    lookupName: LookupName.Brand,
  },
  {
    title: "State",
    stateKey: "state",
    lookupName: LookupName.State,
  },
  {
    title: "Product Type",
    stateKey: "productType",
    lookupName: LookupName.ProductType,
  },
];

export function PortfolioSidebarFilter({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
          <LookupList key={item.lookupName} name={item.lookupName}>
            {({ values, isLoading }) => (
              <PortfolioCollapseFilter
                title={item.title}
                stateKey={item.stateKey}
                values={values}
                isLoading={isLoading}
              />
            )}
          </LookupList>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
