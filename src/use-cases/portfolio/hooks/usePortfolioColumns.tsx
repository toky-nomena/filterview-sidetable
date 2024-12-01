import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";

import { Lookup } from "@/use-cases/lookup/components/lookup";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { PortfolioLookupBadge } from "../components/PortfolioLookupBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { SortButton } from "@/components/ui/sort-button";
import { PortfolioActionsLazy } from "../components/actions/PortfolioActionsLazy";
import { Bus } from "lucide-react";
import { BusinessKeyLink } from "../components/actions/BusinessKeyLink";
import { CustomerNumberLink } from "../components/actions/CustomerNumberLink";

export function usePortfolioColumns() {
  return useMemo<ColumnDef<Portfolio>[]>(
    () => [
      {
        id: "brand",
        header: ({ column }) => <SortButton column={column} label="Brand" />,
        accessorKey: "brand",
        cell: ({ row }) => (
          <Lookup
            name={LookupName.Brand}
            code={row.original.brand}
            fallback={<Skeleton className="h-5 w-16 rounded-full" />}
          />
        ),
      },
      {
        id: "customerNumber",
        header: ({ column }) => (
          <SortButton column={column} label="Customer Number" />
        ),
        accessorKey: "customerNumber",
        cell: ({ row }) => (
          <CustomerNumberLink>{row.original.customerNumber}</CustomerNumberLink>
        ),
      },
      {
        id: "businessKey",
        header: ({ column }) => (
          <SortButton column={column} label="Business Key" />
        ),
        accessorKey: "businessKey",
        cell: ({ row }) => (
          <BusinessKeyLink>{row.original.businessKey}</BusinessKeyLink>
        ),
      },
      {
        id: "province",
        header: ({ column }) => <SortButton column={column} label="Province" />,
        accessorKey: "province",
        cell: ({ row }) => <span>{row.original.province}</span>,
        enableHiding: true,
      },
      {
        id: "language",
        header: ({ column }) => <SortButton column={column} label="Language" />,
        accessorKey: "language",
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
        id: "productType",
        header: ({ column }) => (
          <SortButton column={column} label="Product Type" />
        ),
        accessorKey: "productType",
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
        id: "riskState",
        header: ({ column }) => (
          <SortButton column={column} label="Risk State" />
        ),
        accessorKey: "riskState",
        cell: ({ row }) => (
          <PortfolioLookupBadge
            name={LookupName.RiskState}
            code={row.original.riskState}
          />
        ),
        enableHiding: true,
      },
      {
        id: "creationDate",
        header: ({ column }) => (
          <SortButton column={column} label="Creation Date" />
        ),
        accessorKey: "creationDate",
        cell: ({ row }) => <span>{row.original.creationDate}</span>,
        enableHiding: true,
      },
      {
        id: "actions",
        header: () => <span>Actions</span>,
        cell: ({ row }) => <PortfolioActionsLazy portfolio={row.original} />,
        enableHiding: false,
        enableSorting: false,
      },
    ],
    [],
  );
}
