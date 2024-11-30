import type { Portfolio } from "../../services/portfolio.service";
import { PortfolioListItem } from "../PortfolioListItem";

interface PortfolioListViewProps {
  data: Portfolio[];
}

export function PortfolioListView({ data }: PortfolioListViewProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((portfolio) => (
        <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
      ))}
    </div>
  );
}
