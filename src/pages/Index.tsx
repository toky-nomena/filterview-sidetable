import { CompaniesTable } from "@/components/CompaniesTable";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/services/data.service";
import { useFilterState, update } from "@/store/filterStore";

export function Index() {
	// Access state from Zustand
	const state = useFilterState();

	const { data, isLoading } = useQuery({
		queryKey: ["companies", { ...state }],
		queryFn: () => getCompanies({ ...state }),
	});

	// Handle page change
	const handlePageChange = (newPage: number) => {
		update("page", () => newPage); // Update page in Zustand
	};

	return (
		<div className="space-y-4">
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<CompaniesTable
					data={data?.companies || []}
					pageCount={Math.ceil((data?.total || 0) / (data?.pageSize || 10))}
					currentPage={state.page}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
}
