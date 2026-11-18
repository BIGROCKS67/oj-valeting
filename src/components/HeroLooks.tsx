"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FoamGL } from "@/components/FoamGL";
import { asset } from "@/data/base";

// Three hero "looks" for Owen to try on the live home page before he picks one (Jack, 18 Nov 2026).
// Only switched on by ?look= in the address (ojvalet.co.uk/?look=1), so normal visitors see the
// standard hero. Remove this file and the <HeroLooks /> line once Owen has chosen.
//   1 Foam: the car is covered in snow foam and you wipe it off
//   2 Wheel: a 3D alloy, built in code, turning behind the lettering
//   3 Scroll: scrolling flicks through his own jobs (stand-in until he films one job on a tripod)

type Look = 0 | 1 | 2 | 3;
const names: Record<Look, string> = { 0: "Photo", 1: "Foam", 2: "3D wheel", 3: "Scroll" };

const seq = [
  "defender-snow-foam",
  "porsche-taycan-black",
  "porsche-boxster-red",
  "range-rover-black",
  "bmw-m4-white",
  "alfa-romeo-4c",
  "porsche-taycan-blue",
  "defender-90-black",
  "porsche-macan-white",
  "bmw-m2",
  "porsche-cayenne-coupe",
  "bmw-m4-wash",
];

export function HeroLooks() {
  const [look, setLook] = useState<Look | null>(null);
  const [noGL, setNoGL] = useState(false);
  const failGL = useCallback(() => setNoGL(true), []);

  useEffect(() => {
    const v = new URLSearchParams(location.search).get("look");
    if (v !== null) setLook((["0", "1", "2", "3"].includes(v) ? Number(v) : 0) as Look);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero || look === null) return;
    hero.dataset.look = String(look);
    return () => {
      delete hero.dataset.look;
    };
  }, [look]);

  if (look === null) return null;

  const pick = (l: Look) => {
    const u = new URL(location.href);
    u.searchParams.set("look", String(l));
    history.replaceState(null, "", u);
    window.scrollTo({ top: 0 });
    setLook(l);
  };
  const like = `https://wa.me/?text=${encodeURIComponent(`I like look ${look} (${names[look]}) for the home page`)}`;

  return (
    <>
      {look === 1 && (noGL ? <Foam /> : <FoamGL onFail={failGL} />)}
      {look === 2 && <Wheel />}
      {look === 3 && <Scroll />}
      <div className="look-bar" role="region" aria-label="Try a home page look">
        <span className="look-bar-h">Try a look:</span>
        {([0, 1, 2, 3] as Look[]).map((l) => (
          <button key={l} type="button" aria-pressed={look === l} onClick={() => pick(l)}>
            {l === 0 ? names[0] : `${l}. ${names[l]}`}
          </button>
        ))}
        <a href={like} className="look-like">
          I like this one
        </a>
      </div>
    </>
  );
}

/* ---------- 1. Foam: wipe the snow foam off ---------- */

