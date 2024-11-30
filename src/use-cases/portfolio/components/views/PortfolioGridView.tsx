import type { Portfolio } from "../../services/portfolio.service";
import { PortfolioGridItem } from "../PortfolioGridItem";

interface PortfolioGridViewProps {
  data: Portfolio[];
}

export function PortfolioGridView({ data }: PortfolioGridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((portfolio) => (
        <PortfolioGridItem key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  );
}
