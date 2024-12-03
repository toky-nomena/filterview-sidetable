import { type Parser, useQueryStates } from "nuqs";

type ParserRecord<T> = Record<string, Parser<T>>;

export function usePortfolioQueryStates<T, K extends ParserRecord<T>>(
  keyMap: K,
) {
  // Create URL keys that match the filter names
  const urlKeys = Object.fromEntries(
    Object.keys(keyMap).map((key) => [key, key]),
  ) as Partial<Record<keyof K, string>>;

  const [state, setState] = useQueryStates(keyMap, { urlKeys });

  return [state, setState] as const;
}
