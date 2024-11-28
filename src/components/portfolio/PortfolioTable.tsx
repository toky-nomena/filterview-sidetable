import type { Company } from "@/services/data.service";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useState, memo } from "react";
import { cn } from "@/lib/utils";
import { usePortfolioColumns } from "./hooks/use-portfolio-columns";
import { Pagination } from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PortfolioActions } from "./components/portfolio-actions";

export interface PortfolioTableProps {
	data: Company[];
}

function PortfolioTableComponent({ data }: PortfolioTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pageSize, setPageSize] = useState(20);
	const columns = usePortfolioColumns();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageSize,
			},
			sorting,
		},
		onSortingChange: setSorting,
	});

	const { pageIndex } = table.getState().pagination;
	const totalPages = table.getPageCount();

	return (
		<div className="space-y-2">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="px-4">
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
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="px-4 py-0">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
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
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between">
				<Pagination
					currentPage={table.getState().pagination.pageIndex + 1}
					pageSize={pageSize}
					totalItems={data.length}
					onPageChange={(page) => table.setPageIndex(page - 1)}
					onPageSizeChange={(size) => {
						setPageSize(size);
						table.setPageSize(size);
					}}
					className="ml-auto"
				/>
			</div>
		</div>
	);
}

const PortfolioTable = memo(PortfolioTableComponent);
PortfolioTable.displayName = "PortfolioTable";

export { PortfolioTable };
