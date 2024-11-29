export type LookupType =
  | "province"
  | "riskState"
  | "state"
  | "transaction"
  | "language";

export interface LookupItem {
  value: string;
  label: string;
}
