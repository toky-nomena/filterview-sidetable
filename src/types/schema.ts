import { z } from "zod";

export const brandSchema = z.union([z.literal("Nike"), z.literal("Adidas")]);
export const stateSchema = z.union([z.literal("Active"), z.literal("Inactive")]);
export const riskStateSchema = z.union([
  z.literal("LowRisk"),
  z.literal("ModerateRisk"),
  z.literal("HighRisk"),
  z.literal("CriticalRisk"),
  z.literal("PendingReview"),
  z.literal("UnderInvestigation"),
]);
export const transactionTypeSchema = z.union([z.literal("Purchase"), z.literal("Refund")]);
export const productTypeSchema = z.union([z.literal("Shoes"), z.literal("Apparel")]);
export const provinceSchema = z.union([
  z.literal("AB"),
  z.literal("BC"),
  z.literal("MB"),
  z.literal("NB"),
  z.literal("NL"),
  z.literal("NS"),
  z.literal("ON"),
  z.literal("PE"),
  z.literal("QC"),
  z.literal("SK"),
]);

export const filterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  language: z.string(),
  brand: z.array(brandSchema),
  state: z.array(stateSchema),
  productType: z.array(productTypeSchema),
  riskState: z.array(riskStateSchema),
  transaction: z.array(transactionTypeSchema),
  province: z.array(provinceSchema),
});

export type FilterSchema = z.infer<typeof filterSchema>;
export type Brand = z.infer<typeof brandSchema>;
export type State = z.infer<typeof stateSchema>;
export type RiskState = z.infer<typeof riskStateSchema>;
export type TransactionType = z.infer<typeof transactionTypeSchema>;
export type ProductType = z.infer<typeof productTypeSchema>;
export type Province = z.infer<typeof provinceSchema>;