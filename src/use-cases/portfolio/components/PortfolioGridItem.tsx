import { ChevronRight, Eye, Link2 } from "lucide-react";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { LookupBadge } from "./LookupBadge";
import { PortfolioActions } from "./PortfolioActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PortfolioGridItemProps {
  portfolio: Portfolio;
}

export function PortfolioGridItem({ portfolio }: PortfolioGridItemProps) {
  return (
    <div className="group relative rounded-lg border bg-background p-4 transition-colors hover:shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xs font-medium">
                    {portfolio.firstName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{`${portfolio.firstName} ${portfolio.lastName}`}</span>
              </div>
            </div>
          </div>
          <PortfolioActions portfolio={portfolio} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <LookupBadge
            lookupName={LookupName.RiskState}
            code={portfolio.riskState}
          />
          <LookupBadge
            lookupName={LookupName.Language}
            code={portfolio.language}
          />
          <LookupBadge lookupName={LookupName.Brand} code={portfolio.brand} />
        </div>
      </div>
    </div>
  );
}
