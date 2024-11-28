import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Company } from "@/services/data.service";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const getRiskStateColor = (riskState: string) => {
	const colors: Record<string, string> = {
		LowRisk:
			"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
		ModerateRisk:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
		HighRisk:
			"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
		CriticalRisk: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
		PendingReview:
			"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
		UnderInvestigation:
			"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
	};
	return (
		colors[riskState] ||
		"bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
	);
};

const columns: ColumnDef<Company>[] = [
	{
		accessorKey: "firstName",
		header: "First Name",
	},
	{
		accessorKey: "lastName",
		header: "Last Name",
	},
	{
		accessorKey: "language",
		header: "Language",
	},
	{
		accessorKey: "province",
		header: "Province",
	},
	{
		accessorKey: "brand",
		header: "Brand",
	},
	{
		accessorKey: "state",
		header: "State",
		cell: ({ row }) => (
			<Badge
				variant={row.original.state === "Active" ? "default" : "secondary"}
			>
				{row.original.state}
			</Badge>
		),
	},
	{
		accessorKey: "productType",
		header: "Product Type",
	},
	{
		accessorKey: "riskState",
		header: "Risk State",
		cell: ({ row }) => (
			<Badge className={getRiskStateColor(row.original.riskState)}>
				{row.original.riskState}
			</Badge>
		),
	},
	{
		accessorKey: "transaction",
		header: "Transaction",
		cell: ({ row }) => (
			<Badge
				variant={
					row.original.transaction === "Purchase" ? "default" : "destructive"
				}
			>
				{row.original.transaction}
			</Badge>
		),
	},
];

interface CompaniesTableProps {
	data: Company[];
	pageSize: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export function CompaniesTable({
	data,
	pageSize,
	currentPage,
	onPageChange,
}: CompaniesTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		pageCount: Math.ceil(data.length / pageSize),
		state: {
			pagination: {
				pageIndex: currentPage - 1,
				pageSize,
			},
		},
		onPaginationChange: (updater) => {
			if (typeof updater === "function") {
				const newState = updater({
					pageIndex: currentPage - 1,
					pageSize,
				});
				onPageChange(newState.pageIndex + 1);
			}
		},
	});

	return (
		<div className="space-y-4">
			<div className="rounded-md border dark:border-gray-700">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted dark:border-gray-700 dark:hover:bg-gray-800/50"
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-gray-400"
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
									className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted dark:border-gray-700 dark:hover:bg-gray-800/50"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="px-4 py-3 dark:text-gray-300"
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
									className="h-24 text-center dark:text-gray-400"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					{pageSize} of {data.length} total items
				</div>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={(e) => {
									e.preventDefault();
									table.previousPage();
								}}
								className={cn(
									!table.getCanPreviousPage() &&
										"pointer-events-none opacity-50",
									"dark:text-gray-300 dark:hover:bg-gray-800",
								)}
							/>
						</PaginationItem>
						{table.getPageOptions().map((index) => {
							const page = index + 1;
							const isCurrentPage = currentPage === page;
							const isFirstPage = page === 1;
							const isLastPage = page === table.getPageCount();
							const isNearCurrentPage = Math.abs(currentPage - page) <= 1;

							if (
								isFirstPage ||
								isLastPage ||
								isNearCurrentPage ||
								(isCurrentPage && (page === 1 || page === table.getPageCount()))
							) {
								return (
									<PaginationItem key={page}>
										<PaginationLink
											onClick={(e) => {
												e.preventDefault();
												onPageChange(page);
											}}
											isActive={isCurrentPage}
											className="dark:text-gray-300 dark:hover:bg-gray-800 dark:data-[active=true]:bg-gray-700"
										>
											{page}
										</PaginationLink>
									</PaginationItem>
								);
							}

							if (
								(page === 2 && currentPage > 3) ||
								(page === table.getPageCount() - 1 &&
									currentPage < table.getPageCount() - 2)
							) {
								return (
									<PaginationItem key={`ellipsis-${page}`}>
										<PaginationEllipsis />
									</PaginationItem>
								);
							}

							return null;
						})}
						<PaginationItem>
							<PaginationNext
								onClick={(e) => {
									e.preventDefault();
									table.nextPage();
								}}
								className={cn(
									!table.getCanNextPage() && "pointer-events-none opacity-50",
									"dark:text-gray-300 dark:hover:bg-gray-800",
								)}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
