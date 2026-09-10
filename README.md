# EMINENCE Company Website

A professional tech company marketing and lead-generation website for EMINENCE — showcasing Software Solutions, Cloud Hosting, Consultancy, and a portfolio of proprietary software products. Includes a blog, careers page, testimonials, contact forms, and a live chat support widget.

## Run & Operate

- `pnpm --filter @workspace/eminence-website run dev` — run the frontend (port assigned by env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/db run migrate` — apply committed migrations in production
- Required env: `DATABASE_URL` — Postgres connection string
- Contact email env: `CONTACT_NOTIFICATION_TO` (defaults to `info@eminence.co.ug`),
  `SMTP_HOST`, `SMTP_PORT` (usually `465` for TLS or `587` for STARTTLS),
  `SMTP_USER`, and `SMTP_PASS`. Submissions are always saved to PostgreSQL;
  email delivery is skipped with a warning when SMTP credentials are incomplete.
- Booking administration: open `/admin/bookings` and sign in with email and password.
  Create or reset the account from the project root:
  `pnpm --filter @workspace/api-server admin:setup you@example.com`.
  This generates a password, prints it once, and writes `ADMIN_EMAIL` and a salted
  scrypt `ADMIN_PASSWORD_HASH` to the API `.env`. Save the password in a password
  manager. The old `ADMIN_API_KEY` is removed and no longer accepted.
- After setup, stop the existing API process and run
  `pnpm --filter @workspace/api-server dev` (builds and starts in development),
  then refresh the admin page. Exported environment variables override `.env`:
  remove stale `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` overrides in your process manager.
- Production: run setup in the actual deployed API directory (local `.env` is not
  copied by the deployment script), rebuild both apps, and restart the API process.
  Serve the site and `/api` on the same origin over HTTPS with `NODE_ENV=production`;
  production session cookies are Secure. Ensure the process manager loads the API
  `.env` or has matching environment variables. Use a single API process: sessions
  and login limits are held in memory. Sessions expire after eight hours and all
  sessions end on restart. Multiple workers require a shared session/rate-limit store.
  The API expects one trusted reverse proxy; prevent direct public access to the API
  port so client IP rate limiting cannot be bypassed with forwarded headers.
- Admin authentication checks: `pnpm --filter @workspace/api-server test:admin`.
  The test uses a temporary localhost server and does not access the booking database.

## Stack

- pnpm workspaces, Node.js 20.19+, TypeScript 5.9
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

## Website content administration

Open `/admin` (the existing `/admin/bookings` address also works) and use the
existing administrator login. Website content includes products, full blog
articles, testimonials, job openings, statistics, and the fixed pages' text,
existing image URLs, contact links, social links and navigation labels. The
public page structure, styling, route structure and authentication stay in code.

The API now applies committed migrations before listening, then initializes the
existing dummy content in a transaction. `site_seeds` records completion. Seeding
never overwrites existing records and subsequent starts do not recreate deleted
content. Do not remove the seed marker to refresh data; use the admin editor.
New future seed versions should be separate, additive migrations/seed steps.
The API database account must be able to apply these migrations. The build copies
migration files into `dist/migrations`, which must be deployed with the bundle.

Use **Save draft** for private edits and **Publish changes** to update the public
website. Collection records can be added, unpublished or deleted. Fixed pages
cannot be added, hidden, reordered or deleted. Version checks prevent stale tabs
from overwriting newer edits. Public queries refresh on focus and periodically
within about a minute; publishing refreshes the current browser's query cache.
Public page text uses existing copy as a fallback if the content API is unavailable.

Blog article formatting supports paragraphs, `##`/`###` headings, `>` quotations,
`-` list items and `**bold**`. HTML is escaped, not executed. Image fields accept
hosted HTTP(S) image URLs; file upload/storage is not part of this implementation.
Global browser/social metadata is under **Page text & links → Seo**; metadata
updates in the browser, so server-rendered search/social previews remain future work.

Under **Bookings & consultations**, open a booking's response panel to send a
general email, confirm an appointment or propose another time. Appointment entry
uses the administrator browser's timezone and the email displays the customer's
timezone. Messages go to the booking's stored email address. Internal notes are
never included. Mail server acceptance is recorded in response history; it does
not prove inbox delivery. SMTP must be configured or the response is recorded as
failed/unconfirmed. No automatic retries occur; check history before composing
another response after an uncertain send. A confirmed email changes status to
scheduled, and a first general/proposal response changes new to contacted.
Customer email replies go to the configured reply-to mailbox, not this panel.

Validation: `pnpm --filter @workspace/api-server test:content` creates and removes
an isolated temporary PostgreSQL database using the configured local database
account. It verifies migration/seeding, draft/public behavior, version conflicts,
validation, authentication/CSRF and response sending with mocked email transport.
No real emails are sent. Run `pnpm --filter @workspace/api-server build` first so
the test can use `dist/migrations`.
