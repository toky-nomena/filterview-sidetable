import { useLookupValues } from "@/hooks/use-lookup";
import type { LookupType } from "@/services/lookup/lookup.types";

interface LookupListProps {
  type: LookupType;
  children: (props: {
    items: { code: string; label: string }[];
    isLoading: boolean;
  }) => React.ReactNode;
}

export function LookupList({ type, children }: LookupListProps) {
  const { data: items = [], isLoading } = useLookupValues(type);
  return <>{children({ items, isLoading })}</>;
}
