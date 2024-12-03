import loadable from "@loadable/component";
import { usePortfolioQuery } from "@/use-cases/portfolio/hooks/usePortfolioQuery";

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

export function Index() {
  // Query portfolio
  const { data = [], isLoading } = usePortfolioQuery();

  if (isLoading) {
    return <PortfolioTablePlaceholoder />;
  }

  return <PortfolioTable data={data} />;
}
