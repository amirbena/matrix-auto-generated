import { tags } from "typia";

export type CalculationInfoResult = {
  result: number &
    tags.JsonSchemaPlugin<{
      format: "double";
      example: 3;
    }>;
};
