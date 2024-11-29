import { useLookupValues } from "@/hooks/use-lookup";
import type { LookupType } from "@/services/lookup/lookup.types";

interface LookupListProps {
  type: LookupType;
  children: (props: {
    values: { code: string; label: string }[];
    isLoading: boolean;
  }) => React.ReactNode;
}

export function LookupList({ type, children }: LookupListProps) {
  const { data: values = [], isLoading } = useLookupValues(type);
  return <>{children({ values, isLoading })}</>;
}
