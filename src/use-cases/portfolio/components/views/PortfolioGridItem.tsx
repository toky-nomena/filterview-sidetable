import { LookupName } from "@/use-cases/lookup/lookup.service";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import type { Cell } from "@tanstack/react-table";
import { memo } from "react";
import { PortfolioLookupBadge } from "../PortfolioLookupBadge";
import { GridListLinks } from "../actions/GridListLinks";
import { PortfolioActionsLazy } from "../actions/PortfolioActionsLazy";

interface PortfolioGridItemProps {
  portfolio: Portfolio;
  cells: Cell<Portfolio, unknown>[];
}

export function PortfolioGridItemView({ portfolio }: PortfolioGridItemProps) {
  return (
    <div className="group flex flex-row justify-between items-center relative rounded-lg border bg-background p-4 transition-colors">
      <div className="flex flex-col gap-2">
        <GridListLinks portfolio={portfolio} />
        <div className="flex flex-wrap items-center gap-2">
          <PortfolioLookupBadge
            name={LookupName.RiskState}
            code={portfolio.riskState}
          />
          <PortfolioLookupBadge
            name={LookupName.Language}
            code={portfolio.language}
          />
          <PortfolioLookupBadge
            name={LookupName.Brand}
            code={portfolio.brand}
          />
        </div>
      </div>
      <PortfolioActionsLazy portfolio={portfolio} />
    </div>
  );
}

export const PortfolioGridItem = memo(PortfolioGridItemView);
