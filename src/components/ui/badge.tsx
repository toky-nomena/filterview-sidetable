import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis rounded-full border px-[8px] py-[0px] text-[0.6rem] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
				success:
					"border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-700/20 dark:text-emerald-400",
				warning:
					"border-transparent bg-amber-100 text-amber-700 dark:bg-amber-700/20 dark:text-amber-400",
				danger:
					"border-transparent bg-rose-100 text-rose-700 dark:bg-rose-700/20 dark:text-rose-400",
				muted:
					"border-transparent bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
