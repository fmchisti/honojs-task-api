import type { OpenAPIHono, RouteConfig, RouteHandler, z } from "@hono/zod-openapi";

export interface AppBindings {}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
export type AppHandler<R extends RouteConfig> =
 RouteHandler<R, AppBindings>;
