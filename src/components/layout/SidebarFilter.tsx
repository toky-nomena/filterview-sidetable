import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import Select from "react-select";
import type {
	Brand,
	ProductType,
	RiskState,
	State,
	TransactionType,
} from "@/types/schema";
import { ProvinceFilter } from "./filters/ProvinceFilter";
import { FilterSection } from "./filters/FilterSection";

const brands: Brand[] = ["Nike", "Adidas"];
const states: State[] = ["Active", "Inactive"];
const productTypes: ProductType[] = ["Shoes", "Apparel"];
const riskStates: RiskState[] = [
	"LowRisk",
	"ModerateRisk",
	"HighRisk",
	"CriticalRisk",
	"PendingReview",
	"UnderInvestigation",
];
const transactionTypes: { value: TransactionType; label: string }[] = [
	{ value: "Purchase", label: "Purchase" },
	{ value: "Refund", label: "Refund" },
];

interface SidebarProps {
	isCollapsed: boolean;
}

const parser = parseAsArrayOf(parseAsString).withDefault([]);

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
	const [search, setSearch] = useQueryState(
		"search",
		parseAsString.withDefault(""),
	);
	const [selectedBrands, setSelectedBrands] = useQueryState("brand", parser);
	const [selectedStates, setSelectedStates] = useQueryState("state", parser);
	const [selectedProductTypes, setSelectedProductTypes] = useQueryState(
		"productType",
		parser,
	);
	const [selectedRiskStates, setSelectedRiskStates] = useQueryState(
		"riskState",
		parser,
	);
	const [selectedTransactions, setSelectedTransactions] = useQueryState(
		"transaction",
		parser,
	);
	const [selectedProvinces, setSelectedProvinces] = useQueryState(
		"province",
		parser,
	);

	const handleArrayParamChange = (param: string, value: string) => {
		const setters = {
			brand: setSelectedBrands,
			state: setSelectedStates,
			productType: setSelectedProductTypes,
			riskState: setSelectedRiskStates,
			province: setSelectedProvinces,
		} as const;

		const currentArray = {
			brand: selectedBrands,
			state: selectedStates,
			productType: selectedProductTypes,
			riskState: selectedRiskStates,
			province: selectedProvinces,
		}[param as keyof typeof setters];

		const setter = setters[param as keyof typeof setters];

		if (currentArray.includes(value)) {
			setter(currentArray.filter((v) => v !== value));
		} else {
			setter([...currentArray, value]);
		}
	};

	const handleTransactionChange = (
		selected: { value: TransactionType; label: string }[],
	) => {
		setSelectedTransactions(selected.map((s) => s.value));
	};

	const clearFilters = () => {
		setSearch(null);
		setSelectedBrands([]);
		setSelectedStates([]);
		setSelectedProductTypes([]);
		setSelectedRiskStates([]);
		setSelectedTransactions([]);
		setSelectedProvinces([]);
	};

	return (
		<div
			className={`flex flex-col h-screen border-r bg-card dark:bg-card transition-all duration-300 ${isCollapsed ? "w-16" : "w-80"}`}
		>
			{!isCollapsed && (
				<>
					<div className="p-4 border-b dark:border-gray-800">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<Filter className="h-4 w-4" />
								<h2 className="font-semibold">Filters</h2>
							</div>
							{(search ||
								selectedBrands.length > 0 ||
								selectedStates.length > 0 ||
								selectedProductTypes.length > 0 ||
								selectedRiskStates.length > 0 ||
								selectedTransactions.length > 0 ||
								selectedProvinces.length > 0) && (
								<Button
									variant="ghost"
									size="sm"
									className="h-8 px-2 text-muted-foreground"
									onClick={clearFilters}
								>
									Clear All
								</Button>
							)}
						</div>
					</div>

					<ScrollArea className="flex-1">
						<div className="p-4 space-y-6">
							<div className="space-y-3">
								<h3 className="text-sm font-medium">Transaction Type</h3>
								<Select
									isMulti
									options={transactionTypes}
									value={transactionTypes.filter((opt) =>
										selectedTransactions.includes(opt.value),
									)}
									onChange={(selected) =>
										handleTransactionChange(
											selected as { value: TransactionType; label: string }[],
										)
									}
									className="react-select-container z-50"
									classNamePrefix="react-select"
									theme={(theme) => ({
										...theme,
										colors: {
											...theme.colors,
											neutral0: "var(--background)",
											neutral80: "var(--foreground)",
											primary: "#8B5CF6",
											primary25: "#F3E8FF",
										},
									})}
								/>
							</div>
							<FilterSection
								title="Brand"
								items={brands.map((brand) => ({ id: brand, label: brand }))}
								selectedItems={selectedBrands}
								onChange={(brand) => handleArrayParamChange("brand", brand)}
							/>

							<FilterSection
								title="State"
								items={states.map((state) => ({ id: state, label: state }))}
								selectedItems={selectedStates}
								onChange={(state) => handleArrayParamChange("state", state)}
							/>

							<FilterSection
								title="Product Type"
								items={productTypes.map((type) => ({ id: type, label: type }))}
								selectedItems={selectedProductTypes}
								onChange={(type) => handleArrayParamChange("productType", type)}
							/>

							<FilterSection
								title="Risk State"
								items={riskStates.map((state) => ({ id: state, label: state }))}
								selectedItems={selectedRiskStates}
								onChange={(state) => handleArrayParamChange("riskState", state)}
							/>

							<ProvinceFilter
								selectedProvinces={selectedProvinces}
								onChange={(province) =>
									handleArrayParamChange("province", province)
								}
							/>
						</div>
					</ScrollArea>
				</>
			)}
		</div>
	);
};
