import { useQuery } from "@tanstack/react-query";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

import { getFilteredPortfolio } from "../services/portfolio.service";
import { usePaginationQueryStates } from "./usePaginationQueryStates";
import { useVariationQueryState } from "./useVariationQueryState";

// Create a type-safe array parser with default options
const parser = parseAsArrayOf(parseAsString).withDefault([]);

// Define parsers for each filter type
const keyMap = {
  brand: parser,
  state: parser,
  productType: parser,
  riskState: parser,
  transaction: parser,
  province: parser,
  language: parser,
} as const;

export function usePortfolioQueryStates() {
  return useQueryStates(keyMap);
}

export function usePortfolioQuery() {
  const [variation] = useVariationQueryState();
  const [state] = usePortfolioQueryStates();

  const [pagination] = usePaginationQueryStates();
  return useQuery({
    queryKey: ["portfolio", variation, state, pagination],
    queryFn: () => getFilteredPortfolio(state, variation, pagination),
  });
}
