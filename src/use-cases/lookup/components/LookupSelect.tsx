import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { ComponentProps } from "react";
import { LookupList } from "./LookupList";

interface LookupSelectProps extends ComponentProps<typeof Select> {
  name: string;
  placeholder?: string;
}

export function LookupSelect({
  name,
  value,
  onValueChange,
  placeholder = "Select...",
  disabled,
}: LookupSelectProps) {
  return (
    <LookupList name={name}>
      {({ values, isLoading }) => (
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled || isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder}>
              {value && values?.[value]}
            </SelectValue>
          </SelectTrigger>
          {isLoading ? (
            <Skeleton className="h-6 w-16 rounded-full" />
          ) : (
            <SelectContent>
              {values.map(({ code, label }) => (
                <SelectItem key={code} value={code}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      )}
    </LookupList>
  );
}
