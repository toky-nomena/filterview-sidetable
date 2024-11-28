import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import type {
	Brand,
	ProductType,
	Province,
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

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const search = searchParams.get("search") || "";
	const selectedBrands = searchParams.getAll("brand") as Brand[];
	const selectedStates = searchParams.getAll("state") as State[];
	const selectedProductTypes = searchParams.getAll(
		"productType",
	) as ProductType[];
	const selectedRiskStates = searchParams.getAll("riskState") as RiskState[];
	const selectedTransactions = searchParams.getAll(
		"transaction",
	) as TransactionType[];
	const selectedProvinces = searchParams.getAll("province") as Province[];

	const handleSearch = (value: string) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (value) {
				newParams.set("search", value);
			} else {
				newParams.delete("search");
			}
			return newParams;
		});
	};

	const handleArrayParamChange = (param: string, value: string) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			const current = newParams.getAll(param);

			if (current.includes(value)) {
				const filtered = current.filter((v) => v !== value);
				newParams.delete(param);
				for (const v of filtered) {
					newParams.append(param, v);
				}
			} else {
				newParams.append(param, value);
			}

			return newParams;
		});
	};

	const handleTransactionChange = (
		selected: { value: TransactionType; label: string }[],
	) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.delete("transaction");
			for (const option of selected) {
				newParams.append("transaction", option.value);
			}
			return newParams;
		});
	};

	const clearFilters = () => {
		setSearchParams({});
	};

	return (
		<div
			className={`flex flex-col h-screen border-r bg-card dark:bg-card transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
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
									className="react-select-container"
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
						</div>
					</ScrollArea>
				</>
			)}
		</div>
	);
};
