import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	CollapsibleFilter,
	type CollapsibleFilterProps,
} from "./CollapsibleFilter";
import { data } from "@/services/data";

interface FilterGroup {
	title: string;
	stateKey: CollapsibleFilterProps["stateKey"];
	items: string[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const items: FilterGroup[] = [
		{
			title: "Risk State",
			stateKey: "riskState",
			items: data.riskState,
		},
		{
			title: "Transaction",
			stateKey: "transaction",
			items: data.transaction,
		},
		{
			title: "Province",
			stateKey: "province",
			items: data.province,
		},
		{
			title: "Brand",
			stateKey: "brand",
			items: data.brand,
		},
		{
			title: "State",
			stateKey: "state",
			items: data.state,
		},
		{
			title: "Product Type",
			stateKey: "productType",
			items: data.productType,
		},
	];

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<span className="sr-only">Navigation</span>
			</SidebarHeader>
			<SidebarContent className="px-2">
				{items.map((item) => (
					<CollapsibleFilter
						key={item.title}
						title={item.title}
						items={item.items}
						stateKey={item.stateKey}
					/>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
