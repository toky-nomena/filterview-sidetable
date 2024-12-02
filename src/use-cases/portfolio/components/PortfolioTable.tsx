import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";

import { usePortfolioColumns } from "../hooks/usePortfolioColumns";
import { usePaginationSearchParams } from "../usePaginationSearchParams";
import { PortfolioViewChanger } from "./PortfolioViewChanger";
import { Suspense } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { PortfolioColumnToggle } from "@/use-cases/portfolio/components/PortfolioColumnToggle";
import { Pagination } from "@/components/ui/pagination";
import {
  PortfolioGridView,
  PortfolioListView,
  PortfolioTableView,
} from "./views/PortfolioViewsLazy";
import { PortfolioTablePlaceholder } from "./placeholders/PortfolioTablePlaceholder";

interface PortfolioTableProps {
  data: Portfolio[];
}

export function PortfolioTable({ data }: PortfolioTableProps) {
  const [sorting, onSortingChange] = useState<SortingState>([]);
  const [columnVisibility, onColumnVisibilityChange] =
    useState<VisibilityState>({});
  const [globalFilter, onGlobalFilterChange] = useState("");
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsString.withDefault("table"),
  );

  const columns = usePortfolioColumns();
  const [pagination, onPaginationChange] = usePaginationSearchParams();

  useEffect(() => {
    PortfolioGridView.preload();
    PortfolioListView.preload();
    PortfolioTableView.preload();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange,
    onColumnVisibilityChange,
    onPaginationChange,
    state: {
      sorting,
      pagination,
      columnVisibility,
      globalFilter,
    },
    onGlobalFilterChange,
  });

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex-1">
              <SearchInput
                value={globalFilter}
                onChange={onGlobalFilterChange}
                placeholder="Search all columns..."
              />
            </div>
            <PortfolioColumnToggle
              table={table}
              disabled={viewMode !== "table"}
            />
          </div>
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
      <Pagination
        className="sticky bottom-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t"
        currentPage={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        totalItems={table.getFilteredRowModel().rows.length}
        onPageChange={(page) =>
          onPaginationChange({ ...pagination, pageIndex: page - 1 })
        }
        onPageSizeChange={(size) =>
          onPaginationChange({ ...pagination, pageSize: size, pageIndex: 0 })
        }
      />
    </div>
  );
}
