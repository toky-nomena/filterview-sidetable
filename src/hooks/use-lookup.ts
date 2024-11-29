import { useQuery } from "@tanstack/react-query";
import {
  getLookupValue,
  getLookupValues,
} from "@/services/lookup/lookup.service";
import type { LookupValue } from "@/services/lookup/lookup.types";

// Cache forever since lookup values are static
const CACHE_OPTIONS = {
  staleTime: Number.POSITIVE_INFINITY,
  cacheTime: Number.POSITIVE_INFINITY,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

export function useLookupValue(name: string, code: string) {
  return useQuery({
    queryKey: ["lookupValue", name, code],
    queryFn: () => getLookupValue(name, code),
    ...CACHE_OPTIONS,
  });
}

export function useLookupValues(name: string, values?: LookupValue[]) {
  return useQuery({
    queryKey: ["lookupValues", name],
    queryFn: () => getLookupValues(name),
    initialData: values,
    enabled: !values,
    ...CACHE_OPTIONS,
  });
}
