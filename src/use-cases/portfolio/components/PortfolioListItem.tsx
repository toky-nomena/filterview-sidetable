import { ChevronRight, Eye } from "lucide-react";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LookupBadge } from "./LookupBadge";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { PortfolioActions } from "./PortfolioActions";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import { Skeleton } from "@/components/ui/skeleton";

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
          <PortfolioActions portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}
