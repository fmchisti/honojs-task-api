import type { AppBindings } from "./types";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound } from "./helpers/not-found";
import { onError } from "./helpers/on-error";
import myLogger from "./middleweras/pino-logger";

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
