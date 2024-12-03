import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

const parser = parseAsArrayOf(parseAsString).withDefault([]).withOptions({
  clearOnDefault: false,
});

const paginationParsers = {
  brand: parser,
  state: parser,
  productType: parser,
  riskState: parser,
  transaction: parser,
  province: parser,
  language: parser,
};

const keys = Object.keys(paginationParsers).reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {});

export function usePortfolioQueryState() {
  const [state, setState] = useQueryStates(paginationParsers, {
    urlKeys: keys,
  });

  const update = (
    key: keyof typeof state,
    setter: (state: string[]) => string[],
  ) => setState((prev) => ({ ...prev, [key]: setter(prev[key]) }));

  return [state, update] as const;
}
