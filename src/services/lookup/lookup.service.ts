import type { LookupItem, LookupType } from "./lookup.types";

async function loadLookupData(type: LookupType): Promise<LookupItem[]> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  try {
    const module = await import(`./data/${type}.json`);
    return module.default;
  } catch (error) {
    return [];
  }
}

const lookupCache = new Map<string, LookupItem[]>();

export async function getLookupValue(
  type: LookupType,
  value: string,
): Promise<string> {
  let lookup = lookupCache.get(type);

  if (!lookup) {
    lookup = await loadLookupData(type);
    lookupCache.set(type, lookup);
  }

  const item = lookup.find((item) => item.value === value);
  return item?.label ?? value;
}

export async function getLookupValues(type: LookupType): Promise<LookupItem[]> {
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

export type { LookupItem, LookupType };
