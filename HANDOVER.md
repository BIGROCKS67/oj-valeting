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

All booking is Owen's Square Appointments diary (see "Square Appointments" below). Every Book button links to `site.bookingApp`. `/book/` is a short page with prices, hours and the button into Square, kept for old links and Google. Customers only see free slots, Owen approves each request, and Square sends reminders.

- Hours shown on the site: Owen's **winter hours** (WhatsApp, 16 Nov 2026) in `src/data/hours.ts`, in the footer and on /book/. Bookable hours are set separately in Square. **When his summer hours start, change both.**
- The old 5-step FormSubmit form was removed on 17 Nov 2026 so there is one system only.

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
- design.com DNS for ojvaleting.org (saved 16 Nov 2026 before the move to GoDaddy): A @ and A www "Handled by Design.com", and TXT @ `google-site-verification=YluESfpPUzvSWva2nqVvO4Ad6PXnOyhoM2_tTw30Y0I`. Add that TXT back at GoDaddy after the transfer so Search Console stays verified.
- design.com also lists ojvaleting.co.uk as "Inactive" (auto-renew off). Whois shows it with someone else (IONOS), so it's a dead entry, nothing to transfer.
- design.com has no transfer-out button: the unlock and authorisation code come from their support.

Recommendation: buy **ojvalet.co.uk** (and ojvalet.com for a few quid so nobody else takes it), make ojvalet.co.uk the main address, and keep ojvaleting.org pointing at it so old links, his Instagram bio and anything Google already has still work. The domain ending barely affects Google ranking, but .co.uk tells local customers he's a UK trader and .org reads as a charity. The van doesn't show a web address (only phone and Gmail), so changing costs nothing on the livery. Business name stays OJ Valeting everywhere.

## Domains live (17 Nov 2026)

- **ojvalet.co.uk is the main address.** Owen bought it and ojvalet.com on his own GoDaddy (Ojsvaleting@gmail.com) on 17 Nov 2026, renew 17 Nov 2027. DNS at GoDaddy: A @ 185.199.108-111.153, CNAME www bigrocks67.github.io. GitHub Pages (this repo) custom domain ojvalet.co.uk, HTTPS enforced. `public/CNAME` and `site.url` match.
- **ojvalet.com**: GoDaddy forwarding, 301 to https://ojvalet.co.uk.
- **ojvaleting.org stays at design.com for now** (transfer cancelled, nothing paid). DNS there: A @ 185.199.108-111.153, CNAME www bigrocks67.github.io, plus the google-site-verification TXT. It serves the tiny repo BIGROCKS67/ojvaleting-redirect (`../ojvaleting-redirect`), which sends every page to ojvalet.co.uk and maps the old paths (/my-services, /portfolio, /reviews). Not a true 301, as Pages can't do that.
- **Watch out:** design.com says Owen's subscription is cancelled and ends 1 Oct 2027, the same day the .org is due to renew. Before then either transfer the .org to his GoDaddy (EPP code from design.com support, he has one from 17 Nov 2026) or let it lapse once Google has moved to ojvalet.co.uk.
- The Vercel demo (oj-valeting.vercel.app) is now noindex so only ojvalet.co.uk is indexed.
- To do: add ojvalet.co.uk to Search Console (verify through GoDaddy) and submit the sitemap; update Instagram, Facebook and Google profile links to ojvalet.co.uk.

## Square Appointments (17 Nov 2026)

- Owen's own Square account (Ojsvaleting@gmail.com, he created it). Booking page: https://book.squareup.com/appointments/1rs73chx3amn4i/location/LNTAB4BDN55JV/services, linked as `site.bookingApp`. **Square is the only booking system (17 Nov 2026):** every Book button on the site goes straight to it, /book/ is a short page with prices, hours and a button into Square. The old 5-step FormSubmit form and /book/sent/ were removed.
- Location: mobile, Europe/London, phone 07708 600114, appointments "at the customer's location". Hours match `hours.ts` (Sat 8:30 to 14:30).
- Services: Basic £45 2h, Full deep clean £150 5h, Paint correction £170 6h, Ceramic coating £220 6h, Maintenance £40 2h. Each blocks 30 minutes after for travel. Prices are Square "fixed" but every description says "From".
- Rules: Owen approves every request (auto-accept off), one service per booking, slots follow service length from his start time, 12 hours' notice, 60 days ahead.
- Days off (Christmas, holidays) and summer hours: set them in Square (block time on the calendar, Settings > Locations for hours) and update `hours.ts` so the footer matches.
- Plan: Square auto-started a 30-day Appointments Plus trial (ends 17 Dec 2026). No card on the account, so it can't charge. Free plan loses confirmation texts/emails and Google Calendar sync. Decide before 17 Dec.
- Saturday allows 8:30 and 11:00 for short jobs. Owen just declines the second one if he only wants one job.

