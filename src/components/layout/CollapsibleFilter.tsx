import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Check, ChevronRight, Circle, CircleCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { update, useFilterState, type FilterState } from "@/store/filterStore";
import { cn } from "@/lib/utils";

export interface CollapsibleFilterProps {
	title: string;
	stateKey:
		| "riskState"
		| "transaction"
		| "province"
		| "brand"
		| "state"
		| "productType";
	items: string[];
}

export function CollapsibleFilter({
	title,
	stateKey,
	items,
}: CollapsibleFilterProps) {
	const state = useFilterState();
	const activeFilters = (state[stateKey] || []) as string[];
	const activeItems = activeFilters.filter((filter) => items.includes(filter));
	const allSelected = activeItems.length === items.length;

	const handleCheckedChange = (checked: boolean, item: string) => {
		update(stateKey, (currentFilters = []) => {
			if (checked) {
				return [...currentFilters, item];
			}
			return currentFilters.filter((filter) => filter !== item);
		});
	};

	const handleToggleAll = (e: React.MouseEvent) => {
		e.stopPropagation();
		update(stateKey, () => (allSelected ? [] : [...items]));
	};

	return (
		<Collapsible title={title} defaultOpen className="group/collapsible">
			<SidebarGroup className="p-0">
				<SidebarGroupLabel
					asChild
					className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
				>
					<CollapsibleTrigger>
						<div className="flex items-center gap-2">
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div
								onClick={handleToggleAll}
								className={cn(
									"flex size-6 items-center justify-center rounded-full transition-colors",
								)}
							>
								{allSelected ? (
									<CircleCheck className="size-8 stroke-[2] text-primary" />
								) : (
									<Circle className="size-8 stroke-[2] text-muted-foreground hover:text-foreground" />
								)}
							</div>
							<span className="flex items-center">
								{title}
								{activeItems.length > 0 && (
									<>
										<span className="ml-2 text-xs text-muted-foreground font-bold">
											({activeItems.length})
										</span>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												update(stateKey, () => []);
											}}
											className="ml-2 text-xs text-muted-foreground font-normal hover:text-destructive"
										>
											Clear
										</button>
									</>
								)}
							</span>
						</div>
						<ChevronRight className="w-4 h-4 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent className="pl-1">
					<SidebarGroupContent>
						<SidebarMenuSub>
							{items.map((item) => (
								<SidebarMenuItem key={item}>
									<SidebarMenuButton
										asChild
										isActive={activeFilters.includes(item)}
									>
										<div>
											<Checkbox
												id={item}
												checked={activeFilters.includes(item)}
												onCheckedChange={(checked) =>
													handleCheckedChange(!!checked, item)
												}
											/>
											<label
												htmlFor={item}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{item}
											</label>
										</div>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenuSub>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
