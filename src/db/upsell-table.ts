/* eslint-disable style/arrow-parens */
import {
  decimal,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

// Upsell Sales Table
export const upsellTable = pgTable(
  "upsell",
  {
    id: serial("id").primaryKey(),
    funnelId: text("funnel_id"),
    locationId: text("location_id"),
    contactId: text("contact_id"),
    locationName: text("location_name"),
    pageId: text("page_id"),
    orderId: text("order_id"),
    productId: text("product_id"),
    productName: text("product_name"),
    amount: decimal("amount", { precision: 10, scale: 2 }),
    amountReceived: decimal("amount_received", { precision: 10, scale: 2 }),
    paymentMethod: text("payment_method"),
    email: text("email"),
    phone: text("phone"),
    customerId: text("customer_id"),
    receiptUrl: text("receipt_url"),
    workflowId: text("workflow_id"),
    workflowName: text("workflow_name"),
    fullAddress: text("full_address"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniqueFunnelLocationContactUpsell: unique(
      "unique_funnel_location_contact_upsell",
    ).on(table.funnelId, table.locationId, table.contactId),
  }),
);
