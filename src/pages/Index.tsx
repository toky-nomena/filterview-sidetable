import { MainLayout } from "@/components/layout/MainLayout";
import { CompaniesTable } from "@/components/CompaniesTable";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/services/data.service";
import { useSearchParams } from "react-router-dom";
import type {
	Brand,
	ProductType,
	Province,
	RiskState,
	State,
	TransactionType,
} from "@/types/schema";

const Index = () => {
	const [searchParams] = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;

	const { data, isLoading } = useQuery({
		queryKey: ["companies", Object.fromEntries(searchParams)],
		queryFn: () =>
			getCompanies({
				search: searchParams.get("search") || undefined,
				brand: searchParams.getAll("brand") as Brand[],
				state: searchParams.getAll("state") as State[],
				productType: searchParams.getAll("productType") as ProductType[],
				riskState: searchParams.getAll("riskState") as RiskState[],
				transaction: searchParams.getAll("transaction") as TransactionType[],
				province: searchParams.getAll("province") as Province[],
				page: currentPage,
			}),
	});

	return (
		<div className="space-y-4">
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<CompaniesTable
					data={data?.companies || []}
					pageCount={Math.ceil((data?.total || 0) / (data?.pageSize || 10))}
					currentPage={currentPage}
					onPageChange={(page) => {
						const newParams = new URLSearchParams(searchParams);
						newParams.set("page", page.toString());
						// setSearchParams(newParams);
					}}
				/>
			)}
		</div>
	);
};

export default Index;
