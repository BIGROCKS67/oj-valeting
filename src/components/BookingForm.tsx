"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { services, getService, gbp } from "@/data/services";
import { site } from "@/data/site";
import { asset } from "@/data/base";
import { hours, hoursList, season, startTimes } from "@/data/hours";

// The booking builder (DESIGN.md section 7). Posts to FormSubmit, which emails Owen the whole
// job card. With JavaScript off it is one long form with a plain date box; with it on it becomes
// five steps with the job card updating beside it. FormSubmit needs a one-off activation click
// from Owen's inbox the first time it is used (HANDOVER.md).

const ACTION = `https://formsubmit.co/${site.email}`;

const vehicleTypes = [
  "Small car or hatchback",
  "Saloon or estate",
  "SUV or 4x4",
  "Seven-seater or large SUV",
  "Van or pick-up",
  "Motorhome, caravan or horsebox",
];
const conditions = [
  "Kept clean, just due a proper valet",
  "Needs some work",
  "Hasn't been cleaned in a long time",
  "Dog hair, mould or bad smells",
];

const steps = ["Package", "Vehicle", "Extras", "Day and time", "Your details"] as const;

type Errors = Record<string, string>;

const dayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });
const longFmt = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const isoOf = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dowOf = (iso: string) => new Date(iso + "T12:00:00").getDay();

