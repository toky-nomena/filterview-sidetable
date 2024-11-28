import type { Company } from "@/services/data.service";
import { provinceLabels } from "@/lib/status-labels";
import { memo } from "react";
import { Separator } from "@/components/ui/separator";
import {
	RiskStateBadge,
	StateBadge,
	TransactionBadge,
} from "@/components/ui/status-badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PortfolioDetailsProps {
	company: Company;
}

interface DetailItemProps {
	label: string;
	children: React.ReactNode;
}

function DetailItem({ label, children }: DetailItemProps) {
	return (
		<div className="space-y-1">
			<p className="text-sm font-medium leading-none text-muted-foreground">
				{label}
			</p>
			<div className="text-sm">{children}</div>
		</div>
	);
}

function PortfolioDetailsComponent({ company }: PortfolioDetailsProps) {
	return (
		<ScrollArea className="h-[calc(100vh-8rem)] pr-4">
			<div className="space-y-6">
				{/* Personal Information */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium leading-none">
						Personal Information
					</h4>
					<Separator />
					<div className="grid grid-cols-2 gap-4">
						<DetailItem label="First Name">{company.firstName}</DetailItem>
						<DetailItem label="Last Name">{company.lastName}</DetailItem>
						<DetailItem label="Language">{company.language}</DetailItem>
						<DetailItem label="Province">
							{provinceLabels[company.province] || company.province}
						</DetailItem>
					</div>
				</div>

				{/* Business Information */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium leading-none">Business Details</h4>
					<Separator />
					<div className="grid grid-cols-2 gap-4">
						<DetailItem label="Brand">{company.brand}</DetailItem>
						<DetailItem label="Product Type">{company.productType}</DetailItem>
					</div>
				</div>

				{/* Status Information */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium leading-none">Status</h4>
					<Separator />
					<div className="grid grid-cols-2 gap-4">
						<DetailItem label="State">
							<StateBadge value={company.state} />
						</DetailItem>
						<DetailItem label="Risk State">
							<RiskStateBadge value={company.riskState} />
						</DetailItem>
						<DetailItem label="Transaction">
							<TransactionBadge value={company.transaction} />
						</DetailItem>
					</div>
				</div>

				{/* Additional Information */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium leading-none">
						Additional Details
					</h4>
					<Separator />
					<div className="grid grid-cols-2 gap-4">
						{Object.entries(company).map(([key, value]) => {
							// Skip already displayed fields
							if (
								[
									"firstName",
									"lastName",
									"language",
									"province",
									"brand",
									"productType",
									"state",
									"riskState",
									"transaction",
								].includes(key)
							) {
								return null;
							}
							return (
								<DetailItem
									key={key}
									label={key.replace(/([A-Z])/g, " $1").trim()}
								>
									{typeof value === "string" ? value : String(value)}
								</DetailItem>
							);
						})}
					</div>
				</div>
			</div>
		</ScrollArea>
	);
}

export const PortfolioDetails = memo(PortfolioDetailsComponent);
