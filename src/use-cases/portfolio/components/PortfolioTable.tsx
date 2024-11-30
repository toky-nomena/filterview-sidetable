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
import { Grid3x3, List, Table as TableIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";

import { Button } from "@/components/ui/button";
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
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 bg-background">
        <div className="flex-1">
          <SearchInput
            value={globalFilter}
            onChange={onGlobalFilterChange}
            placeholder="Search all columns..."
          />
        </div>
        <div className="flex items-center gap-2">
          <ColumnToggle table={table} />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-accent" : ""}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent" : ""}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "table" && (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <div className="rounded-md border">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="whitespace-nowrap"
                          >
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
                    <AnimatePresence>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, index) => (
                          <motion.tr
                            key={row.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.25, 0.1, 0.25, 1.0],
                            }}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className="whitespace-nowrap px-4 py-1"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </motion.tr>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {table.getRowModel().rows.map((row, index) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.02,
                  }}
                >
                  <PortfolioGridItem portfolio={row.original} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {viewMode === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-4"
          >
            <AnimatePresence>
              {table.getRowModel().rows.map((row, index) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.02,
                  }}
                >
                  <PortfolioListItem portfolio={row.original} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

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
  );
}
