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

- Hours (Owen, 17 Nov 2026): Mon, Wed, Fri, Sat, Sun 8am to 6pm; Tue and Thu 8am to 4pm. Same on the site (`src/data/hours.ts`, footer and /book/), Google profile and Square. Owen blocks off slots he can't do in the Square calendar himself. **If they change, change all three.**
- The old 5-step FormSubmit form was removed on 17 Nov 2026 so there is one system only.

## CONFIRM with Owen (nothing below is on the site as fact)

1. ~~Working days and hours.~~ Done 17 Nov 2026 (one set of hours, 7 days; Owen blocks slots in Square).
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
- Services: Basic 2h, Full deep clean 5h, Paint correction 6h, Ceramic coating 6h, Maintenance 2h, plus (added 17 Nov) Basic interior clean 2h £30-£45, Basic exterior clean 2h £25-£45, Deep interior clean 5h £130-£155, Deep exterior clean 5h £35-£50. Each has size options (see Prices). Each blocks 30 minutes after for travel. Prices are Square "fixed" but every description says "From".
- Rules: Owen approves every request (auto-accept off), one service per booking, slots follow service length from his start time, 12 hours' notice, 60 days ahead.
- Days off (Christmas, holidays) and summer hours: set them in Square (block time on the calendar, Settings > Locations for hours) and update `hours.ts` so the footer matches.
- Plan: Square auto-started a 30-day Appointments Plus trial (ends 17 Dec 2026). No card on the account, so it can't charge. Free plan loses confirmation texts/emails and Google Calendar sync. Decide before 17 Dec.

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
- Square (17 Nov): every service has Small / Medium / Large / XL options with Owen's prices, each with the same duration and 30 minutes' travel after. Ceramic is 5 year prices (£300/£340/£380) with XL as "price varies" until Owen confirms; 3 or 7 year goes in the booking notes. Inside-only and outside-only aren't separate options in Square yet: customers mention them in the notes or text Owen.

## Menu, research and next upgrades (17 Nov 2026)

- Home page price list is now a tabbed menu (Full valets, Interior, Exterior, Polishing, Protection, Plans, Add-ons) with a card per service: photo, blurb, time, and Small/Medium/Large/XL buttons that change the price. `ServiceMenu.tsx`. Owen liked this layout on iautodetailing.co.uk; the look is still his own.
- New service pages from his price list: /interior-valet/, /deep-interior/, /exterior-valet/, /deep-exterior/. Times on these ("Up to 2 hours", "Up to 5 hours") are upper bounds from the full packages: CONFIRM with Owen. All four are now in Square with Small/Medium/Large/XL and their own Book deep links. Deep exterior at 5 hours blocks most of Owen's day for a £35 job: CONFIRM the real time and change it in Square and services.ts together.
- Book buttons open the matching Square service (`squareId` in services.ts).
- Hero shows "5.0 from 13 Google reviews" linking to his Maps listing (`site.google`; update the count now and then).
- /book/ has an FAQ (FAQPage schema) using only facts Owen has given.
- Research on ~10 top detailer sites (agent report, 17 Nov): the gaps that need Owen are the Draft tags, before/after pairs, products he uses, insurance, a named maintenance plan, gift vouchers, booking terms (deposit/cancellation), water and power, and 5 town pages with real local jobs.

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

## Booking paused (17 Nov 2026, Owen's request)

Owen asked to close booking until he's ready to go live.
- Square: online booking disabled (Appointments > Online booking > Channels > ... > Disable online booking). This also stops the Book button on his Google profile. Reopen with "Enable online booking" on the same page.
- Site: `bookingOpen: false` in `src/data/site.ts`. Every Book button goes to /book/, which says call or text Owen. Set it to `true` to send them to Square again.
- Both have to be switched back on together.
- Job lengths (Owen, 17 Nov): Basic 1-2h, Full deep clean 3-5h, Paint correction 3-5h, Ceramic 3-5h, Maintenance 1-2h, Basic interior 1h, Basic exterior 1-2h. Square blocks the top of each range. Deep interior and deep exterior: CONFIRM (still 5h).

## Ranking push and Owen's changes (17 Nov 2026, evening)

Done, following LOCAL-SEO-BOOST-PLAYBOOK.md (same steps as R4R and JP):
- Titles now carry the town ("... , Brackley | OJ Valeting"; home "OJ Valeting | Mobile Car Valeting, Brackley & Buckingham"). Home has a canonical. Schema has Buckingham MK18 (postal town only, no street) and the Maps link. Footer says "Based in Buckingham, Buckinghamshire MK18".
- Google profile: renamed OJVALETING to "OJ Valeting" (pending review), added category "Car wash", 5 product cards (Basic, Deep clean, Paint correction £210, Ceramic £270, Maintenance £40) with photos and links, the 2 Porsche photos.
- Search Console: sitemap resubmitted (14 pages). Request indexing hit the daily quota, try again another day.
- Bing Webmaster Tools: ojvalet.co.uk added and verified by the `msvalidate.01` meta tag in layout.tsx (keep it), sitemap submitted. Bing Places not done yet (Jack has to sign in to bingplaces.com).
- Price menu opens on an "All" tab.
- Mobile menu now closes when a link is tapped (it used to cover the top of the next page).

