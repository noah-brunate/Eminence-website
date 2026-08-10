# EMINENCE Company Website

A professional tech company marketing and lead-generation website for EMINENCE — showcasing Software Solutions, Cloud Hosting, Consultancy, and a portfolio of proprietary software products. Includes a blog, careers page, testimonials, contact forms, and a live chat support widget.

## Run & Operate

- `pnpm --filter @workspace/eminence-website run dev` — run the frontend (port assigned by env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, wouter (routing), react-hook-form + zod
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (v3), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/eminence-website/src/pages/` — all page components (home, services/*, products, blog, about, careers, testimonials, contact, privacy, terms)
- `artifacts/eminence-website/src/components/` — shared components (navbar, footer, chat-widget, animations, theme-provider, ui/*)
- `artifacts/api-server/src/routes/` — API route handlers (contact, newsletter, careers, chat, content)
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/` — Drizzle schema files (contact-submissions, newsletter-subscribers, job-applications, chat-messages)
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — generated Zod schemas (do not edit)

## Brand

- Primary: `#1F3864` (deep navy)
- Accent: `#2563EB` (bright blue)
- Teal: `#0F6E56`
- Amber: `#C08B2C`
- Background: `#F8F9FB` / Dark: `#0D1117`
- Font: Inter (Google Fonts)

## Architecture decisions

- Forms (contact, newsletter, job applications, chat) save to Replit's built-in PostgreSQL via the Express API server — NOT Supabase (Replit provides its own DB; migrate to Supabase post-launch if needed).
- All static content (products, testimonials, blog posts, job roles, company stats) is served as hardcoded data from `artifacts/api-server/src/routes/content.ts` and `careers.ts` — no CMS.
- Dark/light mode toggle persists to localStorage via a ThemeProvider.
- API contract lives in `lib/api-spec/openapi.yaml`; never hand-write types that codegen produces.

## Product

- Home: hero with animated tagline, stats counter, services overview, featured products, testimonials carousel, blog preview, newsletter signup
- Services: Software Solutions, Cloud Hosting, Consultancy (with booking section) — each a dedicated page
- Products: portfolio grid + individual product detail pages
- Blog: listing + post detail pages
- About, Careers (with application form), Testimonials, Contact
- Live chat support widget (floating, persists across all pages)
- Dark/light mode toggle in navbar

## User preferences

- Dark mode support with toggle
- Live chat support widget
- Forms save to database

## Gotchas

- After any OpenAPI spec change, always run `pnpm --filter @workspace/api-spec run codegen` before touching the frontend.
- After adding new DB schema files, run `pnpm run typecheck:libs` before checking API server typecheck — otherwise module resolution fails.
- Do NOT use `zod.email()` or `zod.int()` in the OpenAPI spec (format: email / type: integer) — this project uses Zod v3; use plain `type: string` and `type: number` instead.
- `>` characters inside JSX text content must be escaped as `{'>'}`  — particularly in code snippet display elements.
- All DB writes go through the Express API server using the service-role pattern (no client-side DB access).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
