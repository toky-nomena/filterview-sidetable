import { createParser, parseAsString } from "nuqs";

export function createEnumParam<T extends string>(values: readonly T[]) {
  return createParser({
    parse: (value) => {
      const parsed = parseAsString.parse(value);
      return values.includes(parsed as T) ? (parsed as T) : null;
    },
    serialize: (value) => value,
  });
}
