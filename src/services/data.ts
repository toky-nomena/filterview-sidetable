export const data = {
  riskState: [
    "LowRisk",
    "ModerateRisk",
    "HighRisk",
    "CriticalRisk",
    "PendingReview",
    "UnderInvestigation",
  ],
  transaction: ["Purchase", "Refund"],
  province: ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"],
  language: ["en", "fr"],
  brand: ["Nike", "Adidas"],
  state: ["Active", "Inactive"],
  productType: ["Shoes", "Apparel"],
};

export const keys: (keyof typeof data)[] = [
  "brand",
  "state",
  "productType",
  "riskState",
  "transaction",
  "province",
];
