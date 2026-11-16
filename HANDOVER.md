# OJ Valeting: handover

Owen (OJ Valeting), mobile valeting and detailing, Bucks / Northants / Oxon. Phone 07708 600114, Ojsvaleting@gmail.com, Instagram @ojvaleting_. Sales call 16 Nov 2026. **Deal: £400 site + £100 booking system + £100 Google Business Profile = £600, paid once Owen is happy.** Promised: done this week, review on a dummy link, changes by voice note.

## Where things are

- Site: `oj-valeting/` (Next 15 static export, plain CSS, one font: Archivo, self-hosted). Dev: `npm --prefix oj-valeting run dev` on :3095 (launch config `oj-valeting` in `GAMBIA - WEBSITE /.claude/launch.json`).
- Design record: `DESIGN.md`. Concept: the site is Owen's van pulling up.
- Data to edit: `src/data/site.ts` (phone, hours, closed days, booking app link), `services.ts` (prices, what's included, extras), `reviews.ts`, `photos.ts` (captions, home photo order).
- Photos: 103 originals from his old site in `img/raw/` (not committed); 42 chosen ones as WebP in `public/photos/`.
- Pages: home, 5 service pages (`/car-valeting/`, `/deep-clean/`, `/paint-correction/`, `/ceramic-coating/`, `/maintenance-valet/`), `/book/`, `/book/sent/`, `/work/`, `/reviews/`, `/privacy/`, robots, sitemap, `llms.txt`.
- **Repo: https://github.com/BIGROCKS67/oj-valeting** (public). Every push to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`: **https://bigrocks67.github.io/oj-valeting/** (built under `/oj-valeting/`, noindex + robots Disallow while on github.io). To go live on Owen's domain: add `public/CNAME` with the domain, set it in Settings > Pages, point DNS (playbook section 1); the build then switches to the root and allows Google.
- **Demo: https://oj-valeting.vercel.app** (Vercel project `oj-valeting`, team eagleaibots-projects, public, `X-Robots-Tag: noindex` on *.vercel.app). Redeploy: `cd oj-valeting && npx vercel --prod --yes --scope eagleaibots-projects`. `.vercelignore` keeps `img/raw` out of the upload. Go-live on his own domain still to do.

## Booking system (how it works)

`/book/` is a 5-step booking builder: package, vehicle (type, make/model, condition, plan frequency or coating years), extras, day and start time, details. A dark "job card" beside it updates live. It posts to FormSubmit, which emails Owen the whole job card with a subject like "Booking request: Full deep clean, Friday, 20 November 2026 at 10am". He texts the customer to confirm. Works without JavaScript as one long form.

- Hours: Owen's **winter hours** (WhatsApp, 16 Nov 2026) in `src/data/hours.ts`: Mon 8am to 4pm, Tue 8am to 2pm, Wed 9am to 4pm, Thu 8am to 2pm, Fri 9am to 4pm, Sat one job at 8:30am, Sun by arrangement (not bookable online; about one Sunday a month for maintenance customers). Shown in the footer and on the booking page.
- Start times are worked out per day: every two hours from his start, as long as the job (`jobHours` in `services.ts`: basic and maintenance 2, deep clean 5, correction and coating 6) finishes by his finish time. Days off in `site.closedDates`. Bookable from tomorrow to 6 weeks ahead. **Update `hours.ts` when his summer hours start.**
- **Not end-to-end tested**: sending would trigger FormSubmit's one-off activation email to Owen. Do the first real test with Owen watching his inbox, click Activate, then check a booking lands (and not in spam).
- **Live diary later (optional):** if Owen wants slots to disappear once taken, plus reminders and deposits, he signs up himself to Goldie (most UK detailers use it) or Cal.com (free), then put the link in `site.bookingApp`. None of the local rivals checked have online booking at all.

## CONFIRM with Owen (nothing below is on the site as fact)

1. ~~Working days and hours.~~ Done 16 Nov 2026 (winter hours). Ask for **summer hours** in spring.
2. **Days off** over Christmas and holidays (`closedDates`).
3. **What's included** in each package. Drafted from what other UK detailers list; each list shows a yellow "Draft" tag until he signs it off. Check especially: does the basic include snow foam and two-bucket wash; does the deep clean include shampoo/extraction and steam?
4. **Times** for paint correction ("most of a day") and ceramic coating ("Ask Owen"): booking assumes 6 hours for both. How long do they really take, and does coating need 2 days?
5. **Extras prices.** He has none published. Site says "priced with the job". Prices would make the booking total exact.
6. **Vehicle size pricing.** Does a 7-seater or van cost more? Currently all "from" prices.
7. **Base town** and the towns he wants to be found in (Buckingham? Towcester? Brackley? Bicester? MK?). Needed for Google profile and town pages.
8. **WhatsApp.** Site uses Call / Text. If he works by WhatsApp, swap Text for a WhatsApp link.
9. **Water and power.** Form asks if the customer has a tap and socket. Does he carry his own? If so, drop the question.
10. **Domain** (see below).
11. **Insurance** details if he wants it shown (insurer name), and permission to use the photos with people in (Owen himself in 4 photos).
12. **Review surnames/towns.** Reviews are first name + initial, as on his old site. Google reviews will replace these once the profile is live.
13. "Started just over a year ago, five or six cars a day last summer": his words on the call; OK to say on the site?

## Domain advice (asked 16 Nov 2026)

Checked with whois on 16 Nov 2026:
- Taken: ojvaleting.co.uk and ojvaleting.com (both IONOS, Sept 2022, the Lincoln OJ Valeting), ojvaleting.uk (Fasthosts, 2023).
- **Free: ojvalet.co.uk, ojvalet.com, ojvalet.uk, ojvaleting.org.uk.**
- Owen owns ojvaleting.org (Wild West Domains / GoDaddy, registered 1 Oct 2025, renews 1 Oct 2027).

Recommendation: buy **ojvalet.co.uk** (and ojvalet.com for a few quid so nobody else takes it), make ojvalet.co.uk the main address, and keep ojvaleting.org pointing at it so old links, his Instagram bio and anything Google already has still work. The domain ending barely affects Google ranking, but .co.uk tells local customers he's a UK trader and .org reads as a charity. The van doesn't show a web address (only phone and Gmail), so changing costs nothing on the livery. Business name stays OJ Valeting everywhere.

## Search check (16 Nov 2026, research agent; US-based search tool so not exact UK Google)

- OJ Valeting does not appear for "mobile valeting Buckingham", "car valeting Towcester", "mobile car detailing Brackley", "ceramic coating Buckingham", "car valeting near Milton Keynes" or "paint correction Northamptonshire". Only a long "OJ Valeting Buckingham Owen" search finds ojvaleting.org.
- Four businesses trade as OJ Valeting (Buckingham, Lincoln, Hereford, Mildenhall). facebook.com/ojvaleting is Hereford's, facebook.com/ojvalet is Lincoln's.
- No directory listings found (Yell, Checkatrade, Bark).
- Old site: no meta description, no prices in search, no structured data, "throughout the Nation".
- Rivals: A&J Valeting (Quainton, 186 five-star Google reviews, prices published), SB Detailers (MK, 5.0 from 40+, Buckingham page), MM Valeting (about 30 town pages incl. Brackley), Aesthetica Auto Detailing (Turweston), Dimensions Detailing (Brackley, Trustpilot). **None has online booking.** Nobody ranks for "paint correction Northamptonshire".

## Getting him into the top 3 (order)

1. **Google Business Profile** (the £100): set up properly as a service-area business, name exactly "OJ Valeting" (no keywords in the name, Google suspends for it), primary category Car detailing service, plus Car wash / Mobile car wash, the real towns, services with prices, hours, photos, booking link to `/book/`. Owen does the verification video. Follow `GAMBIA - WEBSITE /LOCAL-BUSINESS-SETUP-PLAYBOOK.md` section 5.
2. **Reviews on Google.** This is the gap (A&J has 186). Send every past customer the review link, ask after every job, reply to each one naming the job and town. Target 30+ in 90 days.
3. **New site live** on the new domain, then Search Console + Bing (playbook sections 3 and 4).
4. **Town pages** once he confirms the towns (Buckingham, Towcester, Brackley, Bicester, MK), each with real local facts, not clones, plus a paint correction page aimed at Northamptonshire.
5. **Same name, number and website everywhere:** Facebook (website field, Book button), Instagram bio, Yell, Bark, Checkatrade, Bing Places, Apple Business Connect.

## Checks done (16 Nov 2026)

- Production build clean, 16 static pages.
- Booking flow clicked through in the browser pane: package carried over from the price list, step errors (title gets "Error:", summary takes focus, clears once fixed), job card updates, payload checked. Final send not pressed (see above).
- 390px: no sideways scroll, action bar Call / Text / Book, photo row swipes.
- Not yet done: Lighthouse, real-phone test, end-to-end FormSubmit test, client review.
