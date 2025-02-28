import type {
  OpenAPIHono,
  RouteConfig,
  RouteHandler,
  z,
} from "@hono/zod-openapi";

export interface AppBindings {}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type ZodSchema = z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
export type AppHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
