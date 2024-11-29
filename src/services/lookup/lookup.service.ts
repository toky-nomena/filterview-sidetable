import type { LookupValue, LookupType } from "./lookup.types";

async function loadLookupData(type: LookupType): Promise<LookupValue[]> {
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

export async function getLookupValue(
  type: LookupType,
  code: string,
): Promise<string> {
  let lookup = lookupCache.get(type);

  if (!lookup) {
    lookup = (await loadLookupData(type)) || [];
    lookupCache.set(type, lookup);
  }

  const item = lookup.find((item) => item.code === code);
  return item?.label ?? code;
}

export async function getLookupValues(
  type: LookupType,
): Promise<LookupValue[]> {
  let lookup = lookupCache.get(type);

  if (!lookup) {
    lookup = await loadLookupData(type);
    lookupCache.set(type, lookup);
  }

  return lookup;
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

export type { LookupValue as LookupItem, LookupType };