function Foam() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const cv = ref.current!;
    const hero = cv.closest<HTMLElement>(".hero")!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let done = false;
    let touched = false;
    let auto = 0;

    const paint = () => {
      w = hero.clientWidth;
      h = hero.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgb(236 243 248)";
      ctx.fillRect(0, 0, w, h);
      // Bubbles: soft white domes with a thin foam-blue rim, from his logo
      const n = Math.round((w * h) / 380);
      for (let i = 0; i < n; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 2 + Math.random() ** 2.4 * 26;
        const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
        g.addColorStop(0, "rgb(255 255 255 / 0.95)");
        g.addColorStop(0.7, "rgb(232 241 248 / 0.9)");
        g.addColorStop(1, "rgb(170 205 228 / 0.55)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        if (r > 7) {
          ctx.strokeStyle = "rgb(0 151 215 / 0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const brush = (x: number, y: number, r: number) => {
      ctx.globalCompositeOperation = "destination-out";
      const g = ctx.createRadialGradient(x, y, r * 0.35, x, y, r);
      g.addColorStop(0, "rgb(0 0 0 / 1)");
      g.addColorStop(1, "rgb(0 0 0 / 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let last: [number, number] | null = null;
    const wipe = (cx: number, cy: number) => {
      if (done) return;
      const b = cv.getBoundingClientRect();
      const x = cx - b.left;
      const y = cy - b.top;
      const r = w < 700 ? 56 : 80;
      if (last) {
        const [lx, ly] = last;
        const steps = Math.ceil(Math.hypot(x - lx, y - ly) / (r / 4));
        for (let i = 1; i <= steps; i++) brush(lx + ((x - lx) * i) / steps, ly + ((y - ly) * i) / steps, r);
      } else brush(x, y, r);
      last = [x, y];
      clearTimeout(auto);
      auto = window.setTimeout(rinse, 2500);
      if (!touched) {
        touched = true;
        setHint(false);
      }
    };
    const onPointer = (e: PointerEvent) => wipe(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => wipe(e.touches[0].clientX, e.touches[0].clientY);
    const onLeave = () => (last = null);

    // The rinse: water runs down from the top and the foam goes with it
    let raf = 0;
    const rinse = () => {
      if (done) return;
      done = true;
      setHint(false);
      const start = performance.now();
      const run = (t: number) => {
        const p = Math.min((t - start) / 1600, 1);
        const line = p * (h + 120);
        ctx.globalCompositeOperation = "destination-out";
        for (let x = 0; x < w; x += 18) {
          const y = line - 60 + Math.sin(x / 70 + p * 9) * 26;
          ctx.fillStyle = "rgb(0 0 0 / 0.5)";
          ctx.fillRect(x, 0, 18, Math.max(0, y));
        }
        if (p < 1) raf = requestAnimationFrame(run);
        else cv.style.opacity = "0";
      };
      raf = requestAnimationFrame(run);
    };

    paint();
    hero.addEventListener("pointermove", onPointer);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("touchmove", onTouch, { passive: true });
    hero.addEventListener("touchend", onLeave);
    auto = window.setTimeout(rinse, 4500);
    return () => {
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("touchmove", onTouch);
      hero.removeEventListener("touchend", onLeave);
      clearTimeout(auto);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="hero-fx hero-foam" aria-hidden="true" />
      {hint && (
        <p className="foam-hint" aria-hidden="true">
          Wipe the foam off
        </p>
      )}
    </>
  );
}

/* ---------- 2. Wheel: a 3D alloy built in code ---------- */

function Wheel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stop = () => {};
    let cancelled = false;
    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (cancelled || !ref.current) return;
      const box = ref.current;
      const hero = box.closest<HTMLElement>(".hero")!;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.45;
      box.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
      camera.position.set(0, 0, 7.2);

      scene.environmentIntensity = 1.3;
      const key = new THREE.DirectionalLight(0xffffff, 4);
      key.position.set(3, 2, 4);
      const rim = new THREE.DirectionalLight(0x7cc8ee, 3); // foam-blue edge light from behind
      rim.position.set(-4, 3, -3);
      scene.add(key, rim, new THREE.AmbientLight(0x8fb8d8, 0.35));

      const rig = new THREE.Group(); // tilts to the pointer
      const wheel = new THREE.Group(); // spins
      rig.add(wheel);
      scene.add(rig);

      const tyreMat = new THREE.MeshStandardMaterial({ color: 0x121316, roughness: 0.85 });
      const gunmetal = new THREE.MeshStandardMaterial({ color: 0x2b2f35, metalness: 1, roughness: 0.32 });
      const machined = new THREE.MeshStandardMaterial({ color: 0xf3f5f7, metalness: 1, roughness: 0.08 });
      const disc = new THREE.MeshStandardMaterial({ color: 0x6f7378, metalness: 1, roughness: 0.45 });
      const red = new THREE.MeshPhysicalMaterial({ color: 0xc8141c, metalness: 0.2, roughness: 0.28, clearcoat: 1 });

      // Tyre: a lathe of the sidewall profile
      const prof = [
        [0.86, -0.38], [0.95, -0.42], [1.08, -0.41], [1.16, -0.34], [1.19, 0], [1.16, 0.34], [1.08, 0.41], [0.95, 0.42], [0.86, 0.38],
      ].map(([r, z]) => new THREE.Vector2(r, z));
      const tyre = new THREE.Mesh(new THREE.LatheGeometry(prof, 96), tyreMat);
      tyre.rotation.x = Math.PI / 2;
      wheel.add(tyre);

      // Barrel and polished lip
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 0.84, 96, 1, true), gunmetal);
      barrel.rotation.x = Math.PI / 2;
      barrel.material.side = THREE.DoubleSide;
      wheel.add(barrel);
      const lip = new THREE.Mesh(new THREE.TorusGeometry(0.87, 0.035, 16, 128), machined);
      lip.position.z = 0.4;
      lip.scale.setScalar(1.0);
      wheel.add(lip);

      // Ten tapered spokes in five pairs: gunmetal body, machined face
      const spokeShape = (wHub: number, wRim: number) => {
        const sh = new THREE.Shape();
        sh.moveTo(-wHub / 2, 0.2);
        sh.lineTo(wHub / 2, 0.2);
        sh.lineTo(wRim / 2, 0.84);
        sh.lineTo(-wRim / 2, 0.84);
        sh.closePath();
        return sh;
      };
      const bodyGeo = new THREE.ExtrudeGeometry(spokeShape(0.1, 0.2), { depth: 0.12, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2 });
      const faceGeo = new THREE.ExtrudeGeometry(spokeShape(0.05, 0.11), { depth: 0.015, bevelEnabled: false });
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + (i % 2 ? 0.09 : -0.09);
        const arm = new THREE.Group();
        const body = new THREE.Mesh(bodyGeo, gunmetal);
        body.position.z = 0.3;
        const face = new THREE.Mesh(faceGeo, machined);
        face.position.z = 0.435;
        arm.add(body, face);
        arm.rotation.z = a;
        wheel.add(arm);
      }

      // Hub, centre cap and five nuts
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.16, 48), gunmetal);
      hub.rotation.x = Math.PI / 2;
      hub.position.z = 0.38;
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 40), machined);
      cap.rotation.x = Math.PI / 2;
      cap.position.z = 0.47;
      wheel.add(hub, cap);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 6), machined);
        nut.rotation.x = Math.PI / 2;
        nut.position.set(Math.cos(a) * 0.16, Math.sin(a) * 0.16, 0.47);
        wheel.add(nut);
      }

      // Brake disc and the red caliper (these don't spin)
      const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.74, 0.05, 72), disc);
      rotor.rotation.x = Math.PI / 2;
      rotor.position.z = 0.02;
      rig.add(rotor);
      const caliper = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.09, 16, 40, Math.PI / 2.6), red);
      caliper.position.z = 0.14;
      caliper.rotation.z = Math.PI * 0.08;
      rig.add(caliper);

      let px = 0;
      let py = 0;
      const onMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        px = (e.clientX - r.left) / r.width - 0.5;
        py = (e.clientY - r.top) / r.height - 0.5;
      };
      hero.addEventListener("pointermove", onMove);

      const size = () => {
        const w = box.clientWidth;
        const h = box.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const wide = w / h > 1;
        const viewH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const viewW = viewH * camera.aspect;
        rig.position.set(wide ? -viewW * 0.2 : 0, wide ? -0.05 : viewH * 0.2, 0);
        rig.scale.setScalar(wide ? Math.min(1.25, (viewW * 0.42) / 2.4) : Math.min(0.9, (viewW * 0.8) / 2.4));
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(box);

      const still = !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(box);
      const t0 = performance.now();
      const frame = (t: number) => {
        const s = (t - t0) / 1000;
        if (visible) {
          wheel.rotation.z = -s * 0.7;
          rig.rotation.y += (-0.32 + px * 0.5 - rig.rotation.y) * 0.06;
          rig.rotation.x += (0.08 + py * 0.3 - rig.rotation.x) * 0.06;
          key.position.x = Math.sin(s * 0.6) * 5; // light sweeps across the fresh polish
          renderer.render(scene, camera);
        }
        if (!still) raf = requestAnimationFrame(frame);
      };
      rig.rotation.set(0.08, -0.32, 0);
      if (still) renderer.render(scene, camera);
      else raf = requestAnimationFrame(frame);
      box.classList.add("is-on");

      stop = () => {
        cancelAnimationFrame(raf);
        hero.removeEventListener("pointermove", onMove);
        ro.disconnect();
        io.disconnect();
        renderer.dispose();
        pmrem.dispose();
        renderer.domElement.remove();
      };
    })();
    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return <div ref={ref} className="hero-fx hero-wheel" aria-hidden="true" />;
}

/* ---------- 3. Scroll: flick through his jobs ---------- */

function Scroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const hero = ref.current!.closest<HTMLElement>(".hero")!;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        const run = r.height - window.innerHeight;
        const p = Math.min(Math.max(-r.top / Math.max(run, 1), 0), 0.9999);
        setI(Math.floor(p * seq.length));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div ref={ref} className="hero-fx hero-seq" aria-hidden="true">
      <div className="seq-stage">
        {seq.map((id, k) => (
          <picture key={id} className={k === i ? "on" : undefined}>
            <source media="(min-width: 700px)" srcSet={asset(`/photos/hero-${id}-1536.webp`)} />
            <img src={asset(`/photos/${id}-960.webp`)} alt="" loading={k < 2 ? "eager" : "lazy"} decoding="async" />
          </picture>
        ))}
        <p className="seq-count">
          <span className="num">{String(i + 1).padStart(2, "0")}</span> / {seq.length} of Owen&rsquo;s jobs
        </p>
      </div>
    </div>
  );
}
