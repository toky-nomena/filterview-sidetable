import { parseAsString, useQueryState } from "nuqs";

import { TablePlaceholders } from "./list/TablePlaceholders";
import { ListPlaceholders } from "./list/ListPlaceholders";
import { GridPlaceholders } from "./list/GridPlaceholders";
import { HeaderPlaceholder } from "./list/HeaderPlaceholder";
import { FooterPlaceholder } from "./list/FooterPlaceholder";

export function PortfolioTablePlaceholder() {
  const [viewMode] = useQueryState("view", parseAsString.withDefault("table"));

  return (
    <div className="flex h-full flex-col">
      <HeaderPlaceholder />
      <div className="flex-1 overflow-auto px-4">
        {viewMode === "table" && <TablePlaceholders />}
        {viewMode === "grid" && <GridPlaceholders />}
        {viewMode === "list" && <ListPlaceholders />}
      </div>
      <FooterPlaceholder />
    </div>
  );
}
