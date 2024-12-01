import loadable from "@loadable/component";

export const PortfolioSidebarFilter = loadable(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return import("./filters/PortfolioSidebarFilter").then((mod) => ({
    default: mod.PortfolioSidebarFilter,
  }));
});
