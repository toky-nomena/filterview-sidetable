import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lookup } from "@/use-cases/lookup/components/lookup";

const stateVariants: Record<string, "primary" | "outline"> = {
  active: "primary",
  inactive: "outline",
};

const riskVariants: Record<string, "success" | "warning" | "danger"> = {
  "low-risk": "success",
  "moderate-risk": "warning",
  "high-risk": "danger",
  "critical-risk": "danger",
  "pending-review": "warning",
  "under-investigation": "warning",
};

const transactionVariants: Record<string, "success" | "danger"> = {
  purchase: "success",
  refund: "danger",
};

function getVariant(type: string, code: string): BadgeVariant {
  switch (type) {
    case "state":
      return stateVariants[code];
    case "risk-state":
      return riskVariants[code];
    case "transaction":
      return transactionVariants[code];
    default:
      return "primary";
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
        <Badge variant={getVariant(lookupName, code) || "primary"}>
          {label}
        </Badge>
      )}
    </Lookup>
  );
}
