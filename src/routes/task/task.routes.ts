import { createRoute } from "@hono/zod-openapi";
import * as z from "zod";
import { inserTaskSchema, selectTaskSchema, updateTaskSchema } from "../../db/schema.js";
import * as HttpsStatus from "../../helpers/https-status.js";
import { jsonContent } from "../../helpers/json-content.js";
import { jsonRequredContent } from "../../helpers/json-required-content.js";
import { IdParams, NotFoundSchema, NotModifiedSchema } from "../../helpers/schema.js";

const tags = ["Tasks"];
export const allTasks = createRoute({
  tags,
  method: "get",
  path: "/task",
  responses: {
    [HttpsStatus.OK]: jsonContent(
      z.array(selectTaskSchema),
      "All Tasks list",
    ),
  },
});

export const getSingle = createRoute({
  tags,
  method: "get",
  path: "/task/{id}",
  request: { params: IdParams },
  responses: {
    [HttpsStatus.OK]: jsonContent(
      selectTaskSchema,
      "The selected task",
    ),
    [HttpsStatus.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "The task not found",
    ),
  },
});

export const create = createRoute({
  tags,
  method: "post",
  path: "/task",
  request: {
    body: jsonRequredContent(
      inserTaskSchema,
      "The created task",
    ),
  },
  responses: {
    [HttpsStatus.CREATED]: jsonContent(
      selectTaskSchema,
      "The task created",
    ),
  },
});

export const update = createRoute({
  tags,
  method: "put",
  path: "/task/{id}",
  request: {
    params: IdParams,
    body: jsonRequredContent(
      updateTaskSchema,
      "The created task",
    ),
  },
  responses: {
    [HttpsStatus.OK]: jsonContent(
      selectTaskSchema,
      "The task updated",
    ),
    [HttpsStatus.PARTIAL_CONTENT]: jsonContent(
      NotModifiedSchema,
      "The task update failed",
    ),
  },
});

export const remove = createRoute({
  tags,
  method: "delete",
  path: "/task/{id}",
  request: {
    params: IdParams,
  },
  responses: {
    [HttpsStatus.OK]: jsonContent(
      z.object({
        status: z.string(),
        id: z.string().uuid(),
      }),
      "The task deleted",
    ),
    [HttpsStatus.UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({
        status: z.string(),
        messate: z.string(),
      }),
      "Task deleted falied",
    ),
  },
});

export type AllTasks = typeof allTasks;
export type GetSingle = typeof getSingle;
export type Create = typeof create;
export type Update = typeof update;
export type Remove = typeof remove;
