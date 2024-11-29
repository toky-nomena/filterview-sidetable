import { useLookup } from "@/hooks/use-lookup";
import type { LookupType } from "@/services/lookup.service";

interface LookupRenderProps {
  value: string;
  label: string | undefined;
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

interface LookupProps {
  type: LookupType;
  value: string;
  children?: (props: LookupRenderProps) => React.ReactNode;
}

export function Lookup({ type, value, children }: LookupProps) {
  const { data, isLoading, isError } = useLookup(type, value);

  if (children) {
    return <>{children({ value, label: data, isLoading, isError })}</>;
  }

  return null;
}
