import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";

import { usePortfolioColumns } from "../hooks/usePortfolioColumns";
import { PortfolioViewChanger } from "./PortfolioViewChanger";
import { Suspense } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { PortfolioColumnToggle } from "@/use-cases/portfolio/components/PortfolioColumnToggle";
import {
  PortfolioGridView,
  PortfolioListView,
  PortfolioTableView,
} from "./views/PortfolioViewsLazy";
import { PortfolioTablePlaceholder } from "./placeholders/PortfolioTablePlaceholder";
import { Button } from "@/components/ui/button";

interface PortfolioTableProps {
  data: Portfolio[];
  totalItems: number;
}

export function PortfolioTable({ data, totalItems }: PortfolioTableProps) {
  const [, startTransition] = useTransition();
  const [sorting, onSortingChange] = useState<SortingState>([]);
  const [columnVisibility, onColumnVisibilityChange] =
    useState<VisibilityState>({});
  const [globalFilter, onGlobalFilterChange] = useState("");
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsStringEnum(["table", "grid", "list"])
      .withDefault("table")
      .withOptions({ clearOnDefault: false }),
  );

  const columns = usePortfolioColumns();

  useEffect(() => {
    PortfolioGridView.preload();
    PortfolioListView.preload();
    PortfolioTableView.preload();
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
    onSortingChange,
    onColumnVisibilityChange,
    onGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="sticky top-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex-1">
              <SearchInput
                value={globalFilter}
                onChange={(value) => {
                  startTransition(() => {
                    onGlobalFilterChange(value);
                  });
                }}
                placeholder="Search all columns..."
              />
            </div>
            <PortfolioColumnToggle
              table={table}
              disabled={viewMode !== "table"}
            />
          </div>
          <Button>Total: {totalItems}</Button>
          <PortfolioViewChanger viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      <div className="flex-1 overflow-x-scroll p-4">
        <Suspense fallback={<PortfolioTablePlaceholder />}>
          {viewMode === "table" && <PortfolioTableView table={table} />}
          {viewMode === "grid" && <PortfolioGridView table={table} />}
          {viewMode === "list" && <PortfolioListView table={table} />}
        </Suspense>
      </div>
    </>
  );
}
