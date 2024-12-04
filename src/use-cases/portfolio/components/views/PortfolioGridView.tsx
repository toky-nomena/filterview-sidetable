import type { Table } from "@tanstack/react-table";
import type { Portfolio } from "../../services/portfolio.service";
import { PortfolioGridItem } from "./PortfolioGridItem";

interface PortfolioGridViewProps {
  table: Table<Portfolio>;
}

export function PortfolioGridView({ table }: PortfolioGridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {table.getRowModel().rows.map((row) => (
        <PortfolioGridItem
          key={row.id}
          portfolio={row.original}
          cells={row.getVisibleCells()}
        />
      ))}
    </div>
  );
}
