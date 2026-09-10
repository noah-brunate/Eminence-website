import { z } from "zod";
import { pageDefaults } from "../data/page-defaults";
export type Field = {
  key: string;
  label: string;
  type: "text" | "long" | "number" | "list" | "choice" | "link" | "image";
  choices?: string[];
  required?: boolean;
};
const field = (
  key: string,
  type: Field["type"] = "text",
  required = true,
  choices?: string[],
): Field => ({
  key,
  label: key.replace(/([A-Z])/g, " $1").replace(/^./, (x) => x.toUpperCase()),
  type,
  required,
  choices,
});
export const contentFields: Record<string, Field[]> = {
  products: [
    field("slug"),
    field("name"),
    field("tagline", "long"),
    field("description", "long"),
    field("category"),
    field("status", "choice", true, ["Live", "Beta", "Coming Soon"]),
    field("features", "list"),
    field("url", "link", false),
  ],
  posts: [
    field("slug"),
    field("title"),
    field("excerpt", "long"),
    field("author"),
    field("publishedAt"),
    field("category"),
    field("readTime"),
    field("body", "long", false),
  ],
  testimonials: [
    field("clientName"),
    field("company"),
    field("role"),
    field("quote", "long"),
    field("rating", "number"),
    field("service"),
  ],
  roles: [
    field("title"),
    field("department"),
    field("location"),
    field("type"),
    field("description", "long"),
    field("postedAt"),
  ],
  stats: [
    "clientsServed",
    "projectsDelivered",
    "teamSize",
    "yearsActive",
    "countriesReached",
    "satisfactionRate",
  ].map((key) => field(key, "number")),
};
export const safeLink = (value: string) =>
  !/[\u0000-\u0020]/.test(value) &&
  (/^https?:\/\/[^/]+/i.test(value) ||
    /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    /^tel:\+?[\d()-]+$/.test(value) ||
    value === "#");
export function fieldsFor(kind: string, id: string): Field[] | undefined {
  if (kind !== "pages") return contentFields[kind];
  const fields = pageDefaults[id as keyof typeof pageDefaults];
  if (!fields) return undefined;
  return Object.entries(fields).map(([key, data]) => ({
    key,
    label: data.label,
    type:
      data.kind === "image"
        ? "image"
        : data.kind === "link"
          ? "link"
          : data.value.length > 110
            ? "long"
            : "text",
    required: true,
  }));
}
export function validateContent(kind: string, id: string, input: unknown) {
  const fields = fieldsFor(kind, id);
  if (!fields) throw new Error("Unknown content group");
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    let schema: z.ZodTypeAny;
    if (f.type === "number")
      schema = z
        .number()
        .int()
        .min(f.key === "rating" ? 1 : 0)
        .max(
          f.key === "rating"
            ? 5
            : f.key === "satisfactionRate"
              ? 100
              : 1_000_000_000,
        );
    else if (f.type === "list")
      schema = z.array(z.string().min(1).max(2000)).max(50);
    else if (f.type === "choice")
      schema = z
        .string()
        .refine((v) => f.choices!.includes(v), "Choose a supported value");
    else {
      schema = z
        .string()
        .max(f.key === "body" ? 50000 : f.type === "long" ? 10000 : 2000);
      if (f.required) schema = (schema as z.ZodString).min(1);
      if (f.type === "link" || f.type === "image")
        schema = schema.refine(
          (v) =>
            (v === "" && !f.required) ||
            (f.type === "image" ? /^https?:\/\/[^\s]+$/.test(v) : safeLink(v)),
          "Enter a valid URL",
        );
      if (f.key === "slug")
        schema = schema.refine(
          (v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v),
          "Use lowercase words separated by hyphens",
        );
      if (f.key === "publishedAt" || f.key === "postedAt")
        schema = schema.refine(
          (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)),
          "Use YYYY-MM-DD",
        );
    }
    shape[f.key] = f.required ? schema : schema.nullish();
  }
  if (kind !== "pages" && kind !== "stats") shape.id = z.literal(id).optional();
  const result = z.object(shape).strict().safeParse(input);
  return result;
}
