import { Static } from "@sinclair/typebox";
import { Filter } from "./Filter";
import { Operators } from "./operators";
import { Properties } from "./properties";

export async function evalFilter(
  filterDescription: Static<typeof Filter>,
  extras: any
) {
  const { filter, property } = filterDescription;
  const propertyResult = property?.method
    // @ts-ignore
    ? await Properties[property.method].func(property.parameters, extras)
    : null;

  return Operators[filter.operator].func(propertyResult, filter, extras);
}
