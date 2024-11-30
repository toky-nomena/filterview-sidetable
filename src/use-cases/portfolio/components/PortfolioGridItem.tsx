import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PortfolioActions } from "./PortfolioActions";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { LookupBadge } from "./LookupBadge";
import { Skeleton } from "@/components/ui/skeleton";

interface GridItemProps {
  portfolio: Portfolio;
}

export function PortfolioGridItem({ portfolio }: GridItemProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-background border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>{`${portfolio.firstName} ${portfolio.lastName}`}</span>
          <LookupBadge lookupName="state" code={portfolio.state} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Language:</span>
          <span className="text-foreground">
            <Lookup
              name={LookupName.Language}
              code={portfolio.language}
              fallback={<Skeleton className="h-5 w-16 rounded-full" />}
            />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Brand:</span>
          <span className="text-foreground">
            <Lookup
              name={LookupName.Brand}
              code={portfolio.brand}
              fallback={<Skeleton className="h-5 w-16 rounded-full" />}
            />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">
            Product Type:
          </span>
          <span className="text-foreground">
            <Lookup
              name={LookupName.ProductType}
              code={portfolio.productType}
              fallback={<Skeleton className="h-5 w-16 rounded-full" />}
            />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Risk State:</span>
          <span className="text-foreground">
            <LookupBadge code={portfolio.riskState} lookupName="risk-state" />
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <PortfolioActions company={portfolio}>
          <Button variant="action" size="sm" className="ml-auto">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </PortfolioActions>
      </CardFooter>
    </Card>
  );
}
