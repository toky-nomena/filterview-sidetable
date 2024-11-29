import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useFilterState } from "@/store/filterStore";
import type { Province } from "@/types/schema";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Lookup } from "@/components/ui/lookup";

const provinces: Province[] = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

export function ProvinceFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const { provinces: selectedProvinces, setProvinces } = useFilterState();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full items-center justify-between p-2",
            !isOpen && "rounded-none"
          )}
        >
          <span>Provinces</span>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 px-1">
        {provinces.map((province) => (
          <div key={province} className="flex items-center gap-2 py-1">
            <Checkbox
              id={province}
              checked={selectedProvinces.includes(province)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setProvinces([...selectedProvinces, province]);
                } else {
                  setProvinces(selectedProvinces.filter((p) => p !== province));
                }
              }}
            />
            <label htmlFor={province} className="text-sm">
              <Lookup type="province" value={province} />
            </label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
