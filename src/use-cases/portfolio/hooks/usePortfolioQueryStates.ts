import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

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
