import { drizzle } from "drizzle-orm/neon-http";
import env from "../env.js";
import * as schema from "./schema.js";

const db = drizzle(env.DATABASE_URL, { schema });

export default db;
