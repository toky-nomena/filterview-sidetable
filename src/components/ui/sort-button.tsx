import { Button } from "@/components/ui/button";
import type { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface SortButtonProps<TData> {
  column: Column<TData>;
  label: string;
}

export function SortButton<TData>({ column, label }: SortButtonProps<TData>) {
  const handleSort = () => {
    console.log(column.getIsSorted());
    if (column.getIsSorted() === "asc") {
      column.toggleSorting(true); // Toggle to descending
    } else if (column.getIsSorted() === "desc") {
      column.clearSorting(); // Clear sorting (unsorted state)
    } else {
      column.toggleSorting(false); // Toggle to ascending
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSort}
      className="-ml-4 hover:bg-transparent"
    >
      {label}
      {column.getIsSorted() === "asc" ? (
        <ArrowUpIcon className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDownIcon className="ml-2 h-4 w-4" />
      ) : null}
    </Button>
  );
}
