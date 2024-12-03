import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFilteredPortfolio } from "../services/portfolio.service";

function parseParamsAsString(params: URLSearchParams, key: string) {
  return params.get(key) || "";
}

function parseParamsAsArray(params: URLSearchParams, key: string) {
  return parseParamsAsString(params, key)
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value !== "");
}

function getFilterStateFromParams(params: URLSearchParams) {
  return {
    brand: parseParamsAsArray(params, "brand"),
    state: parseParamsAsArray(params, "state"),
    productType: parseParamsAsArray(params, "productType"),
    riskState: parseParamsAsArray(params, "riskState"),
    transaction: parseParamsAsArray(params, "transaction"),
    province: parseParamsAsArray(params, "province"),
    language: parseParamsAsArray(params, "language"),
  } as const;
}

export function usePortfolioQuery() {
  const [searchParams] = useSearchParams();
  const state = getFilterStateFromParams(searchParams);
  const variation = parseParamsAsString(searchParams, "variation");

  return useQuery({
    queryKey: ["portfolio", variation, state],
    queryFn: () => getFilteredPortfolio(state),
  });
}
