import { Static, Type } from "@sinclair/typebox";

const filterType = (name: string) =>
  Type.Object({
    operator: Type.Literal("number_greater_than_or_equal_to"),
    value: Type.Union([Type.Number(), Type.RegEx(/^\d*\.?\d*$/)]),
  });
export const NumberOperators = {
  number_greater_than_or_equal_to: {
    filter: filterType("number_greater_than_or_equal_to"),
    func(
      property,
      filter: Static< 
        typeof NumberOperators["number_greater_than_or_equal_to"]["filter"]
      >
    ) {
      if (typeof property !== "number") return false;
      return property >= Number(filter.value);
    },
  },
  number_less_than_or_equal_to: {
    filter: filterType("number_less_than_or_equal_to"),
    func(
      property,
      filter: Static<
        typeof NumberOperators["number_less_than_or_equal_to"]["filter"]
      >
    ) {
      if (typeof property !== "number") return false;
      return property <= Number(filter.value);
    },
  },
  number_greater_than: {
    filter: filterType("number_greater_than"),
    func(
      property,
      filter: Static<typeof NumberOperators["number_greater_than"]["filter"]>
    ) {
      if (typeof property !== "number") return false;
      return property > Number(filter.value);
    },
  },
  number_less_than: {
    filter: filterType("number_less_than"),
    func(
      property,
      filter: Static<typeof NumberOperators["number_less_than"]["filter"]>
    ) {
      if (typeof property !== "number") return false;
      return property < Number(filter.value);
    },
  },
  number_equal_to: {
    filter: filterType("number_equal_to"),
    func(
      property,
      filter: Static<typeof NumberOperators["number_equal_to"]["filter"]>
    ) {
      if (typeof property !== "number") return false;
      return property == Number(filter.value);
    },
  },
};
