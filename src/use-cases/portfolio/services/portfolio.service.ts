import { faker } from "@faker-js/faker";

import type { FilterState } from "@/use-cases/portfolio/store/portfolioFilterStore";
import { loadLookupDataImmediate } from "../../lookup/lookup.service";
import language from "../../lookup/data/language.json";
import brand from "../../lookup/data/brand.json";
import productType from "../../lookup/data/product-type.json";
import province from "../../lookup/data/province.json";
import riskState from "../../lookup/data/risk-state.json";
import state from "../../lookup/data/state.json";
import transaction from "../../lookup/data/transaction.json";

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

async function getLookupRandomValue(type: string) {
  const values = await loadLookupDataImmediate(type);
  return faker.helpers.arrayElement(values.map((item) => item.code)) || "";
}

const keys = [
  "search",
  "brand",
  "state",
  "productType",
  "riskState",
  "transaction",
  "province",
] as const;

async function generatePortfolio(): Promise<Portfolio> {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    activity: generateActivityData(),
    language: faker.helpers.arrayElement(language.map((item) => item.code)),
    brand: faker.helpers.arrayElement(brand.map((item) => item.code)),
    state: faker.helpers.arrayElement(state.map((item) => item.code)),
    productType: faker.helpers.arrayElement(
      productType.map((item) => item.code),
    ),
    riskState: faker.helpers.arrayElement(riskState.map((item) => item.code)),
    transaction: faker.helpers.arrayElement(
      transaction.map((item) => item.code),
    ),
    province: faker.helpers.arrayElement(province.map((item) => item.code)),
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
    return dataValue.includes(value.toLowerCase());
  }

  return value.some((item) => dataValue.includes(item.toLowerCase()));
};

export const getPortfolio = async (filters: FilterState) => {
  const portfolio = [];

  for (let i = 0; i < 100; i++) {
    const current = await generatePortfolio();

    console.log("getPortfolio add current", current);

    portfolio.push(current);
  }

  console.log("getPortfolio data generated", portfolio);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return portfolio.filter((company) => {
    return keys.every((field) =>
      validateFilter(filters[field], field, company),
    );
  });
};
