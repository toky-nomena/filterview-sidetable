import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { PortfolioDetails } from "./PortfolioDetails";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface PortfolioActionsProps {
  portfolio: Portfolio;
}

export function PortfolioActions({ portfolio }: PortfolioActionsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ChevronRight className="h-8 w-8 text-lg" size={64} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 m-0">
        <SheetHeader className="py-4 pl-4 border-b align-right flex justify-between">
          <SheetTitle>Portfolio Details</SheetTitle>
        </SheetHeader>
        <PortfolioDetails portfolio={portfolio} />
      </SheetContent>
    </Sheet>
  );
}
