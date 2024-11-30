import { Badge } from "@/components/ui/badge";
import { Lookup } from "@/components/lookup/lookup";
import { Skeleton } from "@/components/ui/skeleton";
import type { RiskState, State, TransactionType } from "@/types/schema";

const stateVariants: Record<State, "default" | "outline"> = {
  Active: "default",
  Inactive: "outline",
};

const riskVariants: Record<RiskState, "default" | "warning" | "danger"> = {
  LowRisk: "default",
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
      return stateVariants[value];
    case "riskState":
      return riskVariants[value];
    case "transaction":
      return transactionVariants[value];
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
