import type { OpenAPIHono } from "@hono/zod-openapi";
import type { AppBindings } from "../types";
import { healthCheck, root } from "./root/index.route";

export function registerRoutes(app: OpenAPIHono<AppBindings>) {
  const routes = [root, healthCheck] as const;
  routes.forEach((route) => {
    app.route("/", route);
  });

  // eslint-disable-next-line no-console
  console.log("Router Register Completed!");
}
