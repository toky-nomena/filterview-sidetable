import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronRight, Database } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { update, useFilterState, type FilterState } from "@/store/filterStore";

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

	const handleCheckedChange = (checked: boolean, item: string) => {
		update(stateKey, (currentFilters = []) => {
			if (checked) {
				return [...currentFilters, item];
			}
			return currentFilters.filter((filter) => filter !== item);
		});
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
							<Database className="w-6 h-6 stroke-2 text-slate-500" />
							<span className="font-bold">
								{title}
								{activeItems.length > 0 && ` (${activeItems.length})`}
							</span>
						</div>
						<ChevronRight className="w-4 h-4 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent className="pl-1">
					<SidebarGroupContent>
						<SidebarMenu>
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
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
