import { ChevronRight, Ellipsis } from "lucide-react";
import {
  usePortfolioFilterState,
  update,
} from "@/use-cases/portfolio/store/portfolioFilterStore";
import { motion, AnimatePresence } from "motion/react";

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

import { SidebarFilterHeader } from "./SidebarFilterHeader";
import { SidebarFilterItem } from "./SidebarFilterItem";
import type { FilterStateKey } from "./types";
import type { LookupValue } from "@/use-cases/lookup/lookup.types";
import { useState } from "react";

export interface PortfolioCollapseFilterProps {
  title: string;
  stateKey: FilterStateKey;
  values: LookupValue[];
  isLoading?: boolean;
}

export function PortfolioCollapseFilter({
  title,
  stateKey,
  values,
  isLoading,
}: PortfolioCollapseFilterProps) {
  const state = usePortfolioFilterState();
  const [isOpen, setIsOpen] = useState(isLoading);

  const items = values.map((item) => item.code);

  const activeFilters = (state[stateKey] || []) as string[];
  const activeItems = activeFilters.filter((filter) => items.includes(filter));
  const allSelected =
    !isLoading && items.length > 0 && activeItems.length === values.length;

  const handleToggleAll = () => {
    update(stateKey, () => (allSelected ? [] : [...items]));
  };

  const handleClear = () => {
    update(stateKey, () => []);
  };

  const handleToggleItem = (checked: boolean, item: string) => {
    update(stateKey, (currentFilters = []) => {
      return checked
        ? [...currentFilters, item]
        : currentFilters.filter((filter) => filter !== item);
    });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <SidebarGroup className="p-0">
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            <SidebarFilterHeader
              title={title}
              activeItemsCount={activeItems.length}
              allSelected={allSelected}
              onToggleAll={handleToggleAll}
              onClear={handleClear}
              isLoading={isLoading}
            />
            {isLoading ? (
              <Ellipsis className="w-4 h-4 ml-auto text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            )}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <AnimatePresence>
          {!isLoading && (
            <CollapsibleContent className="pl-1">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    {values.map((item, index) => (
                      <motion.div
                        key={item.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <SidebarFilterItem
                          label={item.label}
                          isActive={
                            activeFilters.includes(item.code) && !isLoading
                          }
                          onToggle={(checked) =>
                            handleToggleItem(checked, item.code)
                          }
                        />
                      </motion.div>
                    ))}
                  </SidebarMenuSub>
                </SidebarGroupContent>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </SidebarGroup>
    </Collapsible>
  );
}
