import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface DetailsSectionProps {
	title: string;
	children: ReactNode;
	className?: string;
}

export function DetailsSection({
	title,
	children,
	className,
}: DetailsSectionProps) {
	return (
		<div className={className}>
			<h4 className="text-md font-medium leading-none">{title}</h4>
			<Separator className="my-4" />
			<div className="grid grid-cols-2 gap-4">{children}</div>
		</div>
	);
}
