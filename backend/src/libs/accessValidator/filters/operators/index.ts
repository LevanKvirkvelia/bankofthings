import { StringOperators } from "./string";
import { NumberOperators } from "./number";
import { ConjunctionOperators } from "./conjunction";

export const Operators = {
  ...ConjunctionOperators,
  ...StringOperators,
  ...NumberOperators,
};
