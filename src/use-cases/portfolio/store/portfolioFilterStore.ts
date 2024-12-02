import { create } from "zustand";

// Define the state interface
export interface FilterState {
  brand: string[];
  state: string[];
  productType: string[];
  riskState: string[];
  transaction: string[];
  province: string[];
  language: string[];
}

const initialState: FilterState = {
  brand: [],
  state: [],
  productType: [],
  riskState: [],
  transaction: [],
  province: [],
  language: [],
};

// State-only store
export const usePortfolioFilterState = create<FilterState>(() => initialState);

export function update<T extends keyof FilterState>(
  key: T,
  setter: (state: FilterState[T]) => FilterState[T],
) {
  usePortfolioFilterState.setState((state) => ({
    ...state,
    [key]: setter(state[key]),
  }));
}

export const clearFilters = () => {
  usePortfolioFilterState.setState(() => initialState);
};
