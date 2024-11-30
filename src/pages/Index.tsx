import { useQuery } from "@tanstack/react-query";

import { usePortfolioFilterState } from "@/use-cases/portfolio/store/portfolioFilterStore";
import { getPortfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { PortfolioTable } from "@/use-cases/portfolio/components/PortfolioTable";

export function Index() {
  const state = usePortfolioFilterState();

  // Query portfolio
  const { data = [], isLoading } = useQuery({
    queryKey: ["portfolio", state],
    queryFn: () => getPortfolio(state),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <PortfolioTable data={data} />;
}
