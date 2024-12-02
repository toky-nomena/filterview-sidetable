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
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

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
  const [isPending, startTransition] = useTransition();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsString.withDefault("table"),
  );

  const columns = usePortfolioColumns();
  const [pagination, setPagination] = usePaginationSearchParams();

  // Preload views
  useEffect(() => {
    PortfolioGridView.preload();
    PortfolioListView.preload();
    PortfolioTableView.preload();
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleSortingChange = useCallback((newSorting: SortingState) => {
    startTransition(() => {
      setSorting(newSorting);
    });
  }, []);

  const handleColumnVisibilityChange = useCallback(
    (newVisibility: VisibilityState) => {
      startTransition(() => {
        setColumnVisibility(newVisibility);
      });
    },
    [],
  );

  const handleGlobalFilterChange = useCallback((value: string) => {
    startTransition(() => {
      setGlobalFilter(value);
    });
  }, []);

  const handlePaginationChange = useCallback(
    (newPagination: typeof pagination) => {
      startTransition(() => {
        setPagination(newPagination);
      });
    },
    [setPagination],
  );

  const handleViewModeChange = useCallback(
    (mode: "table" | "grid" | "list") => {
      startTransition(() => {
        setViewMode(mode);
      });
    },
    [setViewMode],
  );

  // Memoize table instance to prevent unnecessary re-renders
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: handleSortingChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onPaginationChange: handlePaginationChange,
    onGlobalFilterChange: handleGlobalFilterChange,
    state: {
      sorting,
      pagination,
      columnVisibility,
      globalFilter,
    },
  });

  // Memoize view content to prevent flashing during transitions
  const viewContent = useMemo(() => {
    if (viewMode === "table") {
      return <PortfolioTableView table={table} />;
    }
    if (viewMode === "grid") {
      return <PortfolioGridView table={table} />;
    }
    return <PortfolioListView table={table} />;
  }, [viewMode, table]);

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex-1">
              <SearchInput
                value={globalFilter}
                onChange={handleGlobalFilterChange}
                placeholder="Search all columns..."
              />
            </div>
            <PortfolioColumnToggle
              table={table}
              disabled={viewMode !== "table"}
            />
          </div>
          <PortfolioViewChanger
            viewMode={viewMode}
            setViewMode={handleViewModeChange}
            disabled={isPending}
          />
        </div>
      </div>
      <div className="flex-1 overflow-x-scroll p-4">
        <Suspense fallback={<PortfolioTablePlaceholder />}>
          {viewContent}
        </Suspense>
      </div>
      <Pagination
        className="sticky bottom-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t"
        currentPage={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        totalItems={table.getFilteredRowModel().rows.length}
        onPageChange={(page) =>
          handlePaginationChange({ ...pagination, pageIndex: page - 1 })
        }
        onPageSizeChange={(size) =>
          handlePaginationChange({
            ...pagination,
            pageSize: size,
            pageIndex: 0,
          })
        }
      />
    </div>
  );
}
