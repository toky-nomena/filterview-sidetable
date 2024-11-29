import { useLookupValue } from "@/hooks/use-lookup";

interface LookupProps {
  type: string;
  code: string;
  children: (props: { label: string; isLoading: boolean }) => React.ReactNode;
}

export function Lookup({ type, code, children }: LookupProps) {
  const { data: label, isLoading } = useLookupValue(type, code);
  return <>{children({ label: label ?? code, isLoading })}</>;
}
