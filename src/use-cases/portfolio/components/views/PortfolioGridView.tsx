import type { Portfolio } from "../../services/portfolio.service";
import { PortfolioGridItem } from "../PortfolioGridItem";
import type { PaginationState } from "@tanstack/react-table";

interface PortfolioGridViewProps {
  data: Portfolio[];
}

export function PortfolioGridView({ data }: PortfolioGridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((portfolio) => (
        <PortfolioGridItem key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  );
}
