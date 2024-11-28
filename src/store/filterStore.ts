import { create } from "zustand";
import type {
	Brand,
	ProductType,
	Province,
	RiskState,
	State,
	TransactionType,
} from "@/types/schema";
import { set } from "zod";

// Define the state interface
interface FilterState {
	search: string;
	brands: Brand[];
	states: State[];
	productTypes: ProductType[];
	riskStates: RiskState[];
	transactions: TransactionType[];
	provinces: Province[];
	page: number;
}

const initialState: FilterState = {
	search: "",
	brands: [],
	states: [],
	productTypes: [],
	riskStates: [],
	transactions: [],
	provinces: [],
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
