import { useQuery } from "@tanstack/react-query";

import { usePortfolioFilterState } from "@/use-cases/portfolio/store/portfolioFilterStore";
import { getFilteredPortfolio } from "@/use-cases/portfolio/services/portfolio.service";
import loadable from "@loadable/component";

export const PortfolioTable = loadable(() =>
  import("@/use-cases/portfolio/components/PortfolioTable").then((mod) => ({
    default: mod.PortfolioTable,
  })),
);

export const PortfolioTablePlaceholoder = loadable(() =>
  import("@/use-cases/portfolio/components/PortfolioTablePlaceholoder").then(
    (mod) => ({
      default: mod.PortfolioTablePlaceholoder,
    }),
  ),
);

export function Index() {
  const state = usePortfolioFilterState();

  // Query portfolio
  const { data = [], isLoading } = useQuery({
    queryKey: ["portfolio", state],
    queryFn: () => getFilteredPortfolio(state),
  });

  if (isLoading) {
    return <PortfolioTablePlaceholoder />;
  }

  return <PortfolioTable data={data} />;
}
