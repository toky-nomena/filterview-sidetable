import { Checkbox } from "@/components/ui/checkbox";
import type { Province } from "@/types/schema";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const provinces: Province[] = [
	"AB",
	"BC",
	"MB",
	"NB",
	"NL",
	"NS",
	"ON",
	"PE",
	"QC",
	"SK",
];
const provinceLabels: Record<Province, string> = {
	AB: "Alberta",
	BC: "British Columbia",
	MB: "Manitoba",
	NB: "New Brunswick",
	NL: "Newfoundland and Labrador",
	NS: "Nova Scotia",
	ON: "Ontario",
	PE: "Prince Edward Island",
	QC: "Quebec",
	SK: "Saskatchewan",
};

interface ProvinceFilterProps {
	selectedProvinces: Province[];
	onChange: (province: Province) => void;
}

export const ProvinceFilter = ({
	selectedProvinces,
	onChange,
}: ProvinceFilterProps) => {
	return (
		<Collapsible defaultOpen>
			<CollapsibleTrigger className="flex w-full items-center justify-between">
				<h3 className="text-sm font-medium">Province</h3>
				<ChevronDown className="h-4 w-4 text-muted-foreground" />
			</CollapsibleTrigger>
			<CollapsibleContent className="space-y-2 mt-2">
				{provinces.map((province) => (
					<div key={province} className="flex items-center space-x-2">
						<Checkbox
							id={province}
							checked={selectedProvinces.includes(province)}
							onCheckedChange={() => onChange(province)}
						/>
						<label htmlFor={province} className="text-sm">
							{provinceLabels[province]}
						</label>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};
