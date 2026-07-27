# Locascoot Djerba

Website for Locascoot Djerba — scooter rental in Djerba, Tunisia. Live domain: `locascootdjerba.tn`

Static-rendered, mobile-first, bilingual (French / English), built for local SEO.

> **Vous voulez modifier les prix, les photos ou les véhicules ?**
> Tout est expliqué en français dans **[EDITING-GUIDE.md](./EDITING-GUIDE.md)** — aucune connaissance technique nécessaire.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| i18n | next-intl, localised URLs (`/tarifs` ↔ `/en/prices`) |
| Palette | Brand navy `#16294a` and gold `#fdb913`, from the logo |
| Content | Typed files in `content/`, behind a CMS-ready API |
| Forms | React Hook Form + Zod → Resend |
| Images | `next/image`, AVIF/WebP |
| Hosting | Vercel (static, free tier is sufficient) |

Every page is prerendered at build time. There is no database and no runtime CMS.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | Type-check without emitting |
| `npm run optimize-images` | Resize and compress photos in `public/images` |
| `npm run generate-placeholders` | Fill in any *missing* image. Never overwrites an existing file |

---

## Project structure

```
content/            ← everything the owner edits
├── site.ts           phone, WhatsApp, email, hours, logo, currency
├── vehicles/         one file per scooter, plus index.ts
├── zones.ts          delivery areas (also generate landing pages)
└── faq.ts            rental conditions Q&A (published as structured data)

messages/           ← all interface text: fr.json, en.json

src/
├── app/[locale]/     pages
├── components/       layout · sections · vehicle · forms · seo · ui
├── content.ts        ⭐ the content API — the only module that reads content/
├── lib/              seo.ts · schema.ts · site.ts · vehicle-utils.ts
├── i18n/             routing, localised pathnames, navigation
└── styles/           design tokens

public/images/      logo.png · vehicles/ · hero/ · about/ · og/
```

### The content boundary

Pages never import from `content/` directly — they go through **`src/lib/content.ts`**.
Those functions are `async` even though reading local files is instant, because a CMS
call would be. Moving to Sanity later means rewriting the bodies of that one module;
no component changes.

Keep that rule and the migration stays a drop-in.

---

## SEO

Built in from the start, not added afterwards:

- **Metadata** generated per page and per language via `buildMetadata()` — canonical URL, full hreflang matrix (`fr`, `en`, `x-default`), Open Graph and Twitter cards.
- **Localised URLs** — `/tarifs` in French, `/en/prices` in English. French serves from the domain root.
- **Structured data** (`src/lib/schema.ts`):
  - `AutoRental` + `LocalBusiness` with geo, hours and address → local pack eligibility
  - `Product` + `Offer` per vehicle → daily price can appear in search results
  - `FAQPage` → answers can expand under the result
  - `BreadcrumbList`, `Service` per delivery zone, `WebSite`
- **Zone landing pages** — `/zones/houmt-souk`, `/midoun`, `/zone-touristique`, `/aghir`, `/aeroport-djerba`, targeting local searches with thin competition.
- **No fabricated signals** — no invented reviews, and `aggregateRating` is only published once `reviews.count` in `content/site.ts` is a real number.
- **`sitemap.xml`** generated from content, with per-entry language alternates. Add a scooter and it appears automatically.
- **Images** — descriptive localised `alt` text derived from vehicle data; AVIF/WebP; hero and first cards marked `priority`.

Validate structured data at [search.google.com/test/rich-results](https://search.google.com/test/rich-results).

---

## Deployment

1. Push to GitHub
2. Import the repository at [vercel.com](https://vercel.com) — the defaults are correct
3. Add your domain in **Settings → Domains**
4. Set `url` in `content/site.ts` to that domain (it drives every canonical and sitemap URL)

Every push redeploys automatically. A failed build leaves the previous version online.

### Environment variables

The booking form works without any configuration — submissions are logged and the
visitor is offered the WhatsApp fallback. To receive enquiries by email:

| Variable | |
|---|---|
| `RESEND_API_KEY` | From [resend.com](https://resend.com) (free tier) |
| `BOOKING_EMAIL_TO` | Where enquiries are sent. Defaults to the address in `site.ts` |
| `BOOKING_EMAIL_FROM` | A verified sender on your domain |

---

## After launch

The site is only half of local SEO. The rest:

1. **Google Business Profile** — claim it, add real photos, exact opening hours, and the website link. For a local rental business this drives more bookings than anything on the site itself.
2. **Google Search Console** — add the property and submit `https://your-domain.com/sitemap.xml`.
3. **Collect real reviews** — send your Google review link by WhatsApp the evening a customer returns the scooter. Then set `reviews.count` in `content/site.ts` to enable star ratings in search results.
4. **Analytics** — Vercel Analytics or Plausible. Both are cookieless, so no consent banner is needed.

---

## Current state

Business details, pricing, fleet, FAQ and SEO metadata are real production data.
Outstanding before launch:

- **Legal pages** — templates carrying a visible warning banner until reviewed. This is the only
  outstanding item.

Everything else is final: domain (`locascootdjerba.tn`), address, GPS coordinates, contact
details, hours, pricing, the two-scooter fleet, all photography and the logo.

## Notes

- Prices are one flat daily rate per scooter. The pricing model supports duration bands: add more entries to `pricing` and every table on the site adapts.
- No deposit is taken, so deposit columns and copy are hidden automatically. Set `deposit` on a vehicle to bring them back.
- Booking takes no payment. The form posts to a rate-limited handler that emails the enquiry, and offers a WhatsApp link pre-filled with name, phone, scooter, dates, duration, total and delivery location.
- Adding a language: add it to `src/i18n/routing.ts`, add `messages/<locale>.json`, add its slugs to `pathnames`, and add the language to the translated fields in `content/`. No component changes.
