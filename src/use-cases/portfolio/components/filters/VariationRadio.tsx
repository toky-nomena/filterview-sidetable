import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { LucideIcon } from "lucide-react";

interface VariationItem {
  id: string;
  label: string;
  value: string;
}

interface VariationRadioProps {
  items: VariationItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function VariationRadio({
  items,
  value,
  onChange,
  className,
}: VariationRadioProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className={cn("flex gap-3 overflow-x-auto transition-colors", className)}
    >
      {items.map((item) => (
        <label
          key={item.id}
          htmlFor={item.id}
          className={cn(
            "group relative flex flex-1 cursor-pointer items-center gap-3 rounded-lg border bg-background py-2 px-4 hover:bg-accent/50",
            value === item.value
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-muted-foreground",
          )}
        >
          <span className="text-sm font-medium">{item.label}</span>
          <RadioGroupItem
            value={item.value}
            id={item.id}
            className={cn(
              "absolute right-3 h-4 w-4 border-2",
              value === item.value
                ? "border-primary text-primary"
                : "border-muted-foreground",
            )}
          />
        </label>
      ))}
    </RadioGroup>
  );
}
