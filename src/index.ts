import { serve } from "@hono/node-server";
import { createApp } from "./app";
import env from "./env";
import { configureApiDoc } from "./middleweras/configure-api-doc";
import { registerRoutes } from "./routes";

const app = createApp();
configureApiDoc(app);
registerRoutes(app);

// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
