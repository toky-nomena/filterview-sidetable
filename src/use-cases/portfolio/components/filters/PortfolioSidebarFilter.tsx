import { Layers } from "lucide-react";
import { useCallback, useState } from "react";

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

import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LookupList } from "@/use-cases/lookup/components/LookupList";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { useVariationQueryState } from "../../hooks/useVariationQueryState";
import {
  PortfolioCollapseFilter,
  type PortfolioCollapseFilterProps,
} from "./PortfolioCollapseFilter";
import { PortfolioCustomFilter } from "./PortfolioCustomFilter";
import { VariationRadio } from "./VariationRadio";

interface FilterGroup {
  title: string;
  stateKey: PortfolioCollapseFilterProps["stateKey"];
  lookupName: LookupName;
}

function useBooleanArray(length: number, defaultValue = false) {
  const [state, setState] = useState<boolean[]>(
    Array(length).fill(defaultValue)
  );

  // Reset all values to false
  const reset = useCallback(
    (value: boolean) => setState((items) => Array(items.length).fill(value)),
    []
  );

  // Reset all values to false
  const update = useCallback(
    (value: boolean, index: number) =>
      setState((prev) => {
        const newValues = [...prev];
        newValues[index] = value;
        return newValues;
      }),
    []
  );

  return [state, { reset, update }] as const;
}

const items: FilterGroup[] = [
  {
    title: "Brand",
    stateKey: "brand",
    lookupName: LookupName.Brand,
  },
  {
    title: "Province",
    stateKey: "province",
    lookupName: LookupName.Province,
  },
  {
    title: "Transaction",
    stateKey: "transaction",
    lookupName: LookupName.Transaction,
  },
  {
    title: "State",
    stateKey: "state",
    lookupName: LookupName.State,
  },
  {
    title: "Language",
    stateKey: "language",
    lookupName: LookupName.Language,
  },
];

export function PortfolioSidebarFilter({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [state, { reset, update }] = useBooleanArray(items.length, true);
  const [variation, setVariation] = useVariationQueryState();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-[70px] flex justify-center items-center align-middle">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square align-middle justify-center rounded-lg bg-primary p-2">
                <Layers className="size-5 stroke-[2] text-white" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-bold text-lg text-primary">
                  Portfolio Search
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenuItem className="flex w-full items-center justify-between p-3 border z-10 sticky top-0 bg-background">
          <span className="text-base font-medium text-foreground">
            Global filters
          </span>
        </SidebarMenuItem>
        <SidebarMenuItem className="flex flex-col gap-4 px-4 py-2">
          <VariationRadio
            value={variation}
            onChange={setVariation}
            items={[
              {
                id: "minimum",
                label: "Minimum",
                value: "minimum",
              },
              {
                id: "maximum",
                label: "Maximum",
                value: "maximum",
              },
            ]}
          />
        </SidebarMenuItem>
        <SidebarMenuItem className="flex w-full items-center justify-between p-3 border z-20 sticky top-0 bg-background">
          <div className="text-base font-medium text-foreground">
            Policy filters
          </div>
          <Label className="flex items-center gap-2 text-sm">
            <span>Show all</span>
            <Switch
              className="shadow-none"
              checked={state.every(Boolean)}
              onCheckedChange={reset}
            />
          </Label>
        </SidebarMenuItem>
        <SidebarMenuItem className="flex flex-col gap-2 p-2">
          {items.map((item, index) => (
            <LookupList key={item.lookupName} name={item.lookupName}>
              {({ values, isLoading }) => (
                <PortfolioCollapseFilter
                  isOpen={state[index]}
                  title={item.title}
                  stateKey={item.stateKey}
                  values={values}
                  isLoading={isLoading}
                  setIsOpen={(isOpen) => update(isOpen, index)}
                />
              )}
            </LookupList>
          ))}
        </SidebarMenuItem>
        <SidebarMenuItem className="flex w-full items-center justify-between p-3 border z-10 sticky top-0 bg-background">
          <span className="text-base font-medium text-foreground">
            Custom filters
          </span>
        </SidebarMenuItem>
        <PortfolioCustomFilter />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="p-4 border-t">
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
