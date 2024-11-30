import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import type { RiskState, State, TransactionType } from "@/types/schema";

const stateVariants: Record<State, "primary" | "outline-primary"> = {
  Active: "primary",
  Inactive: "outline-primary",
};

const riskVariants: Record<RiskState, "success" | "warning" | "danger"> = {
  LowRisk: "success",
  ModerateRisk: "warning",
  HighRisk: "danger",
  CriticalRisk: "danger",
  PendingReview: "warning",
  UnderInvestigation: "warning",
};

const transactionVariants: Record<TransactionType, "success" | "danger"> = {
  Purchase: "success",
  Refund: "danger",
};

function getVariant(type: string, value: string) {
  switch (type) {
    case "state":
      return stateVariants[value] ?? "outline";
    case "risk-state":
      return riskVariants[value] ?? "warning";
    case "transaction":
      return transactionVariants[value] ?? "muted";
    default:
      return "default";
  }
}

interface StatusBadgeProps {
  code: string;
  lookupName: string;
}

export function LookupBadge({ lookupName, code }: StatusBadgeProps) {
  return (
    <Lookup
      name={lookupName}
      code={code}
      fallback={<Skeleton className="h-5 w-16 rounded-full" />}
    >
      {({ label }) => (
        <Badge variant={getVariant(lookupName, code)}>{label}</Badge>
      )}
    </Lookup>
  );
}
