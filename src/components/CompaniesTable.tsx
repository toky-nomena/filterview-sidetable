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
} from "@/components/ui/pagination";

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
	pageCount: number;
	pageSize: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export function CompaniesTable({
	data,
	pageCount,
	currentPage,
	pageSize,
	onPageChange,
}: CompaniesTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			pagination: {
				pageIndex: currentPage - 1,
				pageSize,
			},
		},
	});

	return (
		<div className="space-y-4">
			<h2>{data.length}</h2>
			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="py-2.5">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => onPageChange(currentPage - 1)}
							className={
								currentPage === 1 ? "pointer-events-none opacity-50" : ""
							}
						/>
					</PaginationItem>
					{Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								onClick={() => onPageChange(page)}
								isActive={currentPage === page}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem>
						<PaginationNext
							onClick={() => onPageChange(currentPage + 1)}
							className={
								currentPage === pageCount
									? "pointer-events-none opacity-50"
									: ""
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
