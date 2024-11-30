import { Database, Hexagon, Layers, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
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
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-[70px] flex justify-center items-center align-middle">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="rounded-none">
              <div>
                <div className="flex aspect-square align-middle justify-center rounded-lg  text-sidebar-primary-foreground">
                  <Layers className="size-7 stroke-[2] text-primary " />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg text-primary">
                    Portfolio Search
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4 px-2">
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
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme</span>
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
      </SidebarFooter>
    </Sidebar>
  );
}
