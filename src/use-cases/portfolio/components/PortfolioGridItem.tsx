import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { LookupBadge } from "./LookupBadge";
import { PortfolioActionsLazy } from "./actions/PortfolioActionsLazy";
import { GridListLinks } from "./actions/GridListLinks";

interface PortfolioGridItemProps {
  portfolio: Portfolio;
}

export function PortfolioGridItem({ portfolio }: PortfolioGridItemProps) {
  return (
    <div className="group flex flex-row justify-between items-center relative rounded-lg border bg-background p-4 transition-colors">
      <div className="flex flex-col gap-2">
        <GridListLinks portfolio={portfolio} />

        <div className="flex flex-wrap items-center gap-2">
          <LookupBadge name={LookupName.RiskState} code={portfolio.riskState} />
          <LookupBadge name={LookupName.Language} code={portfolio.language} />
          <LookupBadge name={LookupName.Brand} code={portfolio.brand} />
        </div>
      </div>
      <PortfolioActionsLazy portfolio={portfolio} />
    </div>
  );
}
