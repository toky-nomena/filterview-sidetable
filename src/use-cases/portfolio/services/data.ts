import { faker } from "@faker-js/faker";

import brand from "../../lookup/data/brand.json";
import language from "../../lookup/data/language.json";
import productType from "../../lookup/data/product-type.json";
import province from "../../lookup/data/province.json";
import riskState from "../../lookup/data/risk-state.json";
import state from "../../lookup/data/state.json";
import transaction from "../../lookup/data/transaction.json";

const lookups = {
  language,
  brand,
  productType,
  province,
  riskState,
  state,
  transaction,
};

export function getLookupCodes(lookupName: keyof typeof lookups): string[] {
  return lookups[lookupName].map((item) => item.code);
}

export function getLookupRandomCode(lookupName: keyof typeof lookups): string {
  return faker.helpers.arrayElement(
    lookups[lookupName].map((item) => item.code),
  );
}
