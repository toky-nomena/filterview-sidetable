import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Lookup } from "@/use-cases/lookup/components/lookup";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { PortfolioDetailsSection } from "./PortfolioDetailsSection";
import { LookupBadge } from "./LookupBadge";

interface PortfolioDetailsProps {
  company: Portfolio;
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
        <PortfolioDetailsSection title="Personal Information">
          <DetailItem label="First Name">{company.firstName}</DetailItem>
          <DetailItem label="Last Name">{company.lastName}</DetailItem>
          <DetailItem label="Language">
            <Lookup
              name={LookupName.Language}
              code={company.language}
              fallback="..."
            />
          </DetailItem>
          <DetailItem label="Province">
            <Lookup
              name={LookupName.Province}
              code={company.province}
              fallback="..."
            />
          </DetailItem>
        </PortfolioDetailsSection>

        {/* Business Information */}
        <PortfolioDetailsSection title="Business Information">
          <DetailItem label="Brand">{company.brand}</DetailItem>
          <DetailItem label="Product Type">{company.productType}</DetailItem>
        </PortfolioDetailsSection>

        {/* Status Information */}
        <PortfolioDetailsSection title="Status Information">
          <DetailItem label="State">
            <LookupBadge lookupName="state" code={company.state} />
          </DetailItem>
          <DetailItem label="Risk State">
            <LookupBadge lookupName="riskState" code={company.riskState} />
          </DetailItem>
          <DetailItem label="Transaction">
            <LookupBadge lookupName="transaction" code={company.transaction} />
          </DetailItem>
        </PortfolioDetailsSection>

        {/* Additional Information */}
        <PortfolioDetailsSection title="Additional Details">
          {Object.entries(company).map(([key, value]) => {
            return (
              <DetailItem
                key={key}
                label={key.replace(/([A-Z])/g, " $1").trim()}
              >
                {typeof value === "string" ? value : String(value)}
              </DetailItem>
            );
          })}
        </PortfolioDetailsSection>
      </div>
    </ScrollArea>
  );
}

export const PortfolioDetails = memo(PortfolioDetailsComponent);