## Google Business Profile (17 Nov 2026)

- Owen's profile "OJVALETING" is verified (blue tick), 13 reviews at 5.0, category Valeting service. Jack (rockelljack@gmail.com) is a Manager, Owen is owner.
- Changed 17 Nov: website to https://ojvalet.co.uk/ and hours to his winter hours (both approved same day); booking link to the Square page; "from" prices and descriptions on Basic £45, Deep clean £150, Maintenance £40, Ceramic coating £220, Paint correction £170.
- Left as Owen set them: business name "OJVALETING" (renaming can trigger re-verification), description, service area (Oxon, Beds, Warks, Bucks, Northants), Facebook link (facebook.com/ojvaleting_, check it works; the site uses the profile.php id link).
- Service area (17 Nov, 20 areas, Google's max): Owen's 5 counties (Bucks, Oxon, Northants, Beds, Warks, his own list on WhatsApp 17 Nov) plus Brackley, Buckingham, Towcester, Silverstone, Paulerspury, Stoke Bruerne, Roade, Stony Stratford, Milton Keynes, Northampton, Bicester, Banbury, Aylesbury, Oxford. He's based between Brackley and Buckingham and goes further afield with a fuel charge (about £10 for 45 minutes away), which the site now says.
- Description rewritten 17 Nov (no prices or links, per Google rules). Extras given descriptions: clay bar, engine detailing, car waxing, ozone. Service edits can take up to a day to publish.
- Photos: 12 uploaded 17 Nov (van livery and rear, Owen at work x2, BMW M4, Defender 110, Discovery interior, engine bay, gloss roof, motorhome, Mercedes CLE, Ford interior), pending Google review. Uploader that works with the browser tools: https://www.google.com/local/business/10978543438317604054/promote/photos/add (open it directly, not in the Search overlay).
- Post published 17 Nov (Jack OK'd it): online booking announcement with the van photo and a Book button to Square. Post editor that works with the browser tools: https://www.google.com/local/business/10978543438317604054/promote/updates/add
- Payments (Owen, 17 Nov): cash or bank transfer, no card machine. Google: not cash-only, no credit/debit/NFC (Google has no bank transfer option). Site shows "Pay by cash or bank transfer on the day" on home and /book/, schema paymentAccepted matches. If he gets a card reader, update `site.payment` and the Google attributes.
- Not done, needs Owen: opening date.
- **Review link:** https://g.page/r/CddJGqjpZkcFEBM/review. QR code in `handover/owen-google-review-qr.png` (and .svg for print).
- **Search Console:** https://ojvalet.co.uk/ added on Jack's Google account (rockelljack@gmail.com), verified by `public/google4b6729940671f1e8.html` (don't delete it), sitemap submitted (10 pages, Success), homepage indexing requested. Add Owen as an owner later if he wants access.
- To do: newer photos (last added 140 days ago).

## Prices (Owen's price list, 17 Nov 2026)

- On the site: every service page has a "Prices by vehicle size" table (Small, Medium, Large, XL), plus Inside only and Outside only for the basic and deep clean. Add-ons have prices on each service page and in full on /book/. Data lives in `services.ts` (`prices`, `addOns`, `sizeGuide`).
- Changes from before: ceramic is now from £270 (3 year, small car; 5 year £300/£340/£380), maintenance is every 2, 4 or 6 weeks (no weekly).
- **CONFIRM with Owen:**
  - Ceramic XL: his list says £350, less than Large £380. Site shows "Ask Owen" for XL until he confirms (probably a typo).
  - Which cars count as Small, Medium, Large, XL. The site's guide (Polo/Fiesta, Golf/3 Series, estates and SUVs, 7-seaters/vans/motorhomes) is my best guess and shows a Draft tag.
  - Scratch removal and stage 2/3 correction have no price on his list, so they show "Ask Owen".
- Google profile: every service and add-on now has his prices (17 Nov).
- Square: still the old single prices (ceramic still £220). Needs size options added when Jack is signed in.

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
- Not yet done: Lighthouse, real-phone test, one real test booking through Square, client review.
