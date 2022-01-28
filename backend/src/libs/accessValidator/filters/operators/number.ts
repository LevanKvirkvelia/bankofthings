import { Static, Type } from "@sinclair/typebox";

export const NumberOperators = {
  number_greater_than_or_equal_to: {
    filter: Type.Object({
      operator: Type.Literal("number_greater_than_or_equal_to"),
      value: Type.Number(),
    }),
    func(
      property,
      filter: Static<
        typeof NumberOperators["number_greater_than_or_equal_to"]["filter"]
      >
    ) {
      if (typeof property !== "number") return false;
      return property >= filter.value;
    },
  },
};
