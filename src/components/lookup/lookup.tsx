import { useLookupValue } from "@/hooks/use-lookup";
import type { LookupType } from "@/services/lookup/lookup.service";

interface LookupRenderProps {
  code: string;
  label: string | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface LookupProps {
  type: LookupType;
  code: string;
  children?: (props: LookupRenderProps) => React.ReactNode;
}

export function Lookup({ type, code, children }: LookupProps) {
  const { data, isLoading, isError } = useLookupValue(type, code);

  if (children) {
    return <>{children({ code, label: data, isLoading, isError })}</>;
  }

  return null;
}
