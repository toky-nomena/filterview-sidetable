import type { Company } from "@/services/data.service";
import type { ColumnDef } from "@tanstack/react-table";
import { provinceLabels } from "@/lib/status-labels";
import { PortfolioActions } from "../components/portfolio-actions";
import { useMemo } from "react";
import { SortButton } from "@/components/ui/sort-button";
import { TooltipCell } from "@/components/ui/tooltip-cell";
import {
	RiskStateBadge,
	StateBadge,
	TransactionBadge,
} from "@/components/ui/status-badge";

export function usePortfolioColumns() {
	return useMemo<ColumnDef<Company>[]>(
		() => [
			{
				accessorKey: "firstName",
				header: ({ column }) => (
					<SortButton column={column} label="First Name" />
				),
			},
			{
				accessorKey: "lastName",
				header: ({ column }) => (
					<SortButton column={column} label="Last Name" />
				),
			},
			{
				accessorKey: "language",
				header: ({ column }) => <SortButton column={column} label="Language" />,
			},
			{
				accessorKey: "province",
				header: ({ column }) => <SortButton column={column} label="Province" />,
				cell: ({ row }) => <span>{row.original.province}</span>,
			},
			{
				accessorKey: "brand",
				header: ({ column }) => <SortButton column={column} label="Brand" />,
			},
			{
				accessorKey: "state",
				header: ({ column }) => <SortButton column={column} label="State" />,
				cell: ({ row }) => <StateBadge value={row.original.state} />,
			},
			{
				accessorKey: "productType",
				header: ({ column }) => (
					<SortButton column={column} label="Product Type" />
				),
			},
			{
				accessorKey: "riskState",
				header: ({ column }) => (
					<SortButton column={column} label="Risk State" />
				),
				cell: ({ row }) => <RiskStateBadge value={row.original.riskState} />,
			},
			{
				accessorKey: "transaction",
				header: ({ column }) => (
					<SortButton column={column} label="Transaction" />
				),
				cell: ({ row }) => (
					<TransactionBadge value={row.original.transaction} />
				),
			},
			{
				id: "actions",
				cell: ({ row }) => <PortfolioActions company={row.original} />,
			},
		],
		[],
	);
}
