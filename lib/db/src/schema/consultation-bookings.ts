import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const consultationBookingsTable = pgTable("consultation_bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  topic: text("topic").notNull(),
  message: text("message"),
  preferredAt: timestamp("preferred_at", { withTimezone: true }).notNull(),
  timezone: text("timezone").notNull(),
  status: text("status").notNull().default("new"),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertConsultationBookingSchema = createInsertSchema(
  consultationBookingsTable,
).omit({ id: true, createdAt: true, updatedAt: true });

export type InsertConsultationBooking = z.infer<
  typeof insertConsultationBookingSchema
>;
export type ConsultationBooking =
  typeof consultationBookingsTable.$inferSelect;
