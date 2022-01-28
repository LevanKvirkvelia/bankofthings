import { Static, Type } from "@sinclair/typebox";
import { promiseAny, rejectOnFalse } from "../utils";
import { evalFilter } from "../evalFilter";

export const ConjunctionOperators = {
  and: {
    filter: Type.Object({
      operator: Type.Literal("and"),
      filters: Type.Array(Type.Any()),
    }),
    async func(
      property,
      filter: Static<typeof ConjunctionOperators["and"]["filter"]>,
      extras
    ) {
      try {
        return !!(await Promise.all(
          filter.filters.map((f) => rejectOnFalse(evalFilter(f, extras)))
        ));
      } catch (e) {
        return false;
      }
    },
  },
  or: {
    filter: Type.Object({
      operator: Type.Literal("or"),
      filters: Type.Array(Type.Any()),
    }),
    async func(
      property,
      filter: Static<typeof ConjunctionOperators["or"]["filter"]>,
      extras
    ) {
      try {
        return !!(await promiseAny(
          filter.filters.map((f) => rejectOnFalse(evalFilter(f, extras)))
        ));
      } catch (e) {
        return false;
      }
    },
  },
};
