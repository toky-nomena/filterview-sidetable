import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { Company } from "@/services/data.service";
import { Eye } from "lucide-react";
import { PortfolioDetails } from "../PortfolioDetails";
import { Button } from "@/components/ui/button";

interface PortfolioActionsProps {
	company: Company;
}

export function PortfolioActions({ company }: PortfolioActionsProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="dark:hover:bg-gray-800 p-0 hover:bg-transparent hover:text-muted-foreground"
				>
					<Eye className="size-4" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Portfolio Details</SheetTitle>
				</SheetHeader>
				<PortfolioDetails company={company} />
			</SheetContent>
		</Sheet>
	);
}
