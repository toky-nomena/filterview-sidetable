import { Eye } from "lucide-react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { Portfolio } from "@/use-cases/portfolio/services/portfolio.service";
import { Button } from "@/components/ui/button";
import { Lookup } from "@/use-cases/lookup/components/lookup";
import { LookupName } from "@/use-cases/lookup/lookup.service";
import { PortfolioActions } from "../components/PortfolioActions";
import { LookupBadge } from "../components/LookupBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { SortButton } from "@/components/ui/sort-button";

export function usePortfolioColumns() {
  return useMemo<ColumnDef<Portfolio>[]>(
    () => [
      {
        id: "brand",
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
        id: "province",
        header: ({ column }) => <SortButton column={column} label="Province" />,
        cell: ({ row }) => (
          <Lookup
            name={LookupName.Province}
            code={row.original.province}
            fallback={<Skeleton className="h-5 w-16 rounded-full" />}
          />
        ),
        enableHiding: true,
      },
      {
        id: "customerNumber",
        header: ({ column }) => (
          <SortButton column={column} label="Customer Number" />
        ),
        cell: ({ row }) => <span>{row.original.customerNumber}</span>,
        enableHiding: true,
      },
      {
        id: "businessKey",
        header: ({ column }) => (
          <SortButton column={column} label="Business Key" />
        ),
        cell: ({ row }) => <span>{row.original.businessKey}</span>,
        enableHiding: true,
      },
      {
        id: "language",
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
        id: "productType",
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
        id: "riskState",
        header: ({ column }) => (
          <SortButton column={column} label="Risk State" />
        ),
        cell: ({ row }) => (
          <LookupBadge
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
        cell: ({ row }) => <span>{row.original.creationDate}</span>,
        enableHiding: true,
      },
      {
        id: "actions",
        header: () => <span>Actions</span>,
        cell: ({ row }) => <PortfolioActions portfolio={row.original} />,
        enableHiding: false,
      },
    ],
    [],
  );
}
