import loadable from "@loadable/component";

export const PortfolioActionsLazy = loadable(() =>
  import("./PortfolioActions").then((mod) => ({
    default: mod.PortfolioActions,
  })),
);
