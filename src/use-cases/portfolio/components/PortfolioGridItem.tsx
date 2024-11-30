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
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">
            {portfolio.customerNumber} • {portfolio.businessKey}
          </span>
          <PortfolioActions portfolio={portfolio} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <LookupBadge name={LookupName.RiskState} code={portfolio.riskState} />
          <LookupBadge name={LookupName.Language} code={portfolio.language} />
          <LookupBadge name={LookupName.Brand} code={portfolio.brand} />
        </div>
      </div>
    </div>
  );
}
