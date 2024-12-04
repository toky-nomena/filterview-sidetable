import { faker } from "@faker-js/faker";

import { getLookupRandomCode } from "./data";
import type { FilterState } from "../types";

export interface Portfolio {
  id: string;
  customerNumber: string;
  businessKey: string;
  brand: string;
  language: string;
  province: string;
  productType: string;
  riskState: string;
  variation: string;
  creationDate: string;
  links?: string[];
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

const keys = Object.keys(generatePortfolio()) as (keyof Portfolio)[];

function generatePortfolio(): Portfolio {
  return {
    id: faker.string.uuid(),
    customerNumber: `${faker.number.int({
      min: 100000000000,
      max: 999999999999,
    })}`,
    variation: faker.helpers.arrayElement(["minimum", "maximum"]),
    businessKey: faker.string.alphanumeric(8).toUpperCase(),
    brand: getLookupRandomCode("brand"),
    language: getLookupRandomCode("language"),
    province: getLookupRandomCode("province"),
    productType: getLookupRandomCode("productType"),
    riskState: getLookupRandomCode("riskState"),
    creationDate: faker.date.recent().toISOString().split("T")[0],
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

const portfolio = Array.from({ length: 140 }, generatePortfolio);

export const getFilteredPortfolio = async (
  state: FilterState,
  variation: string,
  pagination: { pageIndex: number; pageSize: number },
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // First filter the portfolio based on state and variation
  const filteredPortfolio = portfolio.filter((item) => {
    const stateMatches = keys.every((field) =>
      validateFilter(state[field], field, item),
    );
    const variationMatches = !variation || item.variation === variation;
    return stateMatches && variationMatches;
  });

  // Calculate pagination
  const start = pagination.pageIndex * pagination.pageSize;
  const end = start + pagination.pageSize;

  return {
    result: filteredPortfolio.slice(start, end),
    count: filteredPortfolio.length,
  };
};
