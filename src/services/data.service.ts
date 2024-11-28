import { faker } from "@faker-js/faker";
import type {
	Brand,
	ProductType,
	Province,
	RiskState,
	State,
	TransactionType,
} from "@/types/schema";

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

const generateActivityData = () =>
	Array.from({ length: 7 }, () => faker.number.int({ min: 0, max: 100 }));

const generateCompany = (): Company => ({
	id: faker.string.uuid(),
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	language: faker.helpers.arrayElement(["en", "fr"]),
	brand: faker.helpers.arrayElement(["Nike", "Adidas"]),
	state: faker.helpers.arrayElement(["Active", "Inactive"]),
	productType: faker.helpers.arrayElement(["Shoes", "Apparel"]),
	riskState: faker.helpers.arrayElement([
		"LowRisk",
		"ModerateRisk",
		"HighRisk",
		"CriticalRisk",
		"PendingReview",
		"UnderInvestigation",
	]),
	transaction: faker.helpers.arrayElement(["Purchase", "Refund"]),
	province: faker.helpers.arrayElement([
		"AB",
		"BC",
		"MB",
		"NB",
		"NL",
		"NS",
		"ON",
		"PE",
		"QC",
		"SK",
	]),
	activity: generateActivityData(),
});

const PAGE_SIZE = 10;

export const getCompanies = async (filters: FilterParams) => {
	console.log("Fetching companies with filters:", filters);

	const validateFilter = <T extends keyof Company>(
		value: string | string[] | undefined,
		field: T,
		company: Company,
	): boolean => {
		if (!value?.length) return true;
		if (typeof value === "string") {
			return company[field]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase());
		}
		return value.includes(company[field] as string);
	};

	const companies = Array.from({ length: 100 }, generateCompany).filter(
		(company) => {
			const searchValid =
				validateFilter(filters.search, "firstName", company) ||
				validateFilter(filters.search, "lastName", company);

			return (
				searchValid &&
				(
					[
						"brand",
						"state",
						"productType",
						"riskState",
						"transaction",
						"province",
					] as const
				).every((field) => validateFilter(filters[field], field, company))
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
