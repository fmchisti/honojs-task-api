import { z } from "@hono/zod-openapi";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const taskTable = pgTable("task", {

  id: uuid().defaultRandom().primaryKey().notNull(),

  name: varchar({ length: 255 }).notNull(),
  done: boolean().default(false).notNull(),

  createdAt: timestamp().defaultNow().notNull(),
  updateAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const selectTaskSchema = createSelectSchema(taskTable);
export const inserTaskSchema = createInsertSchema(taskTable)
  .required({
    done: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updateAt: true,
  });

export const updateTaskSchema = inserTaskSchema.partial();
