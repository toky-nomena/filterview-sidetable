import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useId } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { motion } from "motion/react";
import { PortfolioGridItemSkeleton } from "./PortfolioGridItemSkeleton";
import { PortfolioListItemSkeleton } from "./PortfolioListItemSkeleton";

export function PortfolioTableSkeleton() {
  const id = useId();
  const [viewMode] = useQueryState(
    "view",
    parseAsString.withDefault("table"),
  );

  const headerContent = (
    <div className="flex items-center justify-between gap-4 bg-background">
      <div className="flex-1">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  );

  const tableContent = (
    <motion.div
      key="table"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <div className="rounded-md border">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: 8 }).map((_, index) => (
                  <TableHead key={`${id}head-${String(index)}`}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <TableRow key={`${id}row-${String(rowIndex)}`}>
                  {Array.from({ length: 8 }).map((_, cellIndex) => (
                    <TableCell key={`${id}cell-${String(cellIndex)}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );

  const gridContent = (
    <motion.div
      key="grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <PortfolioGridItemSkeleton key={`${id}grid-${String(index)}`} />
      ))}
    </motion.div>
  );

  const listContent = (
    <motion.div
      key="list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <PortfolioListItemSkeleton key={`${id}list-${String(index)}`} />
      ))}
    </motion.div>
  );

  return (
    <div className="space-y-2">
      {headerContent}
      {viewMode === "table" && tableContent}
      {viewMode === "grid" && gridContent}
      {viewMode === "list" && listContent}
    </div>
  );
}
