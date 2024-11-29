export type LookupType =
  | "riskState"
  | "transaction"
  | "province"
  | "brand"
  | "state"
  | "productType"
  | "language";

export interface LookupValue {
  code: string;
  label: string;
}
