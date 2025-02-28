import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "../../app";
import { jsonContent } from "../../helpers/json-content";

const tags = ["Root"];

const rootRoute = createRoute({
  tags,
  method: "get",
  path: "/",
  responses: {
    200: jsonContent(
      z
        .object({
          status: z.string(),
          message: z.string(),
        })
        .openapi({
          example: {
            status: "OK",
            message: "Index Route",
          },
        }),
      "Index Route",
    ),
  },
});

export const root = createRouter().openapi(rootRoute, (c) => {
  return c.json(
    {
      status: "OK",
      message: "Index Route Worked!",
    },
    200,
  );
});

const healtCheckRoute = createRoute({
  tags,
  method: "get",
  path: "/healthcheck",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.union([
            z.object({ name: z.string() }),
            z.object({ message: z.string() }),
          ]),
        },
      },
      description: "Health Check",
    },
  },
});

export const healthCheck = createRouter().openapi(healtCheckRoute, (c) => {
  return c.json({ message: "TEST" }, 200);
});
