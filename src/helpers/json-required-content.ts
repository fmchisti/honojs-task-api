import type { ZodSchema } from "../types";

export function jsonRequredContent<T extends ZodSchema>(
  schema: T,
  description: string,
) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
    required: true,
  };
}
