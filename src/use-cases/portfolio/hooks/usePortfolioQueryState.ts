import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

// Create a type-safe array parser with default options
const parser = parseAsArrayOf(parseAsString).withDefault([]).withOptions({
  clearOnDefault: false,
});

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

// Create URL keys that match the filter names
const urlKeys = Object.fromEntries(
  Object.keys(keyMap).map((key) => [key, key]),
);

type UpdateFunction = (
  key: keyof typeof keyMap,
  setter: (prev: string[]) => string[],
) => void;

export function usePortfolioQueryState() {
  const [state, setState] = useQueryStates(keyMap, { urlKeys });

  const update: UpdateFunction = (key, setter) => {
    setState((prev) => ({ ...prev, [key]: setter(prev[key]) }));
  };

  return [state, update] as const;
}
