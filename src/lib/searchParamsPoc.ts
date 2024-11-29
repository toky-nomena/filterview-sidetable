import { createParser, type Parser, parseAsInteger } from "nuqs";

/**
 * Simple type-safe schema builder for URL search parameters
 */

// Basic param types
type StringParam = { type: "string"; default?: string };
type NumberParam = { type: "number"; default?: number };
type BooleanParam = { type: "boolean"; default?: boolean };
type ArrayParam<T> = { 
  type: "array"; 
  default?: T[]; 
  separator?: string;
  item: {
    parse: (value: string) => T;
    serialize: (value: T) => string;
  };
};

// Schema definition types
type ParamConfig = 
  | StringParam 
  | NumberParam 
  | BooleanParam 
  | ArrayParam<unknown>;

type SchemaDefinition = Record<string, ParamConfig>;

// Helper to infer param type from config
type InferParamType<T extends ParamConfig> = T extends StringParam
  ? string
  : T extends NumberParam
  ? number
  : T extends BooleanParam
  ? boolean
  : T extends ArrayParam<infer U>
  ? U[]
  : never;

// Helper to infer schema values type
type SchemaValues<T extends SchemaDefinition> = {
  [K in keyof T]: InferParamType<T[K]>;
};

/**
 * Creates a schema for URL search parameters with type safety
 */
export function defineSearchParams<T extends SchemaDefinition>(schema: T) {
  const parsers: Record<string, Parser<unknown>> = {};

  for (const [key, config] of Object.entries(schema)) {
    let parser: Parser<unknown>;

    switch (config.type) {
      case "string":
        parser = createParser({
          parse: (value) => value,
          serialize: String,
        });
        break;

      case "number":
        parser = parseAsInteger;
        break;

      case "boolean":
        parser = createParser({
          parse: (value) => value === "true",
          serialize: String,
        });
        break;

      case "array":
        const separator = config.separator ?? ",";
        parser = createParser({
          parse: (value) => 
            value?.split(separator).map(config.item.parse) ?? [],
          serialize: (value: unknown[]) => 
            value.map(v => config.item.serialize(v as never)).join(separator),
        });
        break;

      default:
        throw new Error(`Unknown param type: ${(config as ParamConfig).type}`);
    }

    parsers[key] = config.default !== undefined 
      ? parser.withDefault(config.default)
      : parser;
  }

  return parsers as { [K in keyof T]: Parser<InferParamType<T[K]>> };
}

// Example usage:
/*
const searchParams = defineSearchParams({
  view: { type: "string", default: "table" },
  page: { type: "number", default: 1 },
  selected: { type: "boolean", default: false },
  tags: { 
    type: "array",
    default: [],
    separator: ",",
    item: {
      parse: (v) => v,
      serialize: String,
    }
  },
  ids: {
    type: "array",
    default: [],
    item: {
      parse: Number,
      serialize: String,
    }
  }
});

// Type-safe usage with nuqs
const [params, setParams] = useQueryStates(searchParams);
*/
