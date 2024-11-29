import type { LookupType } from "@/services/lookup/lookup.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LookupList } from "./LookupList";
import type { ComponentProps } from "react";
import { Skeleton } from "../ui/skeleton";

interface LookupSelectProps extends ComponentProps<typeof Select> {
  type: LookupType;
  placeholder?: string;
}

export function LookupSelect({
  type,
  value,
  onValueChange,
  placeholder = "Select...",
  disabled,
}: LookupSelectProps) {
  return (
    <LookupList type={type}>
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
