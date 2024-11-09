import { z } from "@hono/zod-openapi";

export const IdParams = z.object({
  id: z.string().uuid(),
});

export const NotFoundSchema = z.object({
  status: z.string(),
  message: z.string(),
});

export const NotModifiedSchema = z.object({
  status: z.string(),
  message: z.string(),
});
