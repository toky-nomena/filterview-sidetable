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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid3x3, List, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/services/data.service";

type ViewMode = "table" | "grid" | "list";

export interface PortfolioTableProps {
	data: Company[];
}

export function PortfolioTable({ data }: PortfolioTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [globalFilter, setGlobalFilter] = useState("");
	const [viewMode, setViewMode] = useState<ViewMode>("table");
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
	);

	const renderGridView = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row) => {
					const company = row.original as Company;
					return (
						<Card
							key={row.id}
							className="hover:shadow-lg transition-shadow bg-card"
						>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									<span>{`${company.firstName} ${company.lastName}`}</span>
									<Badge
										variant={company.state === "Active" ? "success" : "muted"}
									>
										{company.state}
									</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex justify-between">
									<span className="font-medium text-muted-foreground">
										Language:
									</span>
									<span>{company.language}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium text-muted-foreground">
										Brand:
									</span>
									<span>{company.brand}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium text-muted-foreground">
										Product Type:
									</span>
									<span>{company.productType}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium text-muted-foreground">
										Risk State:
									</span>
									<span>{company.riskState}</span>
								</div>
							</CardContent>
						</Card>
					);
				})
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
				table.getRowModel().rows.map((row) => {
					const company = row.original as Company;
					return (
						<Card
							key={row.id}
							className="hover:shadow-lg transition-shadow bg-card"
						>
							<CardContent className="flex items-center justify-between p-4">
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<span className="font-bold">{`${company.firstName} ${company.lastName}`}</span>
										<Badge
											variant={company.state === "Active" ? "success" : "muted"}
										>
											{company.state}
										</Badge>
									</div>
									<div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
										<span>{company.brand}</span>
										<span className="text-muted-foreground/50">•</span>
										<span>Language: {company.language}</span>
										<span className="text-muted-foreground/50">•</span>
										<span>Product: {company.productType}</span>
										<span className="text-muted-foreground/50">•</span>
										<span>Risk: {company.riskState}</span>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})
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
						onChange={setGlobalFilter}
						placeholder="Search all columns..."
					/>
				</div>
				<div className="flex items-center gap-2">
					<ColumnToggle table={table} />
					<div className="flex gap-1">
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

			<div className="bg-background rounded-lg">
				{viewMode === "table" && renderTableView()}
				{viewMode === "grid" && renderGridView()}
				{viewMode === "list" && renderListView()}
			</div>

			<Pagination
				currentPage={pagination.pageIndex + 1}
				pageSize={pagination.pageSize}
				totalItems={table.getFilteredRowModel().rows.length}
				onPageChange={(page) => table.setPageIndex(page - 1)}
				onPageSizeChange={(size) => {
					table.setPageSize(size);
					table.setPageIndex(0);
				}}
				className="ml-auto"
			/>
		</div>
	);
}
