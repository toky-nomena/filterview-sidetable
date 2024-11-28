import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { CollapsibleFilter } from "./CollapsibleFilter";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<span className="sr-only">Navigation</span>
			</SidebarHeader>
			<SidebarContent className="gap-2 px-2">
				{/* We create a collapsible SidebarGroup for each parent. */}
				{[].map((item) => (
					<CollapsibleFilter
						key={item.title}
						title={item.title}
						items={item.items}
					/>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
