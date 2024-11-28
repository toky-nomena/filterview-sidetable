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
	type PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";
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

export function PortfolioTable({ data }: PortfolioTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = useState("");
	const columns = usePortfolioColumns();

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		state: {
			sorting,
			pagination,
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
				currentPage={pagination.pageIndex + 1}
				pageSize={pagination.pageSize}
				totalItems={table.getFilteredRowModel().rows.length}
				onPageChange={(page) => table.setPageIndex(page - 1)}
				onPageSizeChange={(size) => {
					table.setPageSize(size);
					table.setPageIndex(0); // Reset to first page when changing page size
				}}
				className="ml-auto"
			/>
		</div>
	);
}