/** Working days from tomorrow, skipping days off and days too short for the job. */
function bookableDays(jobHours: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + site.minNoticeDays);
  for (let i = 0; i < site.bookAheadDays; i++) {
    if (!site.closedDates.includes(isoOf(d)) && startTimes(d.getDay(), jobHours).length) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function BookingForm() {
  const form = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const stepHead = useRef<HTMLHeadingElement>(null);
  const [js, setJs] = useState(false);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  // job card state
  const [pkg, setPkg] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [option, setOption] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");

  const service = getService(pkg);
  const jobHours = service?.jobHours ?? 2;
  const days = useMemo(() => (js ? bookableDays(jobHours) : []), [js, jobHours]);
  const starts = day ? startTimes(dowOf(day), jobHours) : [];

  useEffect(() => {
    setJs(true);
    if (form.current) form.current.noValidate = true;
    const q = new URLSearchParams(window.location.search).get("package");
    if (q && getService(q)) {
      setPkg(q);
      setStep(1);
    }
    const reset = () => setSending(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  // keep extras, option and start time valid for the chosen package
  useEffect(() => {
    if (!service) return;
    setExtras((xs) => xs.filter((x) => service.extras.includes(x)));
    setOption((o) => (service.option?.choices.includes(o) ? o : ""));
  }, [pkg]); // eslint-disable-line react-hooks/exhaustive-deps

  // a different package or day can rule out the chosen day or start time
  useEffect(() => {
    if (!js) return;
    if (day && !days.some((d) => isoOf(d) === day)) setDay("");
    setStart((t) => (starts.includes(t) ? t : ""));
  }, [day, jobHours, js]); // eslint-disable-line react-hooks/exhaustive-deps

  function val(name: string) {
    const fd = new FormData(form.current!);
    return String(fd.get(name) ?? "").trim();
  }

  function check(upTo: number): Errors {
    const e: Errors = {};
    const s = (n: number) => !js || upTo >= n;
    if (s(0) && !pkg) e.package = "Choose a package";
    if (s(1)) {
      if (!vehicle) e.vehicle = "Choose the type of vehicle";
      if (!condition) e.condition = "Choose how the vehicle is now";
      if (service?.option && !option) e.option = `Choose ${service.option.label.toLowerCase().replace("?", "")}`;
    }
    if (s(3)) {
      if (!val("date")) e.date = "Choose a day";
      if (!start) e.start = "Choose a start time";
    }
    if (s(4)) {
      if (!val("name")) e.name = "Enter your name";
      if (val("phone").replace(/\D/g, "").length < 10) e.phone = "Enter a mobile number, like 07700 900123";
      const em = val("email");
      if (em && !/^\S+@\S+\.\S+$/.test(em)) e.email = "Enter an email address like name@example.com, or leave it blank";
      if (!val("address")) e.address = "Enter the address where the vehicle will be";
      if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(val("postcode"))) e.postcode = "Enter a postcode, like MK18 1AA";
    }
    return e;
  }

  function fail(e: Errors) {
    setErrors(e);
    if (!document.title.startsWith("Error: ")) document.title = `Error: ${document.title}`;
    requestAnimationFrame(() => summary.current?.focus());
  }
  function clearTitle() {
    document.title = document.title.replace(/^Error: /, "");
  }

  function next() {
    const e = check(step);
    if (Object.keys(e).length) return fail(e);
    setErrors({});
    clearTitle();
    setStep((n) => Math.min(n + 1, steps.length - 1));
    requestAnimationFrame(toStep);
  }
  function back() {
    setErrors({});
    clearTitle();
    setStep((n) => Math.max(n - 1, 0));
    requestAnimationFrame(toStep);
  }
  // Focus the new step's heading; only scroll if the top of the form has gone off screen.
  function toStep() {
    stepHead.current?.focus({ preventScroll: true });
    const top = form.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.5) {
      const smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      form.current?.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "auto" });
    }
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    if (js && step < steps.length - 1) {
      ev.preventDefault();
      next();
      return;
    }
    const e = check(steps.length - 1);
    if (Object.keys(e).length) {
      ev.preventDefault();
      return fail(e);
    }
    clearTitle();
    setSending(true);
  }

  function onInput() {
    if (!Object.keys(errors).length) return;
    const e = check(js ? step : steps.length - 1);
    const kept: Errors = {};
    for (const k of Object.keys(errors)) if (e[k]) kept[k] = e[k];
    setErrors(kept);
    if (!Object.keys(kept).length) clearTitle();
  }

  const show = (n: number) => !js || step === n;
  const errList = Object.entries(errors);
  const err = (k: string) =>
    errors[k] && (
      <p className="field-err" id={`b-${k}-err`}>
        <span className="visually-hidden">Error:</span> {errors[k]}
      </p>
    );
  const aria = (k: string) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `b-${k}-err` : undefined,
  });

  const dayLabel = day ? longFmt.format(new Date(day + "T12:00:00")) : "";
  const subject = `Booking request: ${service?.name ?? "package to choose"}${dayLabel ? `, ${dayLabel}` : ""}${start ? ` at ${start}` : ""}`;

  return (
    <div className={`booker${js ? " is-js" : ""}`}>
      <form ref={form} action={ACTION} method="POST" onSubmit={onSubmit} onInput={onInput} className="book-form">
        {js && (
          <div className="steps-head">
            <p className="step-count">
              Step {step + 1} of {steps.length}
            </p>
            <ol className="step-dots" aria-hidden="true">
              {steps.map((s, i) => (
                <li key={s} className={i < step ? "done" : i === step ? "now" : ""}>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        )}

        {errList.length > 0 && (
          <div className="err-summary" role="alert" tabIndex={-1} ref={summary}>
            <p className="err-title">There is a problem</p>
            <ul>
              {errList.map(([k, msg]) => (
                <li key={k}>
                  <a
                    href={`#b-${k}`}
                    onClick={(ev) => {
                      const el = document.getElementById(`b-${k}`) ?? document.querySelector<HTMLElement>(`[name="${k}"]`);
                      if (el) {
                        ev.preventDefault();
                        el.focus();
                      }
                    }}
                  >
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 1. Package */}
        <fieldset className="step" hidden={!show(0)} aria-describedby={errors.package ? "b-package-err" : undefined}>
          <legend>
            <h2 ref={step === 0 ? stepHead : undefined} tabIndex={-1}>
              What would you like done?
            </h2>
          </legend>
          {err("package")}
          <div className="pkg-list">
            {services.map((s, i) => (
              <label key={s.slug} className="pkg">
                <input
                  type="radio"
                  name="package"
                  value={s.name}
                  id={i === 0 ? "b-package" : undefined}
                  checked={pkg === s.slug}
                  onChange={() => setPkg(s.slug)}
                  required
                />
                <span className="pkg-name">{s.name}</span>
                <span className="pkg-price num">from {gbp(s.from)}</span>
                <span className="pkg-time">{s.time}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 2. Vehicle */}
        <fieldset className="step" hidden={!show(1)}>
          <legend>
            <h2 ref={step === 1 ? stepHead : undefined} tabIndex={-1}>
              Tell Owen about the vehicle
            </h2>
          </legend>

          <fieldset className={`field${errors.vehicle ? " has-err" : ""}`} {...aria("vehicle")}>
            <legend className="label">What is it?</legend>
            {err("vehicle")}
            <div className="chips">
              {vehicleTypes.map((v, i) => (
                <label key={v} className="chip">
                  <input
                    type="radio"
                    name="vehicle"
                    value={v}
                    id={i === 0 ? "b-vehicle" : undefined}
                    onChange={() => setVehicle(v)}
                    required
                  />
                  <span>{v}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="b-model" className="label">
              Make and model (optional)
            </label>
            <input id="b-model" name="make_model" className="w-m" autoComplete="off" value={model} onChange={(e) => setModel(e.target.value)} />
          </div>

          <fieldset className={`field${errors.condition ? " has-err" : ""}`} {...aria("condition")}>
            <legend className="label">How is it now?</legend>
            {err("condition")}
            <div className="chips">
              {conditions.map((c, i) => (
                <label key={c} className="chip">
                  <input
                    type="radio"
                    name="condition"
                    value={c}
                    id={i === 0 ? "b-condition" : undefined}
                    onChange={() => setCondition(c)}
                    required
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {(js ? service?.option : true) &&
            services
              .filter((s) => s.option && (!js || s.slug === pkg))
              .map((s) => (
                <fieldset key={s.slug} className={`field${errors.option ? " has-err" : ""}`} {...aria("option")}>
                  <legend className="label">
                    {s.option!.label}
                    {!js && ` (${s.name.toLowerCase()} only)`}
                  </legend>
                  {err("option")}
                  <div className="chips">
                    {s.option!.choices.map((c, i) => (
                      <label key={c} className="chip">
                        <input
                          type="radio"
                          name={s.option!.name}
                          value={c}
                          id={i === 0 ? "b-option" : undefined}
                          checked={option === c}
                          onChange={() => setOption(c)}
                        />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
        </fieldset>

        {/* 3. Extras */}
        <fieldset className="step" hidden={!show(2)}>
          <legend>
            <h2 ref={step === 2 ? stepHead : undefined} tabIndex={-1}>
              Any extras?
            </h2>
          </legend>
          <p className="hint">Optional. Owen prices extras with the job once he&rsquo;s seen the vehicle.</p>
          {js && service && service.extras.length === 0 && (
            <p>The maintenance package has extras on request. Add anything you&rsquo;d like in the notes below.</p>
          )}
          <div className="chips">
            {(js ? service?.extras ?? [] : Array.from(new Set(services.flatMap((s) => s.extras)))).map((x) => (
              <label key={x} className="chip chip-check">
                <input
                  type="checkbox"
                  name="extras"
                  value={x}
                  checked={extras.includes(x)}
                  onChange={(e) => setExtras((xs) => (e.target.checked ? [...xs, x] : xs.filter((y) => y !== x)))}
                />
                <span>{x}</span>
              </label>
            ))}
          </div>
          <div className="field">
            <label htmlFor="b-notes" className="label">
              Anything else Owen should know? (optional)
            </label>
            <p className="hint" id="b-notes-hint">
              For example, a scratch you want looked at, child seats in the car, or where it will be parked.
            </p>
            <textarea id="b-notes" name="notes" rows={3} aria-describedby="b-notes-hint" />
          </div>
        </fieldset>

        {/* 4. Day and time */}
        <fieldset className="step" hidden={!show(3)}>
          <legend>
            <h2 ref={step === 3 ? stepHead : undefined} tabIndex={-1}>
              Pick a day and start time
            </h2>
          </legend>
          <p className="hint">
            Owen texts you to confirm the slot, or to offer the nearest one if that day has filled up. Sundays are by
            arrangement: <a href={`tel:${site.phoneIntl}`}>call</a> or text Owen.
          </p>
          <details className="hours-box">
            <summary>{season}</summary>
            <dl className="hours-list">
              {hoursList.map(([d, t]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{t}</dd>
                </div>
              ))}
            </dl>
          </details>

          <div className={`field${errors.date ? " has-err" : ""}`}>
            {js ? (
              <fieldset {...aria("date")}>
                <legend className="label">Day</legend>
                {err("date")}
                <div className="days">
                  {days.map((d, i) => {
                    const iso = isoOf(d);
                    const weekStart = i > 0 && d.getDay() < days[i - 1].getDay();
                    return (
                      <label key={iso} className={`day${weekStart ? " wk" : ""}`}>
                        <input
                          type="radio"
                          name="date"
                          value={iso}
                          id={i === 0 ? "b-date" : undefined}
                          checked={day === iso}
                          onChange={() => setDay(iso)}
                        />
                        <span>{dayFmt.format(d)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : (
              <>
                <label htmlFor="b-date" className="label">
                  Day
                </label>
                <input id="b-date" name="date" type="date" required className="w-date" />
              </>
            )}
          </div>

          <fieldset className={`field${errors.start ? " has-err" : ""}`} {...aria("start")}>
            <legend className="label">Start time</legend>
            {err("start")}
            {js && !day && <p className="hint">Choose a day to see the start times.</p>}
            {js && day && hours[dowOf(day)]?.oneJob && (
              <p className="hint">Saturdays are one job only, starting first thing.</p>
            )}
            {js && day && !hours[dowOf(day)]?.oneJob && starts.length === 1 && (
              <p className="hint">This job takes most of Owen&rsquo;s day, so he starts it first thing.</p>
            )}
            <div className="chips">
              {(js ? starts : ["8am", "8:30am", "9am", "10am", "11am", "midday", "1pm", "2pm"]).map((t, i) => (
                <label key={t} className="chip">
                  <input
                    type="radio"
                    name="start_time"
                    value={t}
                    id={i === 0 ? "b-start" : undefined}
                    checked={start === t}
                    onChange={() => setStart(t)}
                    required
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {site.bookingApp && (
            <p>
              Or <a href={site.bookingApp}>pick a live slot in Owen&rsquo;s diary</a>.
            </p>
          )}
        </fieldset>

        {/* 5. Details */}
        <fieldset className="step" hidden={!show(4)}>
          <legend>
            <h2 ref={step === 4 ? stepHead : undefined} tabIndex={-1}>
              Your details
            </h2>
          </legend>
          <p className="hint">Owen uses these to confirm the booking and find the vehicle. Nothing else.</p>

          <div className={`field${errors.name ? " has-err" : ""}`}>
            <label htmlFor="b-name" className="label">
              Full name
            </label>
            {err("name")}
            <input id="b-name" name="name" autoComplete="name" required className="w-m" {...aria("name")} />
          </div>

          <div className={`field${errors.phone ? " has-err" : ""}`}>
            <label htmlFor="b-phone" className="label">
              Mobile number
            </label>
            <p className="hint">Owen texts you here to confirm.</p>
            {err("phone")}
            <input
              id="b-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className="w-phone"
              {...aria("phone")}
            />
          </div>

          <div className={`field${errors.email ? " has-err" : ""}`}>
            <label htmlFor="b-email" className="label">
              Email (optional)
            </label>
            {err("email")}
            <input id="b-email" name="email" type="email" autoComplete="email" className="w-m" {...aria("email")} />
          </div>

          <div className={`field${errors.address ? " has-err" : ""}`}>
            <label htmlFor="b-address" className="label">
              Address where the vehicle will be
            </label>
            {err("address")}
            <input id="b-address" name="address" autoComplete="street-address" required className="w-m" {...aria("address")} />
          </div>

          <div className={`field${errors.postcode ? " has-err" : ""}`}>
            <label htmlFor="b-postcode" className="label">
              Postcode
            </label>
            {err("postcode")}
            <input
              id="b-postcode"
              name="postcode"
              autoComplete="postal-code"
              autoCapitalize="characters"
              required
              className="w-pc"
              {...aria("postcode")}
            />
          </div>

          <fieldset className="field">
            <legend className="label">Is there an outside tap and power socket Owen can use? (optional)</legend>
            <div className="chips">
              {["Yes, both", "Tap only", "Neither", "Not sure"].map((c) => (
                <label key={c} className="chip">
                  <input type="radio" name="water_and_power" value={c} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </fieldset>

        <input type="hidden" name="price_from" value={service ? gbp(service.from) : ""} />
        <input type="hidden" name="_subject" value={subject} />
        <input type="hidden" name="_next" value={js ? `${window.location.origin}${asset("/book/sent/")}` : `${site.url}/book/sent/`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <div className="hp" aria-hidden="true">
          <label>
            Leave this empty
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="form-actions">
          {js && step > 0 && (
            <button type="button" className="btn btn-line" onClick={back}>
              Back
            </button>
          )}
          {js && step < steps.length - 1 ? (
            <button type="submit" className="btn btn-foam">
              Continue
            </button>
          ) : (
            <button type="submit" className="btn btn-foam" disabled={sending}>
              {sending ? "Sending your booking" : "Send booking request"}
            </button>
          )}
        </div>
        {(!js || step === steps.length - 1) && (
          <p className="privacy-note">
            Your details go straight to Owen by email and are used only for this booking.{" "}
            <a href={asset("/privacy/")}>Privacy</a>
          </p>
        )}
      </form>

      {js && (
        <aside className="jobcard" aria-label="Your booking so far" aria-live="polite">
          <p className="jc-title">Your booking</p>
          <dl>
            <div>
              <dt>Package</dt>
              <dd>{service?.name ?? "Not chosen yet"}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd className="num">{service ? `from ${gbp(service.from)}` : "-"}</dd>
            </div>
            <div>
              <dt>Time on the job</dt>
              <dd>{service?.time ?? "-"}</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>{[model, vehicle].filter(Boolean).join(", ") || "-"}</dd>
            </div>
            {option && (
              <div>
                <dt>{service?.option?.name === "frequency" ? "How often" : "Coating"}</dt>
                <dd>{option}</dd>
              </div>
            )}
            <div>
              <dt>Extras</dt>
              <dd>{extras.length ? extras.join(", ") : "None"}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{dayLabel ? `${dayLabel}${start ? `, ${start} start` : ""}` : "-"}</dd>
            </div>
          </dl>
          <p className="jc-note">Owen confirms the final price once he knows the size and condition, before he starts.</p>
        </aside>
      )}
    </div>
  );
}
