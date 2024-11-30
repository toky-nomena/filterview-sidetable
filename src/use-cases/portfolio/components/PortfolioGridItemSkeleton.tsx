import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioGridItemSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-background border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Language:</span>
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Brand:</span>
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Product Type:</span>
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-muted-foreground">Risk State:</span>
          <Skeleton className="h-5 w-24" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="ml-auto h-9 w-28" />
      </CardFooter>
    </Card>
  );
}
