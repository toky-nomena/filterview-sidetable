import { CompaniesTable } from "@/components/CompaniesTable";
import { type Company, getCompanies } from "@/services/data.service";
import { useFilterState, update } from "@/store/filterStore";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useTransition } from "react";

function filterCompanies(search: string, companies: Company[]) {
	if (!search || search.trim().length === 0) {
		return companies;
	}

	const searchLower = search.toLowerCase();
	return companies.filter(
		(company) =>
			company.firstName.toLowerCase().includes(searchLower) ||
			company.lastName.toLowerCase().includes(searchLower),
	);
}

export function Index() {
	const state = useFilterState();
	const [pendingSearch, setPendingSearch] = useState(state.search); // Temporary search state
	const [isPending, startTransition] = useTransition();

	// Query companies
	const { data: companies = [], isLoading } = useQuery({
		queryKey: ["companies", { ...state, search: "" }],
		queryFn: () => getCompanies({ ...state, search: "" }),
	});

	const handleSearch = (value: string) => {
		setPendingSearch(value); // Immediately update the input value for responsiveness
		startTransition(() => {
			update("search", () => value); // Defer the expensive filtering task
			if (state.page !== 1) {
				update("page", () => 1);
			}
		});
	};

	const handlePageChange = (newPage: number) => {
		if (newPage !== state.page) {
			update("page", () => newPage);
		}
	};

	// Filter companies (expensive operation handled after transition)
	const filteredCompanies = useMemo(
		() => filterCompanies(state.search, companies),
		[state.search, companies],
	);

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
					value={pendingSearch}
					onChange={(e) => handleSearch(e.target.value)}
				/>
			</div>
			<CompaniesTable
				data={filteredCompanies}
				currentPage={state.page}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
