import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";

interface PortfolioDetailsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PortfolioDetailsSection({
  title,
  children,
  className,
}: PortfolioDetailsSectionProps) {
  return (
    <div className={className}>
      <h4 className="text-md font-medium leading-none">{title}</h4>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
