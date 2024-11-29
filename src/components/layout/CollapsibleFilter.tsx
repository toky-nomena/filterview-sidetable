import { ChevronRight } from "lucide-react";
import { useFilterState, update, type FilterState } from "@/store/filterStore";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import { FilterHeader } from "./filters/FilterHeader";
import { FilterItem } from "./filters/FilterItem";

export interface CollapsibleFilterProps {
  title: string;
  stateKey:
    | "riskState"
    | "transaction"
    | "province"
    | "brand"
    | "state"
    | "productType";
  items: string[];
}

export function CollapsibleFilter({
  title,
  stateKey,
  items,
}: CollapsibleFilterProps) {
  const state = useFilterState();
  const activeFilters = (state[stateKey] || []) as string[];
  const activeItems = activeFilters.filter((filter) => items.includes(filter));
  const allSelected = activeItems.length === items.length;

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="p-0">
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            <FilterHeader
              title={title}
              stateKey={stateKey}
              items={items}
              activeItems={activeItems}
              allSelected={allSelected}
            />
            <ChevronRight className="w-4 h-4 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="pl-1">
          <SidebarGroupContent>
            <SidebarMenuSub>
              {items.map((item) => (
                <FilterItem
                  key={item}
                  item={item}
                  stateKey={stateKey}
                  isActive={activeFilters.includes(item)}
                />
              ))}
            </SidebarMenuSub>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
