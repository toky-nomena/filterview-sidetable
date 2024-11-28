import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	riskStateLabels,
	stateLabels,
	transactionLabels,
} from "@/lib/status-labels";

const stateVariants: Record<string, "success" | "muted"> = {
	Active: "success",
	Inactive: "muted",
};

const riskVariants: Record<string, "success" | "warning" | "danger"> = {
	LowRisk: "success",
	ModerateRisk: "warning",
	HighRisk: "danger",
	CriticalRisk: "danger",
	PendingReview: "warning",
	UnderInvestigation: "warning",
};

interface StatusBadgeProps {
	value: string;
}

const getRiskStateColor = (riskState: string) => {
	const colors: Record<string, string> = {
		LowRisk:
			"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
		ModerateRisk:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
		HighRisk:
			"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
		CriticalRisk: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
		PendingReview:
			"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
		UnderInvestigation:
			"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
	};
	return (
		colors[riskState] ||
		"bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
	);
};

export function StateBadge({ value }: StatusBadgeProps) {
	return (
		<Badge variant={stateVariants[value]}>
			{stateLabels[value]}
		</Badge>
	);
}

export function RiskStateBadge({ value }: StatusBadgeProps) {
	return (
		<Badge variant={riskVariants[value]}>
			{riskStateLabels[value]}
		</Badge>
	);
}

export function TransactionBadge({ value }: StatusBadgeProps) {
	return (
		<Badge variant={value === "Purchase" ? "default" : "destructive"}>
			{transactionLabels[value]}
		</Badge>
	);
}
