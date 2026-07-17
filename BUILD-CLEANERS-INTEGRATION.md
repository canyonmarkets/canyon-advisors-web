# BUILD: Canyon Cleaners Integration + Family Rework — canyon-advisors.com

**Written:** 2026-07-16 (Fable, ultracode session) · **Executor:** Opus/Sonnet in Claude Code
**Repo:** this repo (`canyon-advisors-web`). Do NOT touch the canyon-apts or canyon-markets repos (apts has heavy uncommitted in-flight work).
**Scope:** add Canyon Cleaners as the third company, rewrite the firm story (seven-brothers copy is being retired), add a family photo section, stress woman-owned/family-run positioning, plus verified piggyback fixes.

---

## Ground rules (non-negotiable)

1. **One push.** Per Jeff's global workflow: make ALL changes locally, verify in the browser (`npm run dev`), then a single commit + push at the end. Netlify auto-deploys from GitHub `main`.
2. **`components/Hero.tsx` already contains an uncommitted change** — H1 says "Thirty Years of **Business** Expertise" (was "Real Estate"). PRESERVE it. Never checkout/stash/revert this file. It ships in your final commit.
3. **Run `npm install` first.** `resend` was missing from local node_modules (fixed once already on 2026-07-16, but verify `node_modules/resend` exists).
4. **Command gotcha — the `&` in this repo's path (`PERSONAL & GCU PROJECTS`) breaks Windows cmd shims.** `npx tsc`, `npm run build`, and `npm run dev` ALL fail from BOTH Git Bash and PowerShell (`'GCU' is not recognized` / truncated module path). Use direct node invocations only:
   - typecheck: `node node_modules/typescript/bin/tsc --noEmit`
   - build: `node node_modules/next/dist/bin/next build`
   - dev server: `node node_modules/next/dist/bin/next dev`
   - Plain `npm install` is safe.
   - Expected typecheck baseline: exactly ONE pre-existing error — `next.config.ts(4,3) TS2353` on the `eslint` key — until Phase 4.1 removes it. After Phase 4.1, 0 errors is the gate.
