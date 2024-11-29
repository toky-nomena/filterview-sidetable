import { useLookupValues } from "@/hooks/use-lookup";
import type { LookupType } from "@/services/lookup/lookup.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LookupSelectProps {
  type: LookupType;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function LookupSelect({
  type,
  value,
  onValueChange,
  placeholder = "Select...",
  disabled,
}: LookupSelectProps) {
  const { data: lookupValues, isLoading } = useLookupValues(type);

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || isLoading}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder}>
          {value && lookupValues?.[value]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {lookupValues &&
          Object.entries(lookupValues).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
