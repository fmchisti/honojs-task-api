import type { AppBindings } from "./types/index.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound } from "./helpers/not-found.js";
import { onError } from "./helpers/on-error.js";
import myLogger from "./middleweras/pino-logger.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            ok: false,
            errors: "Not Wordked",
            source: "custom_error_handler",
          },
          422,
        );
      }
    },
  });
}

export function createApp() {
  const app = createRouter();
  app.use(myLogger());
  app.notFound(notFound);
  app.onError(onError);

  return app;
}
