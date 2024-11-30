import type { LookupValue } from "./lookup.types";

export enum LookupName {
  Province = "province",
  Brand = "brand",
  RiskState = "risk-state",
  State = "state",
  Transaction = "transaction",
  Language = "language",
  ProductType = "product-type",
}

export async function loadLookupDataImmediate(
  type: string,
): Promise<LookupValue[]> {
  try {
    const module = await import(`./data/${type}.json`);
    return module.default;
  } catch (error) {
    return [];
  }
}

export async function loadLookupData(type: string): Promise<LookupValue[]> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return await loadLookupDataImmediate(type);
}

const lookupCache = new Map<string, LookupValue[]>();

export async function getLookupValues(name: string): Promise<LookupValue[]> {
  let lookups = lookupCache.get(name);

  if (!lookups) {
    lookups = await loadLookupData(name);
    lookupCache.set(name, lookups);
  }

  return lookups;
}

export async function getLookupValue(
  name: string,
  code: string,
): Promise<string> {
  const lookup = await findLookup(name, code);
  return lookup?.label ?? code;
}

export async function findLookup(
  name: string,
  code: string,
): Promise<LookupValue | undefined> {
  const lookup = await getLookupValues(name);
  return lookup.find((item) => item.code === code);
}

export async function preloadLookups(): Promise<void> {
  const lookupTypes = Object.values(LookupName);
  await Promise.all(lookupTypes.map(loadLookupData));
}
