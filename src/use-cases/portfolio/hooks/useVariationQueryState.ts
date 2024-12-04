import { parseAsStringEnum, useQueryState } from "nuqs";

export function useVariationQueryState() {
  return useQueryState(
    "variation",
    parseAsStringEnum(["minimum", "maximum"])
      .withDefault("minimum")
      .withOptions({ clearOnDefault: false }),
  );
}
