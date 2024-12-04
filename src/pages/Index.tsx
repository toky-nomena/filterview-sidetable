import loadable from "@loadable/component";
import { useTransition } from "react";

import { Pagination } from "@/components/ui/pagination";
import { usePaginationQueryStates } from "@/use-cases/portfolio/hooks/usePaginationQueryStates";
import { usePortfolioQuery } from "@/use-cases/portfolio/hooks/usePortfolioQuery";

export const PortfolioTable = loadable(() =>
  import("@/use-cases/portfolio/components/PortfolioTable").then((mod) => ({
    default: mod.PortfolioTable,
  })),
);

export const PortfolioTablePlaceholoder = loadable(() =>
  import(
    "@/use-cases/portfolio/components/placeholders/PortfolioTablePlaceholder"
  ).then((mod) => ({
    default: mod.PortfolioTablePlaceholder,
  })),
);

export function Index() {
  // Query portfolio
  const { data, isLoading } = usePortfolioQuery();
  const [, startTransition] = useTransition();
  const [pagination, onPaginationChange] = usePaginationQueryStates();
  const totalItems = data?.totalItems ?? 0;

  if (isLoading) {
    return <PortfolioTablePlaceholoder />;
  }

  return (
    <div className="flex h-full flex-col">
      <PortfolioTable data={data?.result ?? []} totalItems={totalItems} />
      <Pagination
        className="sticky bottom-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t"
        currentPage={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        totalItems={totalItems}
        onPageChange={(page) => {
          startTransition(() => {
            onPaginationChange({ ...pagination, pageIndex: page - 1 });
          });
        }}
        onPageSizeChange={(size) => {
          startTransition(() => {
            onPaginationChange({ ...pagination, pageIndex: 0, pageSize: size });
          });
        }}
      />
    </div>
  );
}
