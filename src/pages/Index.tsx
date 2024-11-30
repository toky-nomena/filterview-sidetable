import { useQuery } from "@tanstack/react-query";

import { usePortfolioFilterState } from "@/use-cases/portfolio/store/portfolioFilterStore";
import { getFilteredPortfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { PortfolioTable } from "@/use-cases/portfolio/components/PortfolioTable";
import { PortfolioTableSkeleton } from "@/use-cases/portfolio/components/PortfolioTableSkeleton";

export function Index() {
  const state = usePortfolioFilterState();

  // Query portfolio
  const { data = [], isLoading } = useQuery({
    queryKey: ["portfolio", state],
    queryFn: () => getFilteredPortfolio(state),
  });

  if (isLoading) {
    return <PortfolioTableSkeleton />;
  }

  return <PortfolioTable data={data} />;
}
