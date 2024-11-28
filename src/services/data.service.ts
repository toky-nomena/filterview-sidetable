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
import type { FilterState } from "@/store/filterStore";

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
	brand: faker.helpers.arrayElement(data.brand) as Company["brand"],
	state: faker.helpers.arrayElement(data.state) as Company["state"],
	productType: faker.helpers.arrayElement(
		data.productType,
	) as Company["productType"],
	riskState: faker.helpers.arrayElement(data.riskState) as Company["riskState"],
	transaction: faker.helpers.arrayElement(
		data.transaction,
	) as Company["transaction"],
	province: faker.helpers.arrayElement(data.province) as Company["province"],
});

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

	return value.some(
		(item) => item.toLowerCase() === (data[field] as string).toLowerCase(),
	);
};

const companies = Array.from({ length: 300 }, generateCompany);

export const getCompanies = async (filters: FilterState) => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	return companies.filter((company) => {
		const byName =
			validateFilter(filters.search, "firstName", company) ||
			validateFilter(filters.search, "lastName", company);

		return (
			byName &&
			keys.every((field) =>
				validateFilter(filters[field], field as keyof Company, company),
			)
		);
	});
};
