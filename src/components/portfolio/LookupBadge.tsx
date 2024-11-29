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

type BadgeType = "state" | "riskState" | "transaction";
type BadgeValue = State | RiskState | TransactionType;

function getVariant(type: BadgeType, value: BadgeValue) {
  switch (type) {
    case "state":
      return stateVariants[value as State];
    case "riskState":
      return riskVariants[value as RiskState];
    case "transaction":
      return transactionVariants[value as TransactionType];
  }
}

interface StatusBadgeProps {
  value: BadgeValue;
  type: BadgeType;
}

export function LookupBadge({ value, type }: StatusBadgeProps) {
  return (
    <Lookup type={type} code={value}>
      {({ label, isLoading }) =>
        isLoading ? (
          <Skeleton className="h-6 w-16 rounded-full" />
        ) : (
          <Badge variant={getVariant(type, value)}>{label}</Badge>
        )
      }
    </Lookup>
  );
}
