import { Skeleton } from "@/components/ui/skeleton";

export function FooterPlaceholder() {
  return (
    <div className="sticky bottom-0 z-10 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-9" />
          <Skeleton className="h-6 w-9" />
          <Skeleton className="h-6 w-9" />
          <Skeleton className="h-6 w-9" />
        </div>
      </div>
    </div>
  );
}
