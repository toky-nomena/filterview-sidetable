import { Eye } from "lucide-react";

import type { Company } from "@/services/data.service";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { PortfolioActions } from "./PortfolioActions";

interface GridItemProps {
  company: Company;
}

export function PortfolioGridItem({ company }: GridItemProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-background border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>{`${company.firstName} ${company.lastName}`}</span>
          <StatusBadge type="state" value={company.state} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Language:</span>
          <span className="text-foreground">{company.language}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Brand:</span>
          <span className="text-foreground">{company.brand}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">
            Product Type:
          </span>
          <span className="text-foreground">{company.productType}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Risk State:</span>
          <span className="text-foreground">{company.riskState}</span>
        </div>
      </CardContent>
      <CardFooter>
        <PortfolioActions company={company}>
          <Button variant="action" size="sm" className="ml-auto">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </PortfolioActions>
      </CardFooter>
    </Card>
  );
}
