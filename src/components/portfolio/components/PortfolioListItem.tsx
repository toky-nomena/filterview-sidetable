import { Eye } from "lucide-react";

import type { Company } from "@/services/data.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LookupBadge } from "@/components/portfolio/LookupBadge";
import { PortfolioActions } from "./PortfolioActions";

interface ListItemProps {
  company: Company;
}

export function PortfolioListItem({ company }: ListItemProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-background border">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{`${company.firstName} ${company.lastName}`}</span>
            <LookupBadge type="state" value={company.state} />
          </div>
          <div className="mt-1 flex items-center gap-4 text-sm">
            <span className="text-foreground">{company.brand}</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              Language:{" "}
              <span className="text-foreground">{company.language}</span>
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              Product:{" "}
              <span className="text-foreground">{company.productType}</span>
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              Risk: <span className="text-foreground">{company.riskState}</span>
            </span>
          </div>
        </div>
        <PortfolioActions company={company}>
          <Button variant="action" size="sm" className="ml-4">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </PortfolioActions>
      </CardContent>
    </Card>
  );
}
