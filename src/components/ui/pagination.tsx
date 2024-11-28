import * as React from "react";
import {
	ChevronLeft,
	ChevronRight,
	ChevronLast,
	ChevronFirst,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";

interface PaginationProps {
	currentPage: number;
	pageSize: number;
	totalItems: number;
	pageSizeOptions?: number[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	className?: string;
}

export function Pagination({
	currentPage,
	pageSize,
	totalItems,
	pageSizeOptions = [10, 20, 50, 100],
	onPageChange,
	onPageSizeChange,
	className,
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / pageSize);
	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);

	return (
		<div
			className={cn("flex items-center justify-between px-2 gap-3", className)}
		>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<span>
					{startItem} - {endItem} of {totalItems}
				</span>
				<Select
					value={pageSize.toString()}
					onValueChange={(value) => onPageSizeChange(Number(value))}
				>
					<SelectTrigger className="h-8 w-[80px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{pageSizeOptions.map((size) => (
							<SelectItem key={size} value={size.toString()}>
								{size} rows
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => onPageChange(0)}
					disabled={currentPage === 1}
				>
					<ChevronFirst className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<div className="flex items-center gap-1 text-xs">
					<span className="text-muted-foreground">Page</span>
					<span className="font-medium">{currentPage}</span>
					<span className="text-muted-foreground">of</span>
					<span className="font-medium">{totalPages}</span>
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					<ChevronLast className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
