import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { LookupBadge } from "./LookupBadge";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import { Skeleton } from "@/components/ui/skeleton";
import { PortfolioActionsLazy } from "./actions/PortfolioActionsLazy";

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

export function PortfolioListItem({ portfolio }: PortfolioListItemProps) {
  return (
    <div className="hover:shadow-lg transition-shadow bg-background border text-foreground rounded-lg">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Lookup
            name={LookupName.Brand}
            code={portfolio.brand}
            fallback={<Skeleton className="h-8 w-8 rounded-full" />}
          >
            {({ label }) => (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-medium text-primary-foreground">
                  {label.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </Lookup>
          <div className="flex items-center gap-2">
            <div className="font-medium">
              {portfolio.customerNumber} • {portfolio.businessKey}
            </div>
            <LookupBadge
              name={LookupName.RiskState}
              code={portfolio.riskState}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Lookup name={LookupName.Language} code={portfolio.language} />
          <span> • {portfolio.creationDate}</span>
          <PortfolioActionsLazy portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}
