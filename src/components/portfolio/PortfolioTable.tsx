import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { parseAsString, useQueryState } from "nuqs";

import { usePortfolioColumns } from "./hooks/usePortfolioColumns";
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
import { Grid3x3, List, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Company } from "@/services/data.service";
import { PortfolioGridItem } from "./components/PortfolioGridItem";
import { PortfolioListItem } from "./components/PortfolioListItem";
import { usePaginationSearchParams } from "./usePaginationSearchParams";

interface PortfolioTableProps {
	data: Company[];
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

	const renderTableView = () => (
		<div className="rounded-md border">
			<div className="overflow-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="px-4 whitespace-nowrap">
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
											className="px-4 py-1 whitespace-nowrap"
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
	);

	const renderGridView = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{table.getRowModel().rows?.length ? (
				table
					.getRowModel()
					.rows.map((row) => (
						<PortfolioGridItem key={row.id} company={row.original as Company} />
					))
			) : (
				<div className="col-span-full text-center text-muted-foreground">
					No results.
				</div>
			)}
		</div>
	);

	const renderListView = () => (
		<div className="space-y-2">
			{table.getRowModel().rows?.length ? (
				table
					.getRowModel()
					.rows.map((row) => (
						<PortfolioListItem key={row.id} company={row.original as Company} />
					))
			) : (
				<div className="text-center text-muted-foreground">No results.</div>
			)}
		</div>
	);

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
							variant={viewMode === "table" ? "default" : "outline"}
							size="icon"
							onClick={() => setViewMode("table")}
						>
							<TableIcon className="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === "grid" ? "default" : "outline"}
							size="icon"
							onClick={() => setViewMode("grid")}
						>
							<Grid3x3 className="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "outline"}
							size="icon"
							onClick={() => setViewMode("list")}
						>
							<List className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			<div className="rounded-md border bg-background">
				{viewMode === "table" && renderTableView()}
				{viewMode === "grid" && renderGridView()}
				{viewMode === "list" && renderListView()}
			</div>

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
