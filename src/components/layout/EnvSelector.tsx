import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const environments = [
  {
    value: "dev",
    label: "Development",
    badge: "dev",
    variant: "muted",
  },
  {
    value: "certification",
    label: "Certification",
    badge: "cert",
    variant: "warning",
  },
  {
    value: "production",
    label: "Production",
    badge: "prod",
    variant: "danger",
  },
] as const;

interface EnvironmentItemProps {
  label: string;
  badge: string;
  variant: (typeof environments)[number]["variant"];
  isSelected?: boolean;
  showIndicator?: boolean;
}

function EnvironmentItem({
  label,
  badge,
  variant,
  isSelected,
  showIndicator = false,
}: EnvironmentItemProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        {showIndicator && (
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-foreground/50",
              isSelected ? "opacity-100" : "opacity-0",
            )}
          />
        )}
        <span>{label}</span>
      </div>
      <Badge variant={variant}>{badge.toUpperCase()}</Badge>
    </div>
  );
}

export function EnvSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("dev");

  const selectedFramework = environments.find(
    (framework) => framework.value === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-[320px] justify-between"
        >
          {selectedFramework ? (
            <EnvironmentItem
              label={selectedFramework.label}
              badge={selectedFramework.badge}
              variant={selectedFramework.variant}
            />
          ) : (
            "Select environment..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command className="w-full" loop={false} value={value}>
          <CommandInput
            className="w-full"
            placeholder="Search environment..."
          />
          <CommandList>
            <CommandEmpty>No environment found.</CommandEmpty>
            <CommandGroup>
              {environments.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <EnvironmentItem
                    label={framework.label}
                    badge={framework.badge}
                    variant={framework.variant}
                    isSelected={value === framework.value}
                    showIndicator
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
