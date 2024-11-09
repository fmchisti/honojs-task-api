import * as z from "zod";
import "dotenv/config";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3250),
  DATABASE_URL: z.string(),
});

// eslint-disable-next-line node/no-process-env
const env = EnvSchema.parse(process.env);
export default env;
