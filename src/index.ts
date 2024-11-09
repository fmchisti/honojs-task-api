import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import env from "./env.js";
import { configureApiDoc } from "./middleweras/configure-api-doc.js";
import indexRoute from "./routes/index.route.js";
import task from "./routes/task/task.index.js";

const app = createApp();
configureApiDoc(app);
const routes = [indexRoute, task];

routes.forEach(route => app.route("/", route));
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
