import { Button } from "@/components/ui/button";
import type { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface SortButtonProps<TData> {
	column: Column<TData>;
	label: string;
}

export function SortButton<TData>({ column, label }: SortButtonProps<TData>) {
	const handleSort = () => {
		const currentSort = column.getIsSorted();
		if (currentSort === false) {
			column.toggleSorting(false); // Set to ascending
		} else if (currentSort === "asc") {
			column.toggleSorting(true); // Set to descending
		} else {
			column.clearSorting();
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
