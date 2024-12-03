import { useQueryStates, type UseQueryStatesKeysMap } from "nuqs";

export function usePortfolioQueryStates(keyMap: UseQueryStatesKeysMap) {
  return useQueryStates(keyMap, {
    urlKeys: Object.fromEntries(Object.keys(keyMap).map((key) => [key, key])),
  });
}
