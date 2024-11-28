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
import { ChevronRight } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface CollapsibleFilterProps {
	title: string;
	items: {
		title: string;
		url: string;
		isActive?: boolean;
	}[];
}

export function CollapsibleFilter({ title, items }: CollapsibleFilterProps) {
	return (
		<Collapsible title={title} defaultOpen className="group/collapsible">
			<SidebarGroup>
				<SidebarGroupLabel
					asChild
					className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
				>
					<CollapsibleTrigger className="font-bold">
						{title}
						<ChevronRight className=" w6 h-6 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent className="pl-1">
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={item.isActive}>
										<div>
											<Checkbox id={item.title} />
											<label
												htmlFor={item.title}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{item.title}
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
