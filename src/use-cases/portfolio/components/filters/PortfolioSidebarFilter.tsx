import { Layers, ChevronDown, ChevronUp } from "lucide-react";
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
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { VariationRadio } from "./VariationRadio";
import { parseAsStringEnum, useQueryState } from "nuqs";

interface FilterGroup {
  title: string;
  stateKey: PortfolioCollapseFilterProps["stateKey"];
  lookupName: LookupName;
}

function useToggleArray(length: number, defaultValue = false) {
  const [state, update] = useState<boolean[]>(Array(length).fill(defaultValue));

  // Reset all values to false
  const reset = useCallback(
    (value: boolean) => update((items) => Array(items.length).fill(value)),
    [],
  );

  // Reset all values to false
  const toggle = useCallback(
    (value: boolean, index: number) =>
      update((prev) => {
        const newValues = [...prev];
        newValues[index] = value;
        return newValues;
      }),
    [],
  );

  return [state, { reset, toggle }] as const;
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
  const [state, { reset, toggle }] = useToggleArray(items.length, true);
  const [variation, setVariation] = useQueryState(
    "variation",
    parseAsStringEnum(["minimum", "maximum"])
      .withDefault("minimum")
      .withOptions({ clearOnDefault: false }),
  );

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
                  setIsOpen={(isOpen) => toggle(isOpen, index)}
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
        <SidebarMenuItem className="flex flex-col gap-4 px-4 py-2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="w-full"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="w-full"
            />
          </div>
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="p-4 border-t">
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
