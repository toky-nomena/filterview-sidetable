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
import { useState } from "react";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";

import { usePortfolioColumns } from "../hooks/usePortfolioColumns";
import { usePaginationSearchParams } from "../usePaginationSearchParams";
import { PortfolioViewChanger } from "./PortfolioViewChanger";
import loadable from "@loadable/component";
import { Suspense } from "react";
import { PortfolioTablePlaceholoder } from "./PortfolioTablePlaceholoder";
import { SearchInput } from "@/components/ui/search-input";
import { ColumnToggle } from "@/components/ui/column-toggle";
import { Pagination } from "@/components/ui/pagination";

const PortfolioTableView = loadable(
  () =>
    import("./views/PortfolioTableView").then((mod) => ({
      default: mod.PortfolioTableView,
    })),
  {
    fallback: <PortfolioTablePlaceholoder />,
  },
);

const PortfolioGridView = loadable(
  () =>
    import("./views/PortfolioGridView").then((mod) => ({
      default: mod.PortfolioGridView,
    })),
  {
    fallback: <PortfolioTablePlaceholoder />,
  },
);

const PortfolioListView = loadable(
  () =>
    import("./views/PortfolioListView").then((mod) => ({
      default: mod.PortfolioListView,
    })),
  {
    fallback: <PortfolioTablePlaceholoder />,
  },
);

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
      <div className="sticky top-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex-1">
              <SearchInput
                value={globalFilter}
                onChange={onGlobalFilterChange}
                placeholder="Search all columns..."
              />
            </div>
            <ColumnToggle table={table} />
          </div>
          <PortfolioViewChanger viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      <div className="flex-1 overflow-x-scroll px-4">
        <Suspense fallback={<PortfolioTablePlaceholoder />}>
          {viewMode === "table" && <PortfolioTableView table={table} />}
          {viewMode === "grid" && <PortfolioGridView data={data} />}
          {viewMode === "list" && <PortfolioListView data={data} />}
        </Suspense>
      </div>

      <div className="sticky bottom-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Pagination
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
    </div>
  );
}
