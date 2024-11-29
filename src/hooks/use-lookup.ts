import { useQuery } from "@tanstack/react-query";
import {
  getLookupValue,
  getLookupValues,
  type LookupType,
} from "@/services/lookup/lookup.service";

// Cache forever since lookup values are static
const CACHE_OPTIONS = {
  staleTime: Number.POSITIVE_INFINITY,
  cacheTime: Number.POSITIVE_INFINITY,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

export function useLookup(type: LookupType, value: string) {
  return useQuery({
    queryKey: ["lookup", type, value],
    queryFn: () => getLookupValue(type, value),
    ...CACHE_OPTIONS,
  });
}

export function useLookupValues(type: LookupType) {
  return useQuery({
    queryKey: ["lookupValues", type],
    queryFn: () => getLookupValues(type),
    ...CACHE_OPTIONS,
  });
}
