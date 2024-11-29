import { ChevronDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface FilterSectionProps {
  title: string;
  items: { id: string; label: string }[];
  selectedItems: string[];
  onChange: (value: string) => void;
}

export function FilterSection({
  title,
  items,
  selectedItems,
  onChange,
}: FilterSectionProps) {
  return (
    <Collapsible defaultOpen className="space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 mt-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => onChange(item.id)}
              className="dark:border-gray-600"
            />
            <label htmlFor={item.id} className="text-sm cursor-pointer">
              {item.label}
            </label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
