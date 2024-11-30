import loadable from "@loadable/component";

import { TablePlaceholders } from "../placeholders/list/TablePlaceholders";
import { GridPlaceholders } from "../placeholders/list/GridPlaceholders";
import { ListPlaceholders } from "../placeholders/list/ListPlaceholders";

export const PortfolioTableView = loadable(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return import("./PortfolioTableView").then((mod) => ({
      default: mod.PortfolioTableView,
    }));
  },
  {
    fallback: <TablePlaceholders />,
  },
);

export const PortfolioGridView = loadable(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return import("./PortfolioGridView").then((mod) => ({
      default: mod.PortfolioGridView,
    }));
  },
  {
    fallback: <GridPlaceholders />,
  },
);

export const PortfolioListView = loadable(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return import("./PortfolioListView").then((mod) => ({
      default: mod.PortfolioListView,
    }));
  },
  {
    fallback: <ListPlaceholders />,
  },
);
