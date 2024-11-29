import { ChevronRight } from "lucide-react";
import { useFilterState, update } from "@/store/filterStore";

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

import { FilterHeader } from "./FilterHeader";
import { FilterItem } from "./FilterItem";
import type { StateKey } from "./types";

export interface CollapsibleFilterProps {
  title: string;
  stateKey: StateKey;
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

  const handleToggleAll = () => {
    update(stateKey, () => (allSelected ? [] : [...items]));
  };

  const handleClear = () => {
    update(stateKey, () => []);
  };

  const handleToggleItem = (checked: boolean, item: string) => {
    update(stateKey, (currentFilters = []) => {
      if (checked) {
        return [...currentFilters, item];
      }
      return currentFilters.filter((filter) => filter !== item);
    });
  };

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
              activeItems={activeItems}
              allSelected={allSelected}
              onToggleAll={handleToggleAll}
              onClear={handleClear}
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
                  isActive={activeFilters.includes(item)}
                  onToggle={(checked) => handleToggleItem(checked, item)}
                />
              ))}
            </SidebarMenuSub>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
