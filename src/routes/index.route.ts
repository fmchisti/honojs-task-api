import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "../app.js";
import { jsonContent } from "../helpers/json-content.js";

const indexRoute = createRoute({
  tags: ["Root"],
  method: "get",
  path: "/",
  responses: {
    200: jsonContent(z.object({
      status: z.string(),
      message: z.string(),
    }).openapi({
      example:
                 {
                   status: "OK",
                   message: "Index Route",
                 },
    }), "Index Route"),
  },
});

const index = createRouter().openapi(indexRoute, (c) => {
  return c.json({
    status: "OK",
    message: "Index Route Worked!",
  }, 200);
});

export default index;