5. **Next.js 16.2.6 gotchas (verified against node_modules/next/dist/docs):**
   - `priority` prop on `<Image>` is deprecated → use `preload` or omit entirely.
   - Do NOT pass a `quality` prop on `<Image>` — `images.qualities` defaults to `[75]`; other values log a warning and get snapped to 75 (and 400 on direct image-API requests). Just omit it.
   - The `eslint` key no longer exists on `NextConfig` (it's a TS error, see Phase 4).
6. **Sequencing:** Phase 1 (cleaners site live on the subdomain) MUST be completed before the final push of this repo, or the new company card links to a 404 in production.

---

## Phase 1 — Put the Cleaners site on cleaners.canyon-advisors.com (FIRST)

Verified context: canyon-cleaners repo (`C:/Users/jeffm/Documents/CLAUDE/VENDING/canyon-cleaners`, remote `canyonmarkets/canyon-cleaners`) is a no-build static site already live at **canyon-cleaners.netlify.app**. canyon-advisors.com DNS is at **GoDaddy** (ns33/ns34.domaincontrol.com). `canyon-cleaners.com` is owned by a third party — that is WHY we're using the subdomain; never link to canyon-cleaners.com.

These are dashboard steps — walk Jeff through them or have him drive:

1. Netlify (canyonmarkets team) → the **canyon-cleaners** site → Domain management → Add domain → `cleaners.canyon-advisors.com`. (The first custom domain on a site usually becomes primary automatically — that's fine.)
2. GoDaddy → canyon-advisors.com → DNS → Add record: **CNAME | Name `cleaners` | Value `canyon-cleaners.netlify.app` | TTL 1hr**.
3. Netlify: wait for DNS check → provision Let's Encrypt cert (auto; click Verify/Provision if stalled).
4. Confirm `cleaners.canyon-advisors.com` is the **primary domain** (so the netlify.app URL 301s to it); set it if not.
5. Smoke test: `https://cleaners.canyon-advisors.com` loads with padlock; http→https redirects.

## Phase 2 — Family photos → public/family/

Source masters: `Family Photos/` at repo root (6 JPGs, square, 2.7–3.3k px). **Do not commit the masters**: add `Family Photos/` to `.gitignore` (folder is untracked, so the ignore entry alone suffices).

Generate 4 web copies with sharp (already in node_modules — Next 16 bundles it). One-off script — name it `gen-family.mjs` at repo root (`.mjs` is required: package.json has no `"type": "module"`), run with `node gen-family.mjs`, and **delete it before the Phase 5 typecheck**. Pattern:

```js
import sharp from 'sharp';
import fs from 'node:fs';
fs.mkdirSync('public/family', { recursive: true }); // sharp .toFile() does NOT create dirs
// for each: .resize(1200, 1200, { fit: 'cover' }).webp({ quality: 80 }).toFile(out)
```

| Source (in `Family Photos/`) | Output |
|---|---|
| `martinfamily-149 (1).jpg` (Jeff + Joleen) | `public/family/founders.webp` |
| `martinfamily-88-EDIT (1).jpg` (three daughters) | `public/family/daughters.webp` |
| `martinfamily-109-EDIT (1).jpg` (daughter + husband) | `public/family/next-gen-couple.webp` |
| `martinfamily-20-EDIT (1).jpg` (young family, 3 kids) | `public/family/next-gen-family.webp` |

Sources are square and watermark-free (professional shoot) — plain center cover-crop is fine. Eyeball all 4 outputs (Read as images): faces centered, no distortion. Approved design mockup for reference: https://claude.ai/code/artifact/18a539b2-7580-4dfc-9eba-ec1967eabb13

## Phase 3 — Code + copy changes

All copy below is FINAL (owner-approved via judge-panel deck, Jul 16). Don't editorialize. Where a snippet says "exact", use it verbatim.

### 3.1 `components/Hero.tsx`
Keep H1 (already reads Business). Replace the subheadline paragraph text (currently "Canyon Advisors is a family-owned real estate consulting, investment, and management firm. We connect investors…") with, exact:

> Canyon Advisors is a woman-owned, family-run firm with deep real-estate roots in Phoenix — and the parent company of three businesses: workplace micro-markets, furnished rentals, and professional cleaning. What the first generation built, the second now helps run.

Leave the "Phoenix · Dallas · Memphis · Nationwide" line and CTAs untouched.

### 3.2 `components/TheFirm.tsx` — retire the seven-brothers story
Four replacements, keep all wrappers/classNames/structure:

- **Kicker** (line ~26): `Who We Are` → `Since 1993`
- **H2** (line ~29): `A Family Built on Real Estate` → `Two Generations, One Standard`
- **Story paragraphs** (three `<p>` in the gap-5 flex div, lines ~32-51) — replace all three, exact:
  1. > Canyon Advisors was founded in Phoenix in 1993. It is woman-owned and family-run — and it has been from the beginning. Thirty years of building businesses, one at a time, under one name.
  2. > Today the firm is the parent company of three operating businesses: workplace micro-markets, furnished short-term rentals, and a women-run cleaning company, all serving the Phoenix metro. Each was built the same way. Start small. Do the work. Earn the next customer.
  3. > Now the second generation is in the business — raised in it, not recruited to it. Three daughters followed their mother's footsteps, and the two sons who married into the family work in the companies alongside her. Seven family members, two generations, the same name on the door since 1993.
- **STATS const** (lines ~3-8) — replace the four `{value,label}` pairs: `30+`/`Years in Business`, `3`/`Family Companies`, `2`/`Generations`, `7`/`Family Members — One Team`
- **CREDENTIALS const + its render block** (const at lines ~10-15, render loop ~54-63): **DELETE both entirely.** The claims (PhD/MBA, General Contractors, licensed AZ-TX-TN, active investors) were tied to the old story and are not re-verified. Do not re-add.
- **Import line (line 1):** after deleting CREDENTIALS, `Award`, `Users`, `MapPin`, and `Briefcase` are all unused — delete the entire `import { ... } from 'lucide-react';` line. Nothing else in the file uses lucide.
- Keep the "Markets Served" dark chip card untouched. (Dallas/Memphis references elsewhere: LEAVE AS-IS, Jeff confirming separately.)

### 3.3 NEW `components/FamilySection.tsx` + mount in `app/page.tsx`
Server component (no `'use client'`), section `id="family"`, `bg-stone-50 px-6 py-24`, mounted in `app/page.tsx` **between `<TheFirm />` and `<Services />`** (import after TheFirm's). Background rhythm stays: white → stone-50 → iron-800.

```tsx
import Image from 'next/image';

const PHOTOS = [
  { src: '/family/founders.webp', alt: 'The founders of Canyon Advisors' },
  { src: '/family/daughters.webp', alt: 'The three daughters of the Canyon family' },
  { src: '/family/next-gen-couple.webp', alt: 'The next generation of the Canyon family' },
  { src: '/family/next-gen-family.webp', alt: 'A young family of the next generation of the Canyon family' },
] as const;

export default function FamilySection() {
  return (
    <section id="family" className="bg-stone-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-600 font-mono text-base tracking-[0.3em] uppercase mb-4">
            Two Generations
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-iron-900">
            One Family. One Team.
          </h2>
          <p className="mt-5 text-iron-900 text-base leading-relaxed max-w-xl mx-auto">
            One woman built these companies, and she raised three daughters to follow her into
            business. Today two generations of one family work in them side by side.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {PHOTOS.map(({ src, alt }) => (
            <div
              key={src}
              className="relative aspect-square w-[calc(50%-0.75rem)] sm:w-56 lg:w-60 overflow-hidden rounded-2xl border border-stone-200 bg-white hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/8 hover:-translate-y-1 transition-all duration-300"
            >
              <Image src={src} alt={alt} width={1200} height={1200}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 14rem, 15rem"
                className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```
(No `priority`, no `quality` — see ground rule 5. 4 tiles: one row at lg, 2×2 on mobile.)

### 3.4 `components/OurCompanies.tsx` — third card + grid + URL fix
1. **Intro paragraph** (under the "Our Companies" H2), replace with, exact:
   > Canyon Advisors is the parent company behind three businesses in the Phoenix metro — workplace micro-markets, furnished rentals, and professional cleaning. Each one family-built. Each one still family-run.
2. **COMPANIES array:** add `displayUrl` to every entry (`'canyon-markets.com'`, `'canyon-apts.com'`), then append:
   ```ts
   {
     name: 'Canyon Cleaners',
     category: 'Turnover & Commercial Cleaning',
     description:
       'A woman-owned, women-run cleaning company serving the Phoenix metro since 2017. Short-term rental turnovers, corporate housing, and commercial spaces — handled by vetted, insured teams that leave every property photo-ready.',
     href: 'https://cleaners.canyon-advisors.com',
     displayUrl: 'cleaners.canyon-advisors.com',
     tags: ['Vetted Teams', 'Insured', 'Photo-Ready'],
   },
   ```
3. **Visit line** (line ~79): the domain is DERIVED from the name (`name.toLowerCase().replace(' ', '-')` + `.com`) — this would print the squatted `canyon-cleaners.com`. Replace the whole expression with `Visit {displayUrl} →` and add `displayUrl` to the map destructuring (line ~41).
4. **Grid** (line ~40): `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto` → `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto`. (Do NOT use md:grid-cols-3 — p-8 cards get too narrow at 768px. The lone third card at md widths is accepted.)

### 3.5 `components/Footer.tsx`
1. COMPANIES array: append `{ label: 'Canyon Cleaners', href: 'https://cleaners.canyon-advisors.com' },`
2. Description paragraph → exact: `The woman-owned parent company of Canyon Markets, Canyon Apts, and Canyon Cleaners. Built in Phoenix, family-run since 1993.`
3. Bottom mono tagline `Real Estate · Consulting · Investment` → `Three Companies · One Family · Est. 1993`

### 3.6 `components/Services.tsx`
Intro line "Three decades of experience across three distinct real estate disciplines —…" → exact: `Thirty years in business, three real estate disciplines — all under one family roof.` (Section content otherwise untouched — the real-estate services are still real-estate services.)

### 3.7 `components/Contact.tsx`
1. SERVICES const (lines ~6-11): insert `'Cleaning Services',` before `'General Inquiry'`.
2. Error-fallback (lines ~163-168): both the `mailto:` href and the visible text `info@canyon-markets.com` → `info@canyon-advisors.com`.
3. **Do NOT touch `app/api/contact/route.ts`.** Its `from: 'Canyon Advisors <noreply@canyon-markets.com>'` (line ~15) is the Resend-verified sending domain and must stay — it is email infrastructure, not a published contact address. The `to:` is already info@canyon-advisors.com. (Migrating the sender to a canyon-advisors.com address requires verifying that domain in Resend first — separate task for Jeff.) After this build, route.ts is the only intentional `canyon-markets.com` email left in the repo.

### 3.8 `app/layout.tsx` — metadata + JSON-LD
1. JSON-LD org `email` (line ~23): → `info@canyon-advisors.com`.
2. JSON-LD org description (line ~21) → `Canyon Advisors is a woman-owned, family-run consulting, investment, and management firm founded in Phoenix in 1993 — the parent company of Canyon Markets, Canyon Apts, and Canyon Cleaners.` (drops the AZ/TX/TN claim).
3. `subOrganization` array: append `{ '@type': 'LocalBusiness', name: 'Canyon Cleaners', url: 'https://cleaners.canyon-advisors.com', description: 'Woman-owned cleaning company serving the Phoenix metro — short-term rental turnovers, corporate housing, and commercial cleaning.' }` (schema.org has no CleaningService type; LocalBusiness is correct). `numberOfEmployees: 7` stays.
4. Default `<title>` → `Canyon Advisors | Real Estate, Micro-Markets & Cleaning | Phoenix AZ | Est. 1993`. Also set BOTH `openGraph.title` and `twitter.title` to exactly: `Canyon Advisors | Real Estate, Micro-Markets & Cleaning | Est. 1993` (the default title minus the "| Phoenix AZ" segment).
5. Meta description (and OG/Twitter descriptions) → `Canyon Advisors is the woman-owned, family-run parent company of Canyon Markets, Canyon Apts, and Canyon Cleaners — workplace micro-markets, furnished rentals, and professional cleaning in Phoenix since 1993.`
6. Keywords array: keep existing real-estate terms; append: `'woman owned business Phoenix'`, `'family owned company Phoenix'`, `'workplace micro-markets Phoenix'`, `'commercial cleaning company Phoenix'`.
7. OG image alt → `Canyon Advisors — Woman-Owned Family of Companies | Phoenix AZ`.
8. Everything else in layout.tsx stays as-is: the `WebSite` @graph node description, `alternateName`, `areaServed` (incl. Dallas/Memphis), `knowsAbout`, `hasOfferCatalog`, `numberOfEmployees`, and the Dallas/Memphis keyword entries (see Open items — deliberate, not overlooked).

## Phase 4 — Config + housekeeping (verified low-risk)

1. `next.config.ts`: delete BOTH `eslint: { ignoreDuringBuilds: true }` and `typescript: { ignoreBuildErrors: true }`. (The `eslint` key is a **type error** in Next 16 — verified. After deletion + npm install, `tsc --noEmit` baseline is exactly 0 errors.)
2. `git rm public/NokianvirallinenkirjasinREGULAR.ttf` (duplicate of `public/fonts/…` — zero references, verified).
3. `git rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg` (create-next-app leftovers, zero references).
4. `.gitignore`: verify `Family Photos/` is present (added in Phase 2 — do not add a second line).
5. OPTIONAL: `components/Navbar.tsx` logo `<Image>` uses deprecated `priority` → swap to `preload`. Skip if minimizing diff.
6. Do NOT add a nav link for #family (decided: skip). Sitemap #family entry: skip.

## Phase 5 — Verify, then ONE push

1. `node node_modules/typescript/bin/tsc --noEmit` → must be 0 errors (Phase 4.1 done).
2. `node node_modules/next/dist/bin/next build` → must pass (ignores are gone now — this is the real gate). Do NOT use `npm run build` — see ground rule 4.
3. `node node_modules/next/dist/bin/next dev` + browser (use the in-app browser tools; NOT `npm run dev` — ground rule 4), checklist:
   - Hero: "Thirty Years of Business Expertise" + new woman-owned subline.
   - #about: "Two Generations, One Standard", 3 new paragraphs, 4 new stats, NO credentials row, zero occurrences of "brother" anywhere on the page (grep the rendered HTML too).
   - #family: 4 photos, founders (Jeff+Joleen) first; hover lifts with orange border; no names/captions.
   - #companies: 3 cards in one row ≥1024px; visit lines read `canyon-markets.com` / `canyon-apts.com` / `cleaners.canyon-advisors.com`; cleaners card opens the live subdomain (Phase 1 must be done).
   - #contact: dropdown has "Cleaning Services"; error fallback shows info@canyon-advisors.com.
   - Footer: 3 companies, new description + tagline. View-source: 3 subOrganization entries, email info@canyon-advisors.com.
   - Mobile 375px: family grid 2×2; companies stack; H2s wrap cleanly. 768px: acceptable lone third company card. 1280px: card heights even (tags bottom-align via mt-auto).
4. Single commit including: Hero.tsx (the pre-existing uncommitted H1 change), the pre-existing `package-lock.json` modification (from the resend install — it must ship), every file edited/created above, the `git rm` deletions from Phase 4, and this `BUILD-CLEANERS-INTEGRATION.md` doc itself (project convention keeps instruction docs in the repo). Push, watch the Netlify deploy go green, then re-run the section checklist on https://canyon-advisors.com.

## Open items (do NOT act without Jeff)

- Dallas/Memphis market references (Hero line, Markets section, lease-option bullet, layout.tsx `areaServed` cities + Dallas/Memphis keyword entries): left untouched pending Jeff's confirmation they're still active.
- Cleaners standalone site (separate repo): adding canonical/og:url tags + a link back to canyon-advisors.com — separate task, not this build.
