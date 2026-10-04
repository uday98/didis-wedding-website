# Content request

The message below asks for every placeholder currently in `wedding-invite/src/content/wedding.json`.
Forward it as-is on WhatsApp. Anything marked *(optional)* can be left out and the site will
simply not show that line — nothing breaks.

Keep this file: when answers come back, tick them off here, then fill `wedding.json`.

---

Hi! I'm putting together the wedding website — the one that'll go out as the invitation link.
I need a few details to fill it in. No rush, but the more complete this is, the less back-and-forth later.

You can just reply point by point. 🙏

*1. The couple* — already have this: Chhavi & Krishna Sai.
- Please just confirm the wedding date is 15 November 2026 (I've used the day of the Varmala)

*2. The families* — I have both sets of parents: Mr Sumit Talwar & Mrs Aneeta Talwar (bride) and
Mr Paduri Srinivasa Reddy & Mrs Paduri Nagamani (groom). Only a few small things left:
- Which side is issuing the invitation — bride's family, groom's family, or both together? (I've
  assumed the bride's side, so it reads "Mr Sumit Talwar & Mrs Aneeta Talwar request the honour...")
- Is the invocation at the top right? Currently ॥ श्री गणेशाय नमः ॥ — tell me if you'd like a different
  one, or none *(optional)*
- A closing blessing line, if the family uses one *(optional)*
- Should grandparents be named? Some families include them.

*3. The envelope* — already have this ("You and your family", seal "CK"). Nothing needed.

*4. The functions* — I have names, order, times and venues for all six. Still needed:
- **Pheras:** the date. It's at 9:30 pm onwards at the Beach Lawn, Caravela — is it the same night
  as the Varmala (15 Nov)?
- **Dress code** for each function *(optional)*
- A one-line note for Mehendi ki Raat, Chand Sitare aur Sangeet and Chooda Sajjeya, like the ones
  Haldi, Varmala and Pheras already have *(optional)*
- **Is Sea breeze by Sarovar Portico also where guests are staying?** If so I'll add it under
  "Where to stay"

*5. Travel*
- A short paragraph for guests travelling in — one or two sentences is plenty

By air:
- Nearest airport and its code
- Roughly how far / how long to the venue

By train:
- Which station to book to, and why that one

By road:
- Which highway, and whether there's parking at the venue

*6. Where to stay*
Two hotels are set up. For each:
- Hotel name
- Are rooms held for guests there, or is it just a nearby option?
- How far from the venue, in minutes
- Anything about rates or a booking name — e.g. "held under [family name] until 10 Jan" *(optional)*
- Booking link *(optional)*
- Phone number *(optional)*

*7. Getting around*
- Anything about shuttles, timings, or how to get a cab locally
- One or two people a guest can call about travel and stay — name, what they're handling, and phone number

*8. Photos (optional)*
If there's one good photo of the couple you'd want on the page, send the highest quality version
you have — straight from the camera or phone, not forwarded on WhatsApp, since that compresses it.
Landscape works better than portrait. The site works fine without one.

That's everything. Thank you! 💐

---

## Tracking

| Section | Asked | Received | In `wedding.json` |
|---|---|---|---|
| Couple | ✅ | ✅ (date to confirm) | ✅ |
| Families (parents' names) | ✅ | ✅ (invocation, who invites: to confirm) | ✅ |
| Envelope | ✅ | ✅ | ✅ |
| Functions ×6 | ✅ | ✅ names, order, times, venues (Pheras date missing) | ✅ |
| Travel — arrivals | ✅ | ☐ | ☐ |
| Stays ×2 | ✅ | ☐ | ☐ |
| Local help | ✅ | ☐ | ☐ |
| Photo | ✅ | ☐ | ☐ |

## Fields with no guest-facing content (no need to ask)

`envelope.openAriaLabel`, `envelope.skipLabel`, `envelope.replayLabel` and `couple.monogram` are
interface strings. The monogram is derived from the two names — set it once the names arrive.
