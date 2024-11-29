import { useLookupValue } from "@/hooks/use-lookup";
import type { LookupType } from "@/services/lookup/lookup.types";

interface LookupProps {
  type: LookupType;
  code: string;
  children: (props: { label: string; isLoading: boolean }) => React.ReactNode;
}

export function Lookup({ type, code, children }: LookupProps) {
  const { data: label, isLoading } = useLookupValue(type, code);
  return <>{children({ label: label ?? code, isLoading })}</>;
}
