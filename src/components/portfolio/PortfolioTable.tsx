import type { Company } from "@/services/data.service";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	type SortingState,
	type VisibilityState,
	useReactTable,
} from "@tanstack/react-table";
import { useState, memo } from "react";
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
import { ColumnToggle } from "@/components/ui/column-toggle";
import { SearchInput } from "@/components/ui/search-input";

export interface PortfolioTableProps {
	data: Company[];
}

function PortfolioTableComponent({ data }: PortfolioTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pageSize, setPageSize] = useState(20);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = useState("");
	const columns = usePortfolioColumns();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			pagination: {
				pageSize,
				pageIndex: 0,
			},
			columnVisibility,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
	});

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between gap-4">
				<div className="flex-1">
					<SearchInput
						value={globalFilter}
						onChange={setGlobalFilter}
						placeholder="Search all columns..."
					/>
				</div>
				<ColumnToggle table={table} />
			</div>
			<div className="rounded-md border">
				<div className="overflow-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="px-4 whitespace-nowrap"
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
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="px-4 py-0 whitespace-nowrap"
											>
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
			</div>
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
	);
}

export const PortfolioTable = memo(PortfolioTableComponent);
