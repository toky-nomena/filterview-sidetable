import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioListItemSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-background border">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="mt-1 flex items-center gap-4 text-sm">
            <Skeleton className="h-5 w-16 rounded-full" />
            <span className="text-muted-foreground/50">•</span>
            <Skeleton className="h-5 w-16 rounded-full" />
            <span className="text-muted-foreground/50">•</span>
            <Skeleton className="h-5 w-16 rounded-full" />
            <span className="text-muted-foreground/50">•</span>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-28 ml-4" />
      </CardContent>
    </Card>
  );
}
