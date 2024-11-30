import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        primary: "border-transparent bg-primary/10 text-primary",
        secondary: "border-transparent bg-secondary/10 text-secondary",
        warning: "border-transparent bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        danger: "border-transparent bg-red-500/10 text-red-600 dark:text-red-400",
        success: "border-transparent bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        info: "border-transparent bg-blue-500/10 text-blue-600 dark:text-blue-400",
        muted: "border-transparent bg-muted/50 text-muted-foreground",
        outline: "border-border bg-background text-muted-foreground",
        "outline-primary": "border-primary/20 bg-primary/5 text-primary",
        "outline-warning": "border-yellow-500/20 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400",
        "outline-danger": "border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400",
        "outline-success": "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
        "outline-info": "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onRemove?: () => void;
}

function Badge({
  className,
  variant,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 rounded-full p-0.5"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
