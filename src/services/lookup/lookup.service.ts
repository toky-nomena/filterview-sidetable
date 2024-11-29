import {
  languageLabels,
  provinceLabels,
  riskStateLabels,
  stateLabels,
  transactionLabels,
} from "./lookup-data";

export type LookupType =
  | "province"
  | "riskState"
  | "state"
  | "transaction"
  | "language";

const lookupMap: Record<LookupType, Record<string, string>> = {
  province: provinceLabels,
  riskState: riskStateLabels,
  state: stateLabels,
  transaction: transactionLabels,
  language: languageLabels,
};

export async function getLookupValue(
  type: LookupType,
  value: string,
): Promise<string> {
  // Simulate network delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const lookup = lookupMap[type];
  return lookup[value] ?? value;
}

export async function getLookupValues(
  type: LookupType,
): Promise<Record<string, string>> {
  // Simulate network delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return lookupMap[type];
}
