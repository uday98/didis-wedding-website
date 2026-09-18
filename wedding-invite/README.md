# Wedding invitation site

Static Vite + React. No backend yet. Deploys to Vercel Hobby.

```
npm install
npm run dev
```

## Where things live

| Concern | File | Rule |
|---|---|---|
| Colour | `src/theme/palettes.js` | The only file with hex values. Change `ACTIVE_PALETTE` to switch. |
| Type, spacing, easing | `src/theme/tokens.css` | No component sets a font-size in px. |
| All wedding text | `src/content/wedding.json` | Edit this; never edit a component to change a name or a time. |
| Section order | `SECTIONS` array in `src/App.jsx` | Adding a section is one component + one array entry. |

## Auditioning palettes

Four are defined: `heirloom`, `marigold`, `dusk`, `ink`.

- `?palette=marigold` on the URL previews one without committing.
- The dot switcher at the bottom right is a build-time tool. Delete `PaletteSwitcher.jsx` and its line in `App.jsx` before launch.

## Architecture rules this repo holds to

- No component reads `wedding.json` directly. They call `useContent(slice)`, so the source can become a fetch or a CMS later without touching a component.
- `Envelope.jsx` renders; `useEnvelope.js` decides. State and presentation stay apart, so the animation is reusable.
- `EventCard` knows about one function and nothing about how many exist. `groupByDate` derives the day structure from the data, so a sixth function needs no code.
- Layout primitives (`Shell`, `Section`, `Nav`) carry no wedding content.

## The envelope, deliberately

It plays once per browser session (`sessionStorage`). Guests come back four or five times to recheck a venue or a timing, and replaying the ceremony each visit turns a nice moment into a toll gate. `prefers-reduced-motion` skips straight through, and a skip control is always visible.

## Deploying

```
npm run build          # outputs to dist/
```

Push to GitHub, import the repo on Vercel, framework preset Vite. Every push redeploys.

Vercel Hobby over Firebase Spark for one reason: Spark caps transfer at 360 MB/day, which a 3 MB page exhausts at roughly 120 visitors — on exactly the day everyone opens the link. Hobby gives 100 GB/month and no card. Hobby is non-commercial only, which a personal wedding satisfies; keep vendor affiliate links off it.

## Not built yet

RSVP, gallery, registry. When RSVP arrives, it goes in `src/components/Rsvp/` with its own hook, posting to a Google Apps Script endpoint that appends rows to a Sheet the family can open on a phone. An invite code checked in the browser is a speed bump, not security — treat it as such.
