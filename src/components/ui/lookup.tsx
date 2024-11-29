import { useLookupValue } from "@/hooks/use-lookup";
import type { LookupType } from "@/services/lookup/lookup.service";

interface LookupRenderProps {
  value: string;
  label: string | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface LookupProps {
  type: LookupType;
  value: string;
  children?: (props: LookupRenderProps) => React.ReactNode;
}

export function Lookup({ type, value, children }: LookupProps) {
  const { data, isLoading, isError } = useLookupValue(type, value);

  if (children) {
    return <>{children({ value, label: data, isLoading, isError })}</>;
  }

  return null;
}
