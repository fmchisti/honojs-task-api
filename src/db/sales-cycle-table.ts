/* eslint-disable style/arrow-parens */
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const salesCycleTable = pgTable(
  "sales_cycle",
  {
    id: serial("id").primaryKey(),
    funnelId: text("funnel_id").notNull(),
    locationId: text("location_id").notNull(),
    mainProductLimit: integer("main_product_limit").default(10), // Limit before cycle resets
    upsellProductLimit: integer("upsell_product_limit").default(7), // Limit before cycle resets
    sellCompletedMainProduct: integer("sell_completed_main_product").default(0), // Sold in cycle
    sellCompletedUpsellProduct: integer(
      "sell_completed_upsell_product",
    ).default(0), // Sold in cycle
    totalCycleCompleted: integer("total_cycle_completed").default(0), // Number of full cycles completed
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniqueFunnelLocation: unique("unique_funnel_location").on(
      table.funnelId,
      table.locationId,
    ),
  }),
);
