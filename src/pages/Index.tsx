import { PortfolioTable } from "@/components/portfolio/PortfolioTable";
import { getCompanies } from "@/services/data.service";
import { useFilterState } from "@/store/filterStore";
import { useQuery } from "@tanstack/react-query";

export function Index() {
  const state = useFilterState();

  // Query companies
  const { data = [], isLoading } = useQuery({
    queryKey: ["companies", state],
    queryFn: () => getCompanies(state),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <PortfolioTable data={data} />;
}
