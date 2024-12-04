import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import type { Cell } from "@tanstack/react-table";
import { memo } from "react";
import { PortfolioLookupBadge } from "../PortfolioLookupBadge";
import { GridListLinks } from "../actions/GridListLinks";
import { PortfolioActionsLazy } from "../actions/PortfolioActionsLazy";

interface PortfolioListItemProps {
  portfolio: Portfolio;
  cells: Cell<Portfolio, unknown>[];
}

const colors = {
  apple: "bg-primary",
  samsung: "bg-emerald-500",
  google: "bg-yellow-500",
  microsoft: "bg-red-500",
};

export function PortfolioListItemView({ portfolio }: PortfolioListItemProps) {
  return (
    <div className="transition-shadow bg-background border text-foreground rounded-lg">
      <div className="flex items-center justify-between px-4 py-1">
        <div className="flex items-center gap-2">
          <Lookup
            name={LookupName.Brand}
            code={portfolio.brand}
            fallback={<Skeleton className="h-6 w-6 rounded-full" />}
          >
            {({ label }) => (
              <div
                className={cn(
                  "flex items-center justify-center h-6 w-6 rounded-full",
                  colors[portfolio.brand],
                )}
              >
                <span className="text-sm font-medium text-white">
                  {label.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </Lookup>
          <div className="flex items-center gap-2">
            <GridListLinks portfolio={portfolio} />
            <PortfolioLookupBadge
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

export const PortfolioListItem = memo(PortfolioListItemView);