Owen's changes:
- Paint correction includes the clay bar: £210 / £230 / £250 / £270 (site, Square, Google card).
- Clay bar add-on £50 (was £80). Extras say "After something that isn't listed? Just ask."
- Ceramic extras: Interior plastics polished removed, Interior leather ceramic coating £120+ added (also in Add-ons). Tip on the ceramic page and card: paint correction first comes at a discounted price (no figure: Owen quotes it).
- Polo photo is Owen ceramic coating (caption fixed, now the ceramic photo). Deep exterior card photo changed to Owen on the Polo sills.
- Still waiting: Owen's new ceramic photo (tomorrow), his call about the maintenance page, deep interior/exterior job times, address pin decision.

## SEO and AI search, matched to R4R and JP (17 Nov 2026, late)

- Town pages: /areas/ plus Brackley, Buckingham, Towcester, Bicester (`src/data/areas.ts`). Facts only: drive time from Owen's base, real nearby villages, his prices, hours, payment, reviews. Add a town by adding an entry.
- Guides: /guides/ with "How much does a mobile car valet cost?" and "Do I need paint correction before a ceramic coating?" (`src/data/guides.ts`), Article + FAQPage schema. CONFIRM: Owen to read both.
- robots.txt names the AI crawlers (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Bingbot).
- Schema: founder (Owen), opening hours, contact point, WebSite node.
- llms.txt rewritten with every price by size, extras, payment, hours, areas and guides.
- IndexNow: key file `public/22fa1e8532a7cea2eb6140162d2bb6b8.txt` (keep it). After each deploy: `node scripts/indexnow.mjs` (202 = accepted).
- Search Console sitemap resubmitted: 22 pages read. Footer and menu link to Areas and Guides.
- Not done yet: Bing Places (Jack signs in), Google posts (draft and ask Jack), a ranking baseline report like R4R's.

## 18 Nov 2026 (Owen's answers)

