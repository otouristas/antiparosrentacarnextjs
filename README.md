# AGGELOS Rentals — Antiparos & Paros (Next.js 16)

Greenfield rebuild of [antiparosrentacar.com](https://antiparosrentacar.com).

## Stack

- Next.js 16 App Router + React 19 + Tailwind 4
- next-intl (11 locales, English unprefixed)
- GoCars BFF (`/api/gocars/*`) using ported `gocars-core`
- Deploy target: **Netlify** (OpenNext adapter, zero-config)

## Develop

```bash
npm install
npm run dev
```

Requires Node.js 22+.

## GoCars smoke test

```bash
curl -s 'http://localhost:3000/api/gocars/locations' | head
curl -s 'http://localhost:3000/api/gocars/search?pickup_id=1&return_id=1&date_from=27/07/2026&time_from=10:00&date_to=30/07/2026&time_to=10:00&age_group_id=28&vehicle_type=car&lang=en' | head
```

## Deploy on Netlify

1. Connect this GitHub repo in the [Netlify Dashboard](https://app.netlify.com/).
2. Build settings come from `netlify.toml` (`npm run build`, publish `.next`, Node 22).
3. Confirm Site settings → Build & deploy → **Framework** is Next.js (or blank so auto-detect works). Do **not** set Publish directory to `out` or `public`.
4. After deploy, the build log must mention `@netlify/plugin-nextjs` / Next.js runtime. If you only see static files published from `.next` with no plugin, you will get Netlify’s “Page not found”.
5. Optional environment variables:
   - `CONTACT_WEBHOOK_URL` — contact form forwarding
   - `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console meta
   - `NETLIFY_NEXT_SKEW_PROTECTION=true` — skew protection

English URLs are under `/en/` (locale prefix is always on). `/` redirects via middleware.

## Brand

- Navy `#112553` · Yellow `#F9E527` · Sky `#BEEBFF`
- Brand name always **AGGELOS Rentals**
