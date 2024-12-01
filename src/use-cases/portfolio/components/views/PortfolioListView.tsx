import type { Table } from "@tanstack/react-table";
import type { Portfolio } from "../../services/portfolio.service";
import { PortfolioListItem } from "./PortfolioListItem";

interface PortfolioListViewProps {
  table: Table<Portfolio>;
}

export function PortfolioListView({ table }: PortfolioListViewProps) {
  return (
    <div className="flex flex-col gap-3">
      {table.getRowModel().rows.map((row) => (
        <PortfolioListItem
          key={row.id}
          portfolio={row.original}
          cells={row.getVisibleCells()}
        />
      ))}
    </div>
  );
}
