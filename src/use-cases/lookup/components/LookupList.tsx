import type { LookupValue } from "@/use-cases/lookup/lookup.types";
import { useLookupValues } from "@/use-cases/lookup/useLookup";

interface LookupListProps {
  name: string;
  children: (props: {
    values: LookupValue[];
    isLoading: boolean;
  }) => React.ReactNode;
}

export function LookupList({ name, children }: LookupListProps) {
  const { data: values = [], isLoading } = useLookupValues(name);
  return <>{children({ values, isLoading })}</>;
}
