import { Static, Type } from "@sinclair/typebox";

export const StringOperators = {
  string_contains: {
    filter: Type.Object({
      operator: Type.Literal("string_contains"),
      value: Type.String(),
    }),
    func(
      property,
      filter: Static<typeof StringOperators["string_contains"]["filter"]>
    ) {
      return String(property).includes(filter.value);
    },
  },
};
