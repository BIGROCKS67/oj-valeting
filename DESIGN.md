# OJ Valeting: design record

Built 16 Nov 2026 from the sales call with Owen (key points in `HANDOVER.md`) and his old site ojvaleting.org (design.com, £80 a year). Rules: `~/.claude/UI_RULES.md`.

## 1. Truth

- **Who it's for:** people in Buckinghamshire, Northamptonshire and Oxfordshire who want their car (or van, caravan, horsebox, motorhome) cleaned properly without taking it anywhere.
- **The one job:** get a booking in, with the package, the car and a day already chosen, so Owen stops juggling messages (he did 5 or 6 cars a day last summer by message).
- **Only Owen has:** a black Transit Connect with blue foam-bubble livery and his services painted on the side; 103 photos, every one taken on the customer's own drive or yard; a price list that is "from" prices plus extras; a maintenance plan every 1, 2, 4 or 6 weeks; customers who leave him reviews by first name ("Thanks Owen").

## 2. The default, banned

Without thinking: a black "luxury detailing" site, Montserrat or Bebas uppercase, neon-blue glow, a full-bleed slow-motion foam video, "Elevate your ride", three package cards with "Most popular", Before/After slider, testimonial carousel, Book Now in a pill. All of it is banned here, along with section 3 of UI_RULES.

## 3. Source in his world

- **The van livery** (photos `oj-van-livery`, `oj-van-rear`): black panels, white lettering, the blue bubble mark, a stacked list of services on the side, phone number in big type on the back.
- **The logo**: wide heavy capitals with a hard grey drop shadow, blue foam cloud of bubbles behind a white car.
- **The driveways**: block paving, gravel, brick. Every photo is someone's home.
- Outside web design: the painted service list on the side of a working van (signwriting), and a garage "job card" that lists what was done to the car.

## 4. Zwicky box (picked option in bold)

| Axis | Options |
|---|---|
| Layout | full-bleed photo hero / **price list as the hero's other half** / gallery-first / single long job card / map-first |
| Type | serif + grotesque / **one wide grotesque at two widths (Archivo wdth 125 and 100)** / condensed + mono / slab |
| Colour | **colour blocking: livery black panels against paper white, foam blue only for actions** / monochrome photos / all-blue / duotone |
| Material | **real driveway photos, ungraded** / foam texture / scanned job sheet / none |
| Motion | **none on load or scroll; the booking summary updates live** / foam bubbles / photo reveal / parallax |

## 5. Directions (rough typicality)

1. Black luxury detailer with video (0.6) - the default, cut.
2. Van-side signwriting: price list painted down a black panel next to the van photo (0.15).
3. Driveway wall: 40 cars on 40 drives, captioned by car (0.2).
4. Job card: every page a garage job sheet (0.1) - receipt/ticket gimmick risk, cut.
5. Foam: bubbles as the whole visual system (0.25) - decoration, cut.
6. Maintenance calendar: the plan as a year wall planner (0.1) - too close to the Peters farm planner, cut (step 11).
7. Booking-first: the site is the booking builder (0.2).
8. All-blue brand field (0.3).

Survivors 2, 3 and 7 combine without sharing a main technique. SCAMPER "combine": the van-side price list is also the first step of the booking.

## 6. Concept

**The site is Owen's van pulling up: black livery, his services and prices painted down the side, and the proof parked on every drive.**

## 7. System

- **Type:** Archivo variable (OFL, self-hosted, `src/fonts/`). Display at `wdth` 125, weight 800 to 900, tight tracking, sentence case: it echoes the wide capitals of his logo without redrawing it. Text at `wdth` 100, weight 400 and 600. Numbers tabular. One family only.
- **Colour** (tokens in `globals.css`, origin noted on each):
  - `--livery` near-black, slightly blue: the van's side panels.
  - `--paper` white tinted towards blue: the van's lettering and the logo background.
  - `--foam` #0097d7: the blue on his old site and logo foam. Fills and large text only; `--foam-ink` (darker, same hue) for links on paper, `--foam-lite` for text on livery.
  - `--bubble` pale blue from the logo bubbles: selected states.
- **Radius:** 4px on controls, 0 on photos and panels (the van is boxy).
- **Signature component:** the booking builder at `/book/`. Pick the package from the van-side list, then the vehicle, extras, a day and a start time; a "job card" beside it updates the price and time as you go and is what lands in Owen's inbox.
- **Big interaction:** none. No load or scroll animation.

## 8. Swap test

A rival's logo on this page: the van photo, the painted price list in his exact wording, the driveways and "Thanks Owen" reviews all name Owen. Fails the swap, as it should.

## 9. Booking system decision

Owen wants "a booking system like Harry's". Static hosting cannot hold a live diary, so v1 is a **booking request**: the customer chooses package, vehicle, extras, day and start time, and it lands in Owen's email as a job card (FormSubmit, same as the Peters site). Owen texts back to confirm. Days he doesn't work are not offered.

To go fully live (slots disappear once taken, reminders, deposits), Owen signs up to a booking app himself (Goldie is what most UK detailers use; Cal.com is free). Put its link in `site.bookingApp` and the time step hands over to it with the package already chosen. See `HANDOVER.md`.
