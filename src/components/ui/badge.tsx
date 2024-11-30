import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
        outline:
          "text-foreground border-black/10 hover:bg-accent hover:border-accent-foreground",
        success:
          "bg-green-500 text-white hover:bg-green-600 border-transparent",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
        warning:
          "bg-yellow-500 text-black hover:bg-yellow-600 border-transparent",
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
