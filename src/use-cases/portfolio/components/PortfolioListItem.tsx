import { Eye } from "lucide-react";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortfolioActions } from "./PortfolioActions";
import { LookupBadge } from "./LookupBadge";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { Skeleton } from "@/components/ui/skeleton";

interface ListItemProps {
  portfolio: Portfolio;
}

export function PortfolioListItem({ portfolio }: ListItemProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-background border">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{`${portfolio.firstName} ${portfolio.lastName}`}</span>
            <LookupBadge lookupName={LookupName.State} code={portfolio.state} />
          </div>
          <div className="mt-1 flex items-center gap-4 text-sm">
            <Lookup
              name={LookupName.Brand}
              code={portfolio.brand}
              fallback={<Skeleton className="h-5 w-16 rounded-full" />}
            />
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              <Lookup
                name={LookupName.Language}
                code={portfolio.language}
                fallback={<Skeleton className="h-5 w-16 rounded-full" />}
              >
                {({ label }) => <>Language: {label}</>}
              </Lookup>
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              <Lookup
                name={LookupName.ProductType}
                code={portfolio.productType}
                fallback={<Skeleton className="h-5 w-16 rounded-full" />}
              >
                {({ label }) => <>Product: {label}</>}
              </Lookup>
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              <Lookup
                name={LookupName.RiskState}
                code={portfolio.riskState}
                fallback={<Skeleton className="h-5 w-16 rounded-full" />}
              >
                {({ label }) => <>Risk: {label}</>}
              </Lookup>
            </span>
          </div>
        </div>
        <PortfolioActions company={portfolio}>
          <Button variant="action" size="sm" className="ml-4">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </PortfolioActions>
      </CardContent>
    </Card>
  );
}
