import {
  getLookupValue,
  getLookupValues,
} from "@/use-cases/lookup/lookup.service";
import type { LookupValue } from "@/use-cases/lookup/lookup.types";
import { useQuery } from "@tanstack/react-query";

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
    queryKey: ["lookup", name, code],
    queryFn: () => getLookupValue(name, code),
    ...CACHE_OPTIONS,
  });
}

export function useLookupValues(name: string, values?: LookupValue[]) {
  return useQuery({
    queryKey: ["lookup", name],
    queryFn: () => getLookupValues(name),
    initialData: values,
    ...CACHE_OPTIONS,
  });
}
