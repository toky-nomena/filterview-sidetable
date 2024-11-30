import { useLookupValue } from "@/hooks/use-lookup";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface LookupProps {
  name: string;
  code: string;
  fallback?: ReactNode;
  children?: (props: { label: string; isLoading: boolean }) => ReactNode;
}

export function Lookup({ name, code, children, fallback }: LookupProps) {
  const { data: label, isLoading } = useLookupValue(name, code);

  if (isLoading && fallback) {
    return <>{fallback}</>;
  }

  if (children && (label || isLoading)) {
    return <>{children({ label, isLoading })}</>;
  }

  return <>{label || code}</>;
}
