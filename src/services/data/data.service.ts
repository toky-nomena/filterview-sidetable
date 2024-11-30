import { faker } from "@faker-js/faker";

import type { FilterState } from "@/store/filterStore";
import type {
  Brand,
  ProductType,
  Province,
  RiskState,
  State,
  TransactionType,
} from "@/types/schema";
import { data, keys } from "./data";

export interface Portfolio {
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

const generateCompany = (): Portfolio => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  activity: generateActivityData(),
  language: faker.helpers.arrayElement(data.language),
  brand: faker.helpers.arrayElement(data.brand) as Portfolio["brand"],
  state: faker.helpers.arrayElement(data.state) as Portfolio["state"],
  productType: faker.helpers.arrayElement(
    data.productType,
  ) as Portfolio["productType"],
  riskState: faker.helpers.arrayElement(
    data.riskState,
  ) as Portfolio["riskState"],
  transaction: faker.helpers.arrayElement(
    data.transaction,
  ) as Portfolio["transaction"],
  province: faker.helpers.arrayElement(data.province) as Portfolio["province"],
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

const portfolio = Array.from({ length: 300 }, generateCompany);

export const getPortfolio = async (filters: FilterState) => {
  console.log("get portfolio", filters);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return portfolio.filter((company) => {
    return keys.every((field) =>
      validateFilter(filters[field], field as keyof Portfolio, company),
    );
  });
};
