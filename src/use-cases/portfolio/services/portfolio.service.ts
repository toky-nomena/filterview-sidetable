import { faker } from "@faker-js/faker";

import type { FilterState } from "@/use-cases/portfolio/store/portfolioFilterStore";

import { getLookupRandomCode } from "./data";

export interface Portfolio {
  id: string;
  firstName: string;
  lastName: string;
  language: string;
  brand: string;
  state: string;
  productType: string;
  riskState: string;
  transaction: string;
  province: string;
  activity: number[];
}

export interface FilterParams {
  search?: string;
  brand?: string[];
  state?: string[];
  productType?: string[];
  riskState?: string[];
  transaction?: string[];
  province?: string[];
  page?: number;
}

const generateActivityData = () => {
  return Array.from({ length: 7 }, () =>
    faker.number.int({ min: 0, max: 100 }),
  );
};

const keys = [
  "brand",
  "state",
  "productType",
  "riskState",
  "transaction",
  "province",
] as const;

function generatePortfolio(): Portfolio {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    activity: generateActivityData(),
    language: getLookupRandomCode("language"),
    brand: getLookupRandomCode("brand"),
    state: getLookupRandomCode("state"),
    productType: getLookupRandomCode("productType"),
    riskState: getLookupRandomCode("riskState"),
    transaction: getLookupRandomCode("transaction"),
    province: getLookupRandomCode("province"),
  };
}

const validateFilter = <Data, T extends keyof Data>(
  value: string | string[] | undefined,
  field: T,
  data: Data,
): boolean => {
  if (!value?.length) {
    return true;
  }

  const dataValue = String(data[field]).toLowerCase();

  if (typeof value === "string") {
    return dataValue.toLowerCase().includes(value.toLowerCase());
  }

  return value.some((item) =>
    dataValue.toLowerCase().includes(item.toLowerCase()),
  );
};

const portfolio = Array.from({ length: 100 }, generatePortfolio);

export const getFilteredPortfolio = async (filters: FilterState) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return portfolio.filter((company) => {
    return keys.every((field) =>
      validateFilter(filters[field], field, company),
    );
  });
};
