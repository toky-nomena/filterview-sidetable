import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Lookup } from "@/use-cases/lookup/components/lookup";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { PortfolioDetailsSection } from "./PortfolioDetailsSection";
import { LookupBadge } from "./LookupBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Ellipsis } from "lucide-react";

interface PortfolioDetailsProps {
  portfolio: Portfolio;
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

export function PortfolioDetails({ portfolio }: PortfolioDetailsProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-8  px-6 pt-4">
        {/* Personal Information */}
        <PortfolioDetailsSection title="Personal Information">
          <DetailItem label="First Name">{portfolio.firstName}</DetailItem>
          <DetailItem label="Last Name">{portfolio.lastName}</DetailItem>
          <DetailItem label="Language">
            <Lookup
              name={LookupName.Language}
              code={portfolio.language}
              fallback={<Ellipsis className="w-4 h-4 text-muted-foreground" />}
            />
          </DetailItem>
          <DetailItem label="Province">
            <Lookup
              name={LookupName.Province}
              code={portfolio.province}
              fallback={<Ellipsis className="w-4 h-4 text-muted-foreground" />}
            />
          </DetailItem>
        </PortfolioDetailsSection>

        {/* Business Information */}
        <PortfolioDetailsSection title="Business Information">
          <DetailItem label="Brand">{portfolio.brand}</DetailItem>
          <DetailItem label="Product Type">{portfolio.productType}</DetailItem>
        </PortfolioDetailsSection>

        {/* Status Information */}
        <PortfolioDetailsSection title="Status Information">
          <DetailItem label="State">
            <LookupBadge lookupName="state" code={portfolio.state} />
          </DetailItem>
          <DetailItem label="Risk State">
            <LookupBadge lookupName="riskState" code={portfolio.riskState} />
          </DetailItem>
          <DetailItem label="Transaction">
            <LookupBadge
              lookupName="transaction"
              code={portfolio.transaction}
            />
          </DetailItem>
        </PortfolioDetailsSection>

        {/* Additional Information */}
        <PortfolioDetailsSection title="Additional Details">
          {Object.entries(portfolio).map(([key, value]) => {
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
