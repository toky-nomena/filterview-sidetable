import { useQuery } from "@tanstack/react-query";

import { useFilterState } from "@/store/filterStore";
import { getPortfolio } from "@/services/data/data.service";
import { PortfolioTable } from "@/components/portfolio/PortfolioTable";

export function Index() {
  const state = useFilterState();

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
