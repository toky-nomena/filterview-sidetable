import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioGridItemPlaceholder() {
  return (
    <div className="group flex flex-row justify-between items-center relative rounded-lg border bg-background p-4 transition-colors hover:shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <span className="text-muted-foreground">•</span>
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <Skeleton className="size-10 rounded-full" />
    </div>
  );
}
