import { createParser, parseAsInteger, useQueryStates } from "nuqs";

// The page index parser is zero-indexed internally,
// but one-indexed when rendered in the URL,
// to align with your UI and what users might expect.
const pageIndexParser = createParser({
  parse: (query) => {
    const page = parseAsInteger.parse(query);
    return page === null ? null : page - 1;
  },
  serialize: (value) => {
    return parseAsInteger.serialize(value + 1);
  },
});

const paginationParsers = {
  pageIndex: pageIndexParser
    .withDefault(0)
    .withOptions({ clearOnDefault: false }),
  pageSize: parseAsInteger
    .withDefault(20)
    .withOptions({ clearOnDefault: false }),
};

const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "pageSize",
};

export function usePaginationQueryStates() {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
  });
}
