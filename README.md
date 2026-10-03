# pechgroup.com

Public site of PECH Group LLC, built with [Astro](https://astro.build) (static output).

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the build |

## Content

- Home copy (EN and ES) lives in `src/i18n/ui.ts`; the page is `src/components/Home.astro`.
- Pending content is marked `[TODO: Ed]`. Set `SHOW_TODOS = true` in `src/i18n/ui.ts` to show the markers on the page.

## Deploy

Every push to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages under the custom domain in `public/CNAME`.

DNS for `pechgroup.com` (managed at GoDaddy) must point at GitHub Pages:

| Type | Name | Value |
| :-- | :-- | :-- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | edpech.github.io |

`.github/workflows/ci.yml` builds and audits (SEO, WCAG 2.1 AA, 375px, tap targets) every pull request.
