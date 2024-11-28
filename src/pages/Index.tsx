import { CompaniesTable } from "@/components/CompaniesTable";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/services/data.service";
import { useFilterState, update } from "@/store/filterStore";

const PAGE_SIZE = 10;

export function Index() {
	// Access state from Zustand
	const state = useFilterState();

	const { data = [], isLoading } = useQuery({
		queryKey: ["companies", { ...state }],
		queryFn: () => getCompanies({ ...state }),
	});

	// Handle page change
	const handlePageChange = (newPage: number) => {
		update("page", () => newPage); // Update page in Zustand
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<CompaniesTable
			data={data}
			pageSize={PAGE_SIZE}
			currentPage={state.page}
			onPageChange={handlePageChange}
		/>
	);
}
