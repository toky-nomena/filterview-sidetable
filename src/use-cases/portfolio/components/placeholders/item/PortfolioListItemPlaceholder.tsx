import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioListItemPlaceholder() {
  return (
    <div className="hover:shadow-lg transition-shadow bg-background border text-foreground rounded-lg">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <span className="text-muted-foreground">•</span>
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-12" />
          <span className="text-muted-foreground">•</span>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}
