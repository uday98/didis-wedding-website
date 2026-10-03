# Content request

The message below asks for every placeholder currently in `wedding-invite/src/content/wedding.json`.
Forward it as-is on WhatsApp. Anything marked *(optional)* can be left out and the site will
simply not show that line — nothing breaks.

Keep this file: when answers come back, tick them off here, then fill `wedding.json`.

---

Hi! I'm putting together the wedding website — the one that'll go out as the invitation link.
I need a few details to fill it in. No rush, but the more complete this is, the less back-and-forth later.

You can just reply point by point. 🙏

*1. The couple*
- Bride's full name, spelled exactly as it should appear on the invitation
- Groom's full name, same
- Wedding date
- A one-line phrase for under the names — something the families would actually say, not a quote off the internet *(optional, but it makes a difference)*

*2. The envelope*
- Who should the invitation be addressed to? e.g. "You and your family"
- Two initials for the wax seal — e.g. if it's Anjali and Rohan, "AR"

*3. The functions*
There are five set up right now — Haldi, Mehendi, Sangeet, Wedding, Reception.
Tell me if any should be removed, or if there are more.

For **each** function:
- Name (if it's called something specific in your family)
- Date
- Start time — and please say whether that's when it actually starts or when people are called for
- Venue name
- Full address
- Google Maps link if you have one *(optional — I can look it up)*
- Dress code *(optional)*
- One line of context — anything a guest would want to know. e.g. "the muhurat is early, plan the night before"  *(optional)*

*4. Travel*
- A short paragraph for guests travelling in — one or two sentences is plenty

By air:
- Nearest airport and its code
- Roughly how far / how long to the venue

By train:
- Which station to book to, and why that one

By road:
- Which highway, and whether there's parking at the venue

*5. Where to stay*
Two hotels are set up. For each:
- Hotel name
- Are rooms held for guests there, or is it just a nearby option?
- How far from the venue, in minutes
- Anything about rates or a booking name — e.g. "held under [family name] until 10 Jan" *(optional)*
- Booking link *(optional)*
- Phone number *(optional)*

*6. Getting around*
- Anything about shuttles, timings, or how to get a cab locally
- One or two people a guest can call about travel and stay — name, what they're handling, and phone number

*7. Photos (optional)*
If there's one good photo of the couple you'd want on the page, send the highest quality version
you have — straight from the camera or phone, not forwarded on WhatsApp, since that compresses it.
Landscape works better than portrait. The site works fine without one.

That's everything. Thank you! 💐

---

## Tracking

| Section | Asked | Received | In `wedding.json` |
|---|---|---|---|
| Couple | ✅ | ☐ | ☐ |
| Envelope | ✅ | ☐ | ☐ |
| Functions ×5 | ✅ | ☐ | ☐ |
| Travel — arrivals | ✅ | ☐ | ☐ |
| Stays ×2 | ✅ | ☐ | ☐ |
| Local help | ✅ | ☐ | ☐ |
| Photo | ✅ | ☐ | ☐ |

## Fields with no guest-facing content (no need to ask)

`envelope.openAriaLabel`, `envelope.skipLabel`, `envelope.replayLabel` and `couple.monogram` are
interface strings. The monogram is derived from the two names — set it once the names arrive.
