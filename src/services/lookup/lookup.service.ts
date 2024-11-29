import type { LookupValue } from "./lookup.types";

async function loadLookupData(type: string): Promise<LookupValue[]> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  try {
    const module = await import(`./data/${type}.json`);
    return module.default;
  } catch (error) {
    return [];
  }
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
  const lookup = await getLookupValues(name);
  const item = lookup.find((item) => item.code === code);
  return item?.label ?? code;
}

export async function preloadLookups(): Promise<void> {
  const lookupTypes = Object.values([
    "province",
    "riskState",
    "state",
    "transaction",
    "language",
  ]);
  await Promise.all(lookupTypes.map(loadLookupData));
}
