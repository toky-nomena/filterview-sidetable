import { Eye } from "lucide-react";

import type { Portfolio } from "@/services/data/data.service";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LookupBadge } from "@/components/portfolio/LookupBadge";
import { PortfolioActions } from "./PortfolioActions";
import { Lookup } from "@/components/lookup/lookup";

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
            <Lookup name="language" code={portfolio.language} fallback="..." />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Brand:</span>
          <span className="text-foreground">
            <Lookup name="brand" code={portfolio.brand} fallback="..." />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">
            Product Type:
          </span>
          <span className="text-foreground">
            <Lookup
              name="productType"
              code={portfolio.productType}
              fallback="..."
            />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Risk State:</span>
          <span className="text-foreground">
            <LookupBadge code={portfolio.riskState} lookupName="riskState" />
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
