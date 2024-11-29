export type LookupType =
  | "province"
  | "riskState"
  | "state"
  | "transaction"
  | "language";

export interface LookupItem {
  code: string;
  label: string;
}
