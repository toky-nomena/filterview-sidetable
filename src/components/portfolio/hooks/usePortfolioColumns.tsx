import type { Company } from "@/services/data/data.service";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { SortButton } from "@/components/ui/sort-button";
import { PortfolioActions } from "../components/PortfolioActions";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { LookupBadge } from "@/components/portfolio/LookupBadge";

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
        cell: ({ row }) => (
          <LookupBadge value={row.original.state} type="state" />
        ),
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
        cell: ({ row }) => (
          <LookupBadge value={row.original.riskState} type="riskState" />
        ),
        enableHiding: true,
      },
      {
        accessorKey: "transaction",
        header: ({ column }) => (
          <SortButton column={column} label="Transaction" />
        ),
        cell: ({ row }) => (
          <LookupBadge value={row.original.transaction} type="transaction" />
        ),
        enableHiding: true,
      },
      {
        id: "actions",
        header: () => <span>Actions</span>,
        cell: ({ row }) => (
          <PortfolioActions company={row.original}>
            <Button
              variant="ghost"
              size="icon"
              className="dark:hover:bg-gray-800 p-0 hover:bg-transparent hover:text-muted-foreground"
            >
              <Eye className="size-4" />
            </Button>
          </PortfolioActions>
        ),
        enableHiding: false,
      },
    ],
    [],
  );
}
