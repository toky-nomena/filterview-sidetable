import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { PortfolioDetails } from "./PortfolioDetails";

interface PortfolioActionsProps {
  company: Portfolio;
  children?: React.ReactNode;
}

export function PortfolioActions({ company, children }: PortfolioActionsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 m-0">
        <SheetHeader className="py-4 pl-4 border-b align-middle flex justify-between">
          <SheetTitle>Portfolio Details</SheetTitle>
        </SheetHeader>
        <PortfolioDetails portfolio={company} />
      </SheetContent>
    </Sheet>
  );
}
