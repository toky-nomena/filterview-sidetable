import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        primary:
          "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
        success:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20",
        danger:
          "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20",
        warning:
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20",
        muted:
          "text-foreground border-black/10 hover:bg-accent hover:border-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

const Badge = ({ className, variant, children, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};

export { Badge, badgeVariants };
