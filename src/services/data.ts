export const data = {
	riskStates: [
		"LowRisk",
		"ModerateRisk",
		"HighRisk",
		"CriticalRisk",
		"PendingReview",
		"UnderInvestigation",
	],
	provinces: ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"],
	transactions: ["Purchase", "Refund"],
	language: ["en", "fr"],
	brand: ["Nike", "Adidas"],
	state: ["Active", "Inactive"],
	productType: ["Shoes", "Apparel"],
} as const;

export const keys = [
	"brand",
	"state",
	"productType",
	"riskState",
	"transaction",
	"province",
] as const;
