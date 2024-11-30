import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-base bg-gray-200 dark:bg-gray-800 alpha-50",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
