import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { ChevronRight } from "lucide-react";
import { PortfolioDetails } from "../PortfolioDetails";

interface PortfolioActionsProps {
  portfolio: Portfolio;
}

export function PortfolioActions({ portfolio }: PortfolioActionsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="rounded-full" size="icon">
          <ChevronRight className="size-10" />
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
