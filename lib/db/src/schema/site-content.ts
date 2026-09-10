import {
  pgTable,
  text,
  integer,
  jsonb,
  boolean,
  timestamp,
  primaryKey,
  foreignKey,
  uuid,
} from "drizzle-orm/pg-core";
import { consultationBookingsTable } from "./consultation-bookings";

export const siteContentTable = pgTable(
  "site_content",
  {
    kind: text("kind").notNull(),
    id: text("id").notNull(),
    data: jsonb("data").$type<Record<string, unknown>>().notNull(),
    publishedData: jsonb("published_data").$type<Record<string, unknown>>(),
    published: boolean("published").notNull().default(false),
    position: integer("position").notNull().default(0),
    publishedPosition: integer("published_position").notNull().default(0),
    version: integer("version").notNull().default(1),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ name: "site_content_pkey", columns: [table.kind, table.id] })],
);

export const siteSeedsTable = pgTable("site_seeds", {
  name: text("name").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bookingRepliesTable = pgTable("booking_replies", {
  id: uuid("id").primaryKey(),
  bookingId: uuid("booking_id").notNull(),
  recipient: text("recipient").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  kind: text("kind").notNull(),
  appointmentAt: timestamp("appointment_at", { withTimezone: true }),
  status: text("status").notNull().default("pending"),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
}, table => [foreignKey({ name: "booking_replies_booking_id_fkey", columns: [table.bookingId], foreignColumns: [consultationBookingsTable.id] })]);
