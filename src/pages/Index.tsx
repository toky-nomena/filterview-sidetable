import { CompaniesTable } from "@/components/CompaniesTable";
import { getCompanies } from "@/services/data.service";
import { useFilterState, update } from "@/store/filterStore";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

export function Index() {
	const state = useFilterState();

	const { data: companies = [], isLoading } = useQuery({
		queryKey: ["companies"],
		queryFn: () => getCompanies({ ...state, search: "" }),
	});

	const handlePageChange = (newPage: number) => {
		update("page", () => newPage);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="space-y-4">
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search companies..."
					className="pl-9 dark:bg-background"
				/>
			</div>
			<CompaniesTable
				data={companies}
				currentPage={state.page}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
