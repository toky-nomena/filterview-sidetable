import { faker } from "@faker-js/faker";
import type {
	Brand,
	ProductType,
	Province,
	RiskState,
	State,
	TransactionType,
} from "@/types/schema";
import { data, keys } from "./data";

export interface Company {
	id: string;
	firstName: string;
	lastName: string;
	language: string;
	brand: Brand;
	state: State;
	productType: ProductType;
	riskState: RiskState;
	transaction: TransactionType;
	province: Province;
	activity: number[];
}

export interface FilterParams {
	search?: string;
	brand?: Brand[];
	state?: State[];
	productType?: ProductType[];
	riskState?: RiskState[];
	transaction?: TransactionType[];
	province?: Province[];
	page?: number;
}

const generateActivityData = () => {
	return Array.from({ length: 7 }, () =>
		faker.number.int({ min: 0, max: 100 }),
	);
};

const generateCompany = (): Company => ({
	id: faker.string.uuid(),
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	activity: generateActivityData(),
	language: faker.helpers.arrayElement(data.language),
	brand: faker.helpers.arrayElement(data.brand),
	state: faker.helpers.arrayElement(data.state),
	productType: faker.helpers.arrayElement(data.productType),
	riskState: faker.helpers.arrayElement(data.riskStates),
	transaction: faker.helpers.arrayElement(data.transactions),
	province: faker.helpers.arrayElement(data.provinces),
});

const PAGE_SIZE = 10;

const validateFilter = <Data, T extends keyof Data>(
	value: string | string[] | undefined,
	field: T,
	data: Data,
): boolean => {
	if (!value?.length) {
		return true;
	}

	if (typeof value === "string") {
		return data[field].toString().toLowerCase().includes(value.toLowerCase());
	}

	return value.includes(data[field] as string);
};

export const getCompanies = async (filters: FilterParams) => {
	console.log("Fetching companies with filters:", filters);

	const companies = Array.from({ length: 100 }, generateCompany).filter(
		(company) => {
			const byName =
				validateFilter(filters.search, "firstName", company) ||
				validateFilter(filters.search, "lastName", company);

			return (
				byName &&
				keys.every((field) => validateFilter(filters[field], field, company))
			);
		},
	);

	const page = filters.page || 1;
	const start = (page - 1) * PAGE_SIZE;
	const paginatedCompanies = companies.slice(start, start + PAGE_SIZE);

	return {
		companies: paginatedCompanies,
		total: companies.length,
		page,
		pageSize: PAGE_SIZE,
	};
};
