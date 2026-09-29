# Spindle — Independent Record Room

A premium, responsive Next.js 16 music discovery UI powered by Audius.

## Local setup

Create `.env.local`:

```env
AUDIUS_APP_NAME=Spindle
AUDIUS_API_KEY=
AUDIUS_BEARER_TOKEN=
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@your-domain.com
```

Then:

```bash
npm install
npm run dev
```

Production check:

```bash
npm run typecheck
npm run build
npm start
```

## Cloudflare Workers

This project keeps every Audius API Route Handler on the Edge runtime:

```ts
export const runtime = "edge";
```

That is already present in:

- `/api/audius/search`
- `/api/audius/trending`
- `/api/audius/track/[id]`
- `/api/audius/stream/[id]`

For the current Cloudflare deployment flow, Cloudflare recommends running Next.js applications on Workers and provides automatic configuration for existing Next.js projects. From the project root:

```bash
npx wrangler deploy
```

For a Workers preview, use the Cloudflare-supported adapter workflow rather than assuming the normal Node `next start` runtime is identical to production.

Set the Audius variables in Cloudflare Workers **Build variables and secrets** / environment settings before deployment. Keep `AUDIUS_API_KEY` and `AUDIUS_BEARER_TOKEN` server-side; only `NEXT_PUBLIC_*` values are safe to expose to the browser.

## Design

- Responsive mobile-first navigation and player
- Touch-friendly controls and horizontal music rails
- Premium editorial / record-store visual language
- Local-only My Crate favourites
- Resilient remote artwork fallback
- SVG logo + favicon + web manifest
- Accessible focus states and reduced-motion support
- Loading and route error states
