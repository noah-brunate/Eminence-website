CREATE TABLE "site_content" (
  "kind" text NOT NULL, "id" text NOT NULL, "data" jsonb NOT NULL,
  "published_data" jsonb, "published" boolean DEFAULT false NOT NULL,
  "position" integer DEFAULT 0 NOT NULL, "published_position" integer DEFAULT 0 NOT NULL, "version" integer DEFAULT 1 NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL,
  PRIMARY KEY ("kind", "id")
);
--> statement-breakpoint
CREATE TABLE "site_seeds" ("name" text PRIMARY KEY, "created_at" timestamptz DEFAULT now() NOT NULL);
--> statement-breakpoint
CREATE TABLE "booking_replies" (
  "id" uuid PRIMARY KEY, "booking_id" uuid NOT NULL REFERENCES "consultation_bookings"("id"),
  "recipient" text NOT NULL, "subject" text NOT NULL, "message" text NOT NULL,
  "kind" text NOT NULL, "appointment_at" timestamptz, "status" text DEFAULT 'pending' NOT NULL,
  "error" text, "created_at" timestamptz DEFAULT now() NOT NULL, "sent_at" timestamptz
);
