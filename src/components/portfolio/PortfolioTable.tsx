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
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export interface PortfolioTableProps {
	data: Company[];
}

function PortfolioTableComponent({ data }: PortfolioTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = usePortfolioColumns();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	});

	const { pageIndex } = table.getState().pagination;
	const totalPages = table.getPageCount();

	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
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
										<TableCell key={cell.id} className="px-4 py-1">
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

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => table.previousPage()}
							className={cn(
								"cursor-pointer",
								!table.getCanPreviousPage() && "pointer-events-none opacity-50",
							)}
						/>
					</PaginationItem>
					{Array.from({ length: totalPages }, (_, i) => {
						const page = i + 1;
						const isCurrentPage = pageIndex === i;
						const isNearCurrentPage =
							i === 0 || i === totalPages - 1 || Math.abs(pageIndex - i) <= 1;

						if (!isNearCurrentPage) {
							if (i === 1 || i === totalPages - 2) {
								return <PaginationEllipsis key={String(i)} />;
							}
							return null;
						}

						return (
							<PaginationItem key={String(i)}>
								<PaginationLink
									onClick={() => table.setPageIndex(i)}
									isActive={isCurrentPage}
									className="cursor-pointer"
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						);
					})}
					<PaginationItem>
						<PaginationNext
							onClick={() => table.nextPage()}
							className={cn(
								"cursor-pointer",
								!table.getCanNextPage() && "pointer-events-none opacity-50",
							)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

export const PortfolioTable = memo(PortfolioTableComponent);
