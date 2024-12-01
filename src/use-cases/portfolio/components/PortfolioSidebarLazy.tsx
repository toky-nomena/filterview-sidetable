import loadable from "@loadable/component";
import { PortfolioSidebarSkeleton } from "./filters/PortfolioSidebarSkeleton";

export const PortfolioSidebarFilter = loadable(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return import("./filters/PortfolioSidebarFilter").then((mod) => ({
      default: mod.PortfolioSidebarFilter,
    }));
  },
  {
    fallback: <PortfolioSidebarSkeleton />,
  },
);