- Job times (Owen): basic interior 45 min, basic exterior 45 min, deep interior 2 hours. Site (`services.ts`, llms.txt) and Square (all 4 sizes, 30 min travel after unchanged) updated. Deep exterior still 5h: CONFIRM.
- Address: Owen doesn't mind. Keep it HIDDEN on Google (service-area business, he goes to the customer; showing a home address breaks Google's rules). Site stays "Buckingham MK18". Never publish his street address.
- Square Appointments Plus: £29 per location a month, trial ends 18 Dec 2026 (Square's date), no card on the account. Owen asked the price for keeping customer texts; Jack to tell him.
- ojvaleting.org transfer: Owen said yes (17 Nov). Domain is unlocked (whois status ok), already on GoDaddy name servers (ns33/ns34.domaincontrol.com). Transfer started on Owen's GoDaddy, stopped at the auth code box; Jack pastes the design.com code and picks 1 year. After it lands: check the A/CNAME/TXT records still serve the redirect repo.
- Ceramic photo: Owen sends it 18 Nov.

## 18 Nov 2026 (Owen's WhatsApp notes, 17 Nov late) — commit cd04bf4
- Times: basic interior and basic exterior "45 minutes to 1 hour" (Square 1 hr), deep exterior "1 to 2 hours" (Square 2 hr). Deep interior stays 2 hours.
- New lines in site.ts: `needs` (tap and plug socket, waterproof gazebo) and `honest` (honest quote, not just the most expensive package). Shown on home, book page (FAQ "What do you need from me?"), every service page, llms.txt. Removed "van, water and kit" claims (Owen needs the customer's tap).
- Basic package and basic interior: "Price may change once Owen sees how dirty the car is." (also on the price menu cards).
- Square: all 9 service descriptions now carry the time, tap/plug, gazebo, honest quote and Apple Pay (18 Nov 2026). Apple Pay still to add to the 5 Google product cards.
- Ceramic coating: Owen will use the same photo, no AI images. "Change the others as mentioned" still needs his list.
- Google product cards (all 5): payment line now "Pay by Apple Pay, bank transfer or cash." (18 Nov 2026, pending Google review).
- ojvaleting.org transfer: Owen paid at GoDaddy, 1 year, £24.17 (18 Nov 2026). Waiting for it to land (up to 5-7 days); then check DNS still points at the ojvaleting-redirect repo.
- Google profile strength: shop front photo (the van, handover/oj-valeting-van.jpg) added 18 Nov 2026, so the checklist is complete. Skipped the Ads credit and Workspace offers.
- Ranking re-check scheduled as a one-off task on 15 Jan 2027 (oj-valeting-ranking-check-jan-2027).
- ojvaleting.org redirect page now carries Owen's logo as favicon (ojvaleting-redirect repo, 18 Nov 2026) so the old Google result stops showing the design.com "D". Google profile Website button already points to ojvalet.co.uk. Profile checklist: only Google Ads and Workspace upsells left, skipped on purpose.
- 18 Nov 2026: removed "Car wash" extra category (Google was showing it instead of Valeting service). Primary stays Valeting service. Opening date still empty: waiting on Owen for the month/year he started (gives the "X+ years in business" line).

## 18 Nov 2026 (afternoon): Owen's call and his 40 photos

Owen sent 40 job photos on WhatsApp (14:03 to 14:10) and rang Jack (14:19, 16 min). Originals: `handover/owen-photos-2026-11-18/` (owen-01 to owen-40). On the site as `public/photos/<name>-480/960.webp`, metadata stripped.

Done:
- Basic package card photo is now the white BMW M4 in foam (owen-39), Maintenance package is the Defender covered in snow foam (owen-38). All other package photos unchanged, as Owen said.
- All 40 photos added to Our Work, newest first, each captioned with the car. Captions are our read of each car: Owen said he'll correct any once they're up. Least sure: owen-08 (Range Rover Sport alloy), owen-28 (Porsche Taycan), owen-30 (Range Rover Sport), owen-16 (BMW X5 interior), owen-40 (VW Transporter, a customer's, not his van). The home page row now shows the first 16 new ones.
- Bonnet photo caption: "Bonnet paint correction" (Owen, 18 Nov: keep the same photo).
- Price tabs: "Polishing" renamed "Paint correction".
- New add-on: Plastic restoration £30+ (18 add-ons, even columns). Not in Square yet; add it there when booking reopens.
- Size guide: Large now names a Range Rover and Mercedes GLC. Owen will re-quote on the day if someone books the wrong size; no reg field.
- Home hero: full background photo of a finished car instead of the van, headline "Professional mobile valeting and detailing", "on your drive, from £45" and "Owen brings the van" removed. Depth effect on pointer and scroll. Live option: Taycan wheel. Other options in `handover/hero-options-2026-11-18/`; switch with `site.hero` in `src/data/site.ts`.
- About page (/about/, in the top menu) and Terms and conditions (/terms/, in the footer). Both carry a Draft tag and use only facts Owen has already given.

Not sure from the call: Owen mentioned "Protection" and Jack said "protection plans". The Protection tab is unchanged for now; ask Owen if he wants it renamed (there is already a separate Plans tab for the maintenance plan).

Waiting on Owen: the better bonnet photo, a photo of him by his van and his "Hi, I'm Owen" paragraph for About, his T&Cs wording, any caption corrections, which hero he prefers, and the "What's included" lists (he'll do those last).

## 18 Nov 2026 (evening): hero looks for Owen to try

Jack asked for something "proper insane" for the home page, built to the level of the best car sites, and for Owen to pick on the live page. Normal visitors see no change. Owen's links:
- https://ojvalet.co.uk/?look=1 Foam. A WebGL shader (`src/components/FoamGL.tsx`) draws dense, real-looking snow foam over the Taycan: round lit bubbles in three sizes, clumps, and streaks sliding down. It plays by itself (Jack: attention spans): the foam sits for 0.7 s, then a jet wash sweeps back and forth down the car (bright stream from the top right, mist and spray where it hits, ragged foam edges), a quick rinse with drips takes the bits, then one polish light sweeps across and a few water beads stay. About 5 s in all. Add `&frames` to the link to step it one frame at a time for checking.
- https://ojvalet.co.uk/?look=2 Scroll. A shader (`src/components/ScrollGL.tsx`) runs through 8 of his jobs while you scroll. Each car pushes in slowly, then a water squeegee pulls down the screen and leaves the next car behind it, with droplets in its wake. The car's name lands in big type, with a 01/08 counter. The picture follows the scroll with weight, so a flick glides and a hard scroll still gets through.
- The 3D wheel was dropped (Jack, 18 Nov). three.js is uninstalled.
A bar at the bottom switches looks, and "I like this one" opens WhatsApp with the choice typed out. Without WebGL both looks fall back to simpler versions. Once Owen picks: build that look into the hero for real, then delete the other one, the look bar and `HeroLooks.tsx`.

- 18 Nov 15:37: About page now uses Owen's own text (WhatsApp), Draft tag removed. Still waiting on the photo of him by his van.
- 18 Nov: footer now says "and nationwide" and "24 hour emergency call-outs" (Owen's About text), name in capitals: OJ VALETING.
- 18 Nov 15:39 (Owen): repeat Boxster and white M4 shots taken off Our Work; Range Rover boot captioned "Deep interior clean"; red Macan leather captioned "Leather protection, Porsche Macan".
