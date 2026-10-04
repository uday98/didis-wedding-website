# Content request

The message below asks for every placeholder currently in `wedding-invite/src/content/wedding.json`.
Forward it as-is on WhatsApp. Anything marked *(optional)* can be left out and the site will
simply not show that line — nothing breaks.

Keep this file: when answers come back, tick them off here, then fill `wedding.json`.

---

Hi! I'm putting together the wedding website — the one that'll go out as the invitation link.
I need a few details to fill it in. No rush, but the more complete this is, the less back-and-forth later.

You can just reply point by point. 🙏

*1. The couple* — I have this: Chhavi Talwar and Paduri Krishna Sai Reddy.
- Please just confirm the wedding date is 15 November 2026 (I've used the day of the Varmala)

*2. The invitation card* — I have both sets of parents: Sumit Talwar & Aneeta Talwar (bride) and
Paduri Srinivasa Reddy & Paduri Nagamani (groom). Two quick things:
- Which family is issuing the invitation — the bride's, the groom's, or both together? I've
  assumed the bride's, so it reads "Sumit Talwar & Aneeta Talwar request the honour of your
  presence at the marriage of their daughter Chhavi Talwar with Paduri Krishna Sai Reddy"
- Should grandparents be named? Some families include them

*3. The functions* — I have the names, order, times and venues for all six. Still needed:
- **Pheras:** the date. It's at 9:30 pm onwards at the Beach lawn, Caravela — is it the same night
  as the Varmala (15 Nov)?
- A one-line note for Mehendi ki Raat, Chand Sitare aur Sangeet and Chooda Sajjeya, like the ones
  Haldi, Varmala and Pheras already have *(optional)*

*4. Photos (optional)*
If there's one good photo of the couple you'd want on the page, send the highest quality version
you have — straight from the camera or phone, not forwarded on WhatsApp, since that compresses it.
Landscape works better than portrait. The site works fine without one.

That's everything. Thank you! 💐

---

## Tracking

| Section | Asked | Received | In `wedding.json` |
|---|---|---|---|
| Couple | ✅ | ✅ (date to confirm) | ✅ |
| Families (parents' names) | ✅ | ✅ (who invites: to confirm) | ✅ |
| Envelope | ✅ | ✅ | ✅ |
| Functions ×6 | ✅ | ✅ names, order, times, venues (Pheras date missing) | ✅ |
| Photo | ✅ | ☐ | ☐ |

Removed from the site, so no longer asked: the travel and stay section, dress codes, the opening
invocation and blessing line.

## Fields with no guest-facing content (no need to ask)

`envelope.openAriaLabel`, `envelope.skipLabel`, `envelope.replayLabel` and `couple.monogram` are
interface strings. The monogram is derived from the two names — set it once the names arrive.
