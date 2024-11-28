import { create } from "zustand";

// Define the state interface
export interface FilterState {
	search: string;
	brand: string[];
	state: string[];
	productType: string[];
	riskState: string[];
	transaction: string[];
	province: string[];
	page: number;
}

const initialState: FilterState = {
	search: "",
	brand: [],
	state: [],
	productType: [],
	riskState: [],
	transaction: [],
	province: [],
	page: 1,
};

// State-only store
export const useFilterState = create<FilterState>(() => initialState);

export function update<T extends keyof FilterState>(
	key: T,
	setter: (state: FilterState[T]) => FilterState[T],
) {
	useFilterState.setState((state) => ({ ...state, [key]: setter(state[key]) }));
}

export const clearFilters = () => {
	useFilterState.setState(() => initialState);
};