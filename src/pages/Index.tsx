import { useQuery } from "@tanstack/react-query";

import {
  type FilterState,
  usePortfolioFilterState,
} from "@/use-cases/portfolio/store/portfolioFilterStore";
import { getFilteredPortfolio } from "@/use-cases/portfolio/services/portfolio.service";
import loadable from "@loadable/component";
import { useSearchParams } from "react-router-dom";

export const PortfolioTable = loadable(() =>
  import("@/use-cases/portfolio/components/PortfolioTable").then((mod) => ({
    default: mod.PortfolioTable,
  })),
);

export const PortfolioTablePlaceholoder = loadable(() =>
  import(
    "@/use-cases/portfolio/components/placeholders/PortfolioTablePlaceholder"
  ).then((mod) => ({
    default: mod.PortfolioTablePlaceholder,
  })),
);

function getPortfolioQueryKey(state: FilterState) {
  const searchParams = new URLSearchParams(window.location.search);
  return ["portfolio", state, searchParams.get("policyType") || "minimum"];
}

function usePortfolioQuery() {
  const state = usePortfolioFilterState();
  return useQuery({
    queryKey: getPortfolioQueryKey(state),
    queryFn: () => getFilteredPortfolio(state),
  });
}

export function Index() {
  // Query portfolio
  const { data = [], isLoading } = usePortfolioQuery();

  if (isLoading) {
    return <PortfolioTablePlaceholoder />;
  }

  return <PortfolioTable data={data} />;
}
