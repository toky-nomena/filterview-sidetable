import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Portfolio } from "@/services/data/data.service";
import { PortfolioDetails } from "../PortfolioDetails";

interface PortfolioActionsProps {
  company: Portfolio;
  children?: React.ReactNode;
}

export function PortfolioActions({ company, children }: PortfolioActionsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Portfolio Details</SheetTitle>
        </SheetHeader>
        <PortfolioDetails company={company} />
      </SheetContent>
    </Sheet>
  );
}
