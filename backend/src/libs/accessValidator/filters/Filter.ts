import { Properties } from "./properties";
import { Operators } from "./operators";

import {
  TArray,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TUnion,
  Type,
} from "@sinclair/typebox";

const FilterOperators = Object.keys(Operators).map(
  (operatorName: keyof typeof Operators) => Operators[operatorName].filter
);

const FilterProperties = Object.keys(Properties).map(
  (method: keyof typeof Properties) => Properties[method].filter
);

const SimpleFilter = Type.Object(
  {
    property: Type.Union(FilterProperties),
    filter: Type.Union(FilterOperators),
  },
  { additionalProperties: false }
);

const _Filter = Type.Rec((Self) =>
  Type.Union([
    Type.Object({
      property: Type.Optional(Type.Null()),
      filter: Type.Object(
        {
          operator: Type.Union([Type.Literal("and"), Type.Literal("or")]),
          filters: Type.Array(Self),
        },
        { additionalProperties: false }
      ),
    }),
    SimpleFilter,
  ])
);

export const Filter = _Filter as unknown as TUnion<
  [
    TObject<{
      property: TOptional<TNull>;
      filter: TObject<{
        operator: TUnion<[TLiteral<"and">, TLiteral<"or">]>;
        filters: TArray<typeof _Filter>;
      }>;
    }>,
    typeof SimpleFilter
  ]
>;
