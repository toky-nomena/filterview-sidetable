import type { Company } from "@/services/data.service";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { SortButton } from "@/components/ui/sort-button";
import {
	RiskStateBadge,
	StateBadge,
	TransactionBadge,
} from "@/components/ui/status-badge";
import { PortfolioActions } from "../components/PortfolioActions";

export function usePortfolioColumns() {
	return useMemo<ColumnDef<Company>[]>(
		() => [
			{
				accessorKey: "firstName",
				header: ({ column }) => (
					<SortButton column={column} label="First Name" />
				),
				enableHiding: true,
			},
			{
				accessorKey: "lastName",
				header: ({ column }) => (
					<SortButton column={column} label="Last Name" />
				),
				enableHiding: true,
			},
			{
				accessorKey: "language",
				header: ({ column }) => <SortButton column={column} label="Language" />,
				enableHiding: true,
			},
			{
				accessorKey: "province",
				header: ({ column }) => <SortButton column={column} label="Province" />,
				cell: ({ row }) => <span>{row.original.province}</span>,
				enableHiding: true,
			},
			{
				accessorKey: "brand",
				header: ({ column }) => <SortButton column={column} label="Brand" />,
				enableHiding: true,
			},
			{
				accessorKey: "state",
				header: ({ column }) => <SortButton column={column} label="State" />,
				cell: ({ row }) => <StateBadge value={row.original.state} />,
				enableHiding: true,
			},
			{
				accessorKey: "productType",
				header: ({ column }) => (
					<SortButton column={column} label="Product Type" />
				),
				enableHiding: true,
			},
			{
				accessorKey: "riskState",
				header: ({ column }) => (
					<SortButton column={column} label="Risk State" />
				),
				cell: ({ row }) => <RiskStateBadge value={row.original.riskState} />,
				enableHiding: true,
			},
			{
				accessorKey: "transaction",
				header: ({ column }) => (
					<SortButton column={column} label="Transaction" />
				),
				cell: ({ row }) => (
					<TransactionBadge value={row.original.transaction} />
				),
				enableHiding: true,
			},
			{
				id: "actions",
				header: () => <span>Actions</span>,
				cell: ({ row }) => <PortfolioActions company={row.original} />,
				enableHiding: false,
			},
		],
		[],
	);
}
