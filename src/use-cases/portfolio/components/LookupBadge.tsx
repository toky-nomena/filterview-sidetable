import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lookup } from "@/use-cases/lookup/components/lookup";

const stateVariants: Record<string, BadgeVariant> = {
  active: "primary",
  inactive: "muted",
  pending: "warning",
  suspended: "muted",
};

const riskVariants: Record<string, BadgeVariant> = {
  "low-risk": "success",
  "moderate-risk": "warning",
  "high-risk": "danger",
  "critical-risk": "danger",
  "pending-review": "warning",
  "under-investigation": "warning",
};

const transactionVariants: Record<string, BadgeVariant> = {
  purchase: "success",
  refund: "danger",
};

function getVariant(type: string, code: string): BadgeVariant {
  switch (type) {
    case "state":
      return stateVariants[code] || "primary";
    case "risk-state":
      return riskVariants[code] || "warning";
    case "transaction":
      return transactionVariants[code] || "primary";
    default:
      return "primary";
  }
}

interface StatusBadgeProps {
  code: string;
  name: string;
}

export function LookupBadge({ name, code }: StatusBadgeProps) {
  return (
    <Lookup
      name={name}
      code={code}
      fallback={<Skeleton className="h-6 w-16 rounded-lg" />}
    >
      {({ label }) => <Badge variant={getVariant(name, code)}>{label}</Badge>}
    </Lookup>
  );
}
