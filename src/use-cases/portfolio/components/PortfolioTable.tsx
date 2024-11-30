import {
  flexRender,
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

import { ColumnToggle } from "@/components/ui/column-toggle";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePortfolioColumns } from "../hooks/usePortfolioColumns";
import { usePaginationSearchParams } from "../usePaginationSearchParams";
import { PortfolioGridItem } from "./PortfolioGridItem";
import { PortfolioListItem } from "./PortfolioListItem";
import { PortfolioViewChanger } from "./PortfolioViewChanger";

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
        {viewMode === "table" && (
          <div className="flex w-full flex-col relative border rounded-lg">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap py-1"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {table.getRowModel().rows.map((row) => (
              <PortfolioGridItem key={row.id} portfolio={row.original} />
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="flex flex-col gap-3">
            {table.getRowModel().rows.map((row) => (
              <PortfolioListItem key={row.id} portfolio={row.original} />
            ))}
          </div>
        )}
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
