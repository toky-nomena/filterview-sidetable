import { Eye } from "lucide-react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { SortButton } from "@/components/ui/sort-button";
import { Button } from "@/components/ui/button";
import { LookupBadge } from "../components/LookupBadge";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import { PortfolioActions } from "../components/PortfolioActions";
import { Skeleton } from "@/components/ui/skeleton";

export function usePortfolioColumns() {
  return useMemo<ColumnDef<Portfolio>[]>(
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
        cell: ({ row }) => (
          <Lookup
            name={LookupName.Language}
            code={row.original.language}
            fallback={<Skeleton className="h-5 w-16 rounded-full" />}
          />
        ),
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
        cell: ({ row }) => (
          <Lookup
            name={LookupName.Brand}
            code={row.original.brand}
            fallback={<Skeleton className="h-5 w-16 rounded-full" />}
          />
        ),
        enableHiding: true,
      },
      {
        accessorKey: "state",
        header: ({ column }) => <SortButton column={column} label="State" />,
        cell: ({ row }) => (
          <LookupBadge code={row.original.state} lookupName="state" />
        ),
        enableHiding: true,
      },
      {
        accessorKey: "productType",
        header: ({ column }) => (
          <SortButton column={column} label="Product Type" />
        ),
        cell: ({ row }) => (
          <Lookup
            name={LookupName.ProductType}
            code={row.original.productType}
            fallback={<Skeleton className="h-5 w-16 rounded-full" />}
          />
        ),
        enableHiding: true,
      },
      {
        accessorKey: "riskState",
        header: ({ column }) => (
          <SortButton column={column} label="Risk State" />
        ),
        cell: ({ row }) => (
          <LookupBadge code={row.original.riskState} lookupName="risk-state" />
        ),
        enableHiding: true,
      },
      {
        accessorKey: "transaction",
        header: ({ column }) => (
          <SortButton column={column} label="Transaction" />
        ),
        cell: ({ row }) => (
          <LookupBadge
            code={row.original.transaction}
            lookupName="transaction"
          />
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
