import type { AppHandler } from "../../types/index.js";
import type { AllTasks, Create, GetSingle, Remove, Update } from "./task.routes.js";
import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import { taskTable } from "../../db/schema.js";

export const getAll: AppHandler<AllTasks> = async (c) => {
  const tasks = await db.query.taskTable.findMany();
  return c.json(tasks, 200);
};

export const getOne: AppHandler<GetSingle> = async (c) => {
  const { id } = c.req.valid("param");
  const tasks = await db.query.taskTable.findFirst({
    where: (taskTable, { eq }) => eq(taskTable.id, id),
  });

  if (!tasks) {
    return c.json({
      status: "Failed",
      message: "Task not found",
    }, 404);
  }

  return c.json(tasks, 200);
};

export const create: AppHandler<Create> = async (c) => {
  const task = c.req.valid("json");
  const [createdTask] = await db.insert(taskTable)
    .values(task)
    .returning();

  return c.json(createdTask, 201);
};

export const update: AppHandler<Update> = async (c) => {
  const task = c.req.valid("json");
  const { id } = c.req.valid("param");

  if (Object.values(task).length === 0) {
    return c.json({
      status: "Failed",
      message: "name or done one-of property is required",
    }, 206);
  }

  const [updateTask] = await db.update(taskTable)
    .set(task)
    .where(eq(taskTable.id, id))
    .returning();

  return c.json(updateTask, 200);
};

export const remove: AppHandler<Remove> = async (c) => {
  const { id } = c.req.valid("param");
  const [deletedTask] = await db.delete(taskTable)
    .where(eq(taskTable.id, id))
    .returning();

  if (deletedTask) {
    return c.json({
      id: deletedTask.id,
      status: "success",
    }, 200);
  }

  return c.json({
    messate: "Task not found",
    status: "failed",
  }, 422);
};
