import { useQuery } from "@tanstack/react-query";
import {
  getLookupValue,
  getLookupValues,
  type LookupType,
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

export function useLookupValue(type: LookupType, code: string) {
  return useQuery({
    queryKey: ["lookupValue", type, code],
    queryFn: () => getLookupValue(type, code),
    ...CACHE_OPTIONS,
  });
}

export function useLookupValues(type: LookupType, values?: LookupValue[]) {
  return useQuery({
    queryKey: ["lookupValues", type],
    queryFn: () => getLookupValues(type),
    initialData: values,
    enabled: !values,
    ...CACHE_OPTIONS,
  });
}
