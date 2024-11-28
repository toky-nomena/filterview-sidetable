import type { Company } from "@/services/data.service";
import { provinceLabels } from "@/lib/status-labels";
import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	StateBadge,
	RiskStateBadge,
	TransactionBadge,
} from "@/components/ui/status-badge";

import { DetailsSection } from "./components/details-section";

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
		<ScrollArea className="h-[calc(100vh-8rem)] pr-4 mt-4">
			<div className="space-y-8">
				{/* Personal Information */}
				<DetailsSection title="Personal Information">
					<DetailItem label="First Name">{company.firstName}</DetailItem>
					<DetailItem label="Last Name">{company.lastName}</DetailItem>
					<DetailItem label="Language">{company.language}</DetailItem>
					<DetailItem label="Province">
						{provinceLabels[company.province] || company.province}
					</DetailItem>
				</DetailsSection>

				{/* Business Information */}
				<DetailsSection title="Business Information">
					<DetailItem label="Brand">{company.brand}</DetailItem>
					<DetailItem label="Product Type">{company.productType}</DetailItem>
				</DetailsSection>

				{/* Status Information */}
				<DetailsSection title="Status Information">
					<DetailItem label="State">
						<StateBadge value={company.state} />
					</DetailItem>
					<DetailItem label="Risk State">
						<RiskStateBadge value={company.riskState} />
					</DetailItem>
					<DetailItem label="Transaction">
						<TransactionBadge value={company.transaction} />
					</DetailItem>
				</DetailsSection>

				{/* Additional Information */}
				<DetailsSection title="Additional Details">
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
				</DetailsSection>
			</div>
		</ScrollArea>
	);
}

export const PortfolioDetails = memo(PortfolioDetailsComponent);
