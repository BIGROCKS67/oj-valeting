"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { asset } from "@/data/base";

// Look 1, the full version: Owen's photo covered in snow foam, drawn by a shader.
// - Foam: three sizes of bubble (cells with walls and a highlight each), slowly shifting, with
//   the photo showing through, bent, where the foam is thin.
// - Rinse: scrolling runs water down from the top with drips, taking the foam with it (one way
//   only). With no scroll in 1.8 s it rinses itself. Paint behind the water looks wet, with droplets.
// - Polish: one light sweep runs across the clean paint, then it stops drawing.
// Calls onFail if WebGL isn't there, so the 2D foam can stand in.

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main() { vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uImg;
uniform sampler2D uMask;
uniform vec2 uRes;
uniform vec2 uImgRes;
uniform vec2 uFocus;
uniform float uTime;
uniform float uRinse;
uniform float uSweep;
uniform float uDpr;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
float hash1(float x) { return fract(sin(x * 91.17) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash2(i).x, b = hash2(i + vec2(1.0, 0.0)).x, c = hash2(i + vec2(0.0, 1.0)).x, d = hash2(i + vec2(1.0, 1.0)).x;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) { return 0.55 * vnoise(p) + 0.3 * vnoise(p * 2.1) + 0.15 * vnoise(p * 4.3); }

// Voronoi: x = distance to the cell edge, yz = offset from the cell's centre
vec3 cells(vec2 x, float t) {
  vec2 n = floor(x), f = fract(x);
  vec2 mg, mr;
  float md = 8.0;
  for (int j = -1; j <= 1; j++)
  for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 o = hash2(n + g);
    o = 0.5 + 0.38 * sin(t + 6.2831 * o);
    vec2 r = g + o - f;
    float d = dot(r, r);
    if (d < md) { md = d; mr = r; mg = g; }
  }
  md = 8.0;
  for (int j = -2; j <= 2; j++)
  for (int i = -2; i <= 2; i++) {
    vec2 g = mg + vec2(float(i), float(j));
    vec2 o = hash2(n + g);
    o = 0.5 + 0.38 * sin(t + 6.2831 * o);
    vec2 r = g + o - f;
    if (dot(mr - r, mr - r) > 0.00001) md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
  }
  return vec3(md, mr);
}

// One layer of round bubbles: each cell may hold a bubble (density), lit like a little dome,
// with a bright window highlight and a faint foam-blue rim. Returns colour and coverage.
vec4 bubbles(vec2 px, float size, float t, float density) {
  vec2 q = px / size;
  vec2 n = floor(q), f = fract(q);
  vec4 best = vec4(0.0);
  for (int j = -1; j <= 1; j++)
  for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 h = hash2(n + g);
    if (h.y > density) continue;
    vec2 o = 0.5 + 0.3 * sin(t + 6.2831 * h);
    vec2 r = g + o - f;
    float rad = 0.42 + 0.3 * h.x;
    float d = length(r) / rad;
    if (d > 1.0) continue;
    vec3 nrm = normalize(vec3(r / rad, sqrt(max(1.0 - d * d, 0.0)) + 0.15));
    vec3 L = normalize(vec3(-0.45, 0.55, 0.7));
    float dif = 0.72 + 0.28 * max(dot(nrm, L), 0.0);
    float spec = pow(max(dot(reflect(-L, nrm), vec3(0.0, 0.0, 1.0)), 0.0), 28.0);
    float rim = smoothstep(0.7, 1.0, d);
    vec3 c = vec3(0.97, 0.985, 1.0) * dif;
    c = mix(c, vec3(0.62, 0.8, 0.93), rim * 0.55);
    c += spec * 0.9;
    float a = smoothstep(1.0, 0.9, d);
    if (a > best.a) best = vec4(c, a);
  }
  return best;
}

vec2 cover(vec2 uv) {
  float ar = uRes.x / uRes.y;
  float ir = uImgRes.x / uImgRes.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (1.0 - s) * uFocus + uv * s;
}

void main() {
  vec2 px = vUv * uRes;
  vec2 uv = cover(vec2(vUv.x, 1.0 - vUv.y));

  // How much foam is left here: the wipe mask, then the rinse front running down
  float m = texture2D(uMask, vec2(vUv.x, 1.0 - vUv.y)).r;
  float top = 1.0 - vUv.y;

  vec4 b1 = bubbles(px, 26.0 * uDpr, uTime * 0.25, 0.35);
  vec4 b2 = bubbles(px + 17.0, 10.0 * uDpr, uTime * 0.35 + 2.0, 0.75);
  vec4 b3 = bubbles(px + 41.0, 4.2 * uDpr, uTime * 0.5 + 4.0, 1.0);

  // The rinse front: a wavy line of water running down, with a few rounded drips running ahead
  float cx = vUv.x * 38.0;
  float fx = fract(cx);
  float finger = pow(hash1(floor(cx)), 5.0) * 0.14 * sqrt(max(0.0, 1.0 - pow((fx - 0.5) / 0.26, 2.0)));
  finger *= smoothstep(0.0, 0.25, uRinse);
  float wave = sin(vUv.x * 11.0 + uTime * 2.0) * 0.012 + sin(vUv.x * 29.0 - uTime * 3.0) * 0.005;
  float front = uRinse * 1.4 - 0.15 + wave + finger;
  float rinsed = smoothstep(front - 0.035, front + 0.008, top + b2.a * 0.012);
  m *= rinsed;
  float behind = front - top; // above zero: the water has already passed here
  float sheet = exp(-pow(max(behind, 0.0) * 12.0, 2.0)) * step(0.0, behind) * step(0.001, uRinse) * step(uRinse, 0.999);

  // Foam is thicker in clumps and thins a little in streaks as it slides down the paint
  float slide = fbm(vec2(px.x / 150.0, px.y / 520.0 + uTime * 0.05));
  float clump = fbm(px / 260.0 + 7.0);
  m *= smoothstep(0.04, 0.4, slide * 0.7 + clump * 0.5);

  // The photo: bent where foam is thin or water is running, wet and a touch brighter once rinsed
  float thin = smoothstep(0.75, 0.15, m) * step(0.02, m);
  vec2 bend = (b2.xy - 0.9) * 0.03 * thin + vec2(0.0, sheet * 0.012);
  vec3 img = texture2D(uImg, uv + bend).rgb;
  float wet = (1.0 - m) * smoothstep(1.0, 0.0, uSweep);
  vec3 paint = img * (1.0 + 0.08 * wet) + vec3(0.02, 0.03, 0.04) * wet + sheet * 0.1
    + exp(-pow(behind * 70.0, 2.0)) * 0.22 * step(0.001, uRinse) * step(uRinse, 0.999);

  // Water beads: thick just behind the water, a few left standing after the polish
  vec3 d = cells(px / (9.0 * uDpr), 0.0);
  float has = step(0.9, hash2(floor(px / (9.0 * uDpr))).x);
  float bead = smoothstep(0.42, 0.28, length(d.yz)) * has;
  float beadSpec = smoothstep(0.12, 0.0, length(d.yz - vec2(-0.1, 0.12))) * bead;
  float beads = (1.0 - m) * (0.35 + 0.65 * smoothstep(0.35, 0.0, max(behind, 0.0))) * (1.0 - 0.7 * uSweep);
  paint = paint * (1.0 - bead * 0.12 * beads) + beadSpec * 0.75 * beads;

  // Foam: small bubbles packed tight, mid and big ones sitting on top, soft blue in the gaps
  vec3 foam = vec3(0.8, 0.88, 0.94);
  foam = mix(foam, b3.rgb, b3.a);
  foam = mix(foam, b2.rgb, b2.a);
  foam = mix(foam, b1.rgb, b1.a);
  float cover_ = smoothstep(0.08, 0.55, m);
  vec3 outc = mix(paint, foam, cover_);

  // Polish: one band of light across the paint
  vec2 dir = normalize(vec2(1.0, 0.42));
  float s = dot(vec2(vUv.x * uRes.x / uRes.y, vUv.y), dir) - (uSweep * 2.6 - 0.8);
  float band = exp(-s * s * 90.0) * 0.32 + exp(-s * s * 900.0) * 0.25;
  outc += band * (1.0 - cover_) * step(0.001, uSweep) * step(uSweep, 0.999);

  gl_FragColor = vec4(outc, 1.0);
}
`;

export function FoamGL({ onFail }: { onFail: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const hero = cv.closest<HTMLElement>(".hero")!;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return onFail();

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
      return s;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch (e) {
      console.warn(e);
      return onFail();
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      img: U("uImg"), mask: U("uMask"), res: U("uRes"), imgRes: U("uImgRes"), focus: U("uFocus"),
      time: U("uTime"), rinse: U("uRinse"), sweep: U("uSweep"), dpr: U("uDpr"),
    };

    const tex = (unit: number) => {
      const t = gl.createTexture()!;
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const imgTex = tex(0);
    const maskTex = tex(1);
    gl.uniform1i(u.img, 0);
    gl.uniform1i(u.mask, 1);

    // The mask: white is foam. Kept small (a quarter size) and smoothed by the GPU.
    const mask = document.createElement("canvas");
    const mx = mask.getContext("2d")!;
    let w = 0;
    let h = 0;
    let dirty = true;
    let maskReady = false;
    const wide = () => window.innerWidth >= 700;
    const phone = !wide();
    const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1 : 1.5);

    const size = () => {
      w = hero.clientWidth;
      h = hero.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      if (!maskReady) {
        maskReady = true;
        mask.width = Math.ceil(w / 4);
        mask.height = Math.ceil(h / 4);
        mx.fillStyle = "#fff";
        mx.fillRect(0, 0, mask.width, mask.height);
      }
      gl.uniform2f(u.res, cv.width, cv.height);
      gl.uniform1f(u.dpr, dpr);
      dirty = true;
    };

    // The photo: the same crop the page would show
    const img = new Image();
    img.decoding = "async";
    img.src = wide() ? asset(`/photos/hero-${site.hero.photo}-1536.webp`) : asset(`/photos/${site.hero.photo}-960.webp`);
    const pct = (v: string) => parseFloat(v) / 100;
    const focus = wide() ? [pct(site.hero.focusX), 0.5] : [0.5, pct(site.hero.focus)];
    gl.uniform2f(u.focus, focus[0], focus[1]);
    let ready = true;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imgTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([28, 31, 36]));
    gl.uniform2f(u.imgRes, 1, 1);
    cv.classList.add("is-on");
    let auto = 0;
    img.onload = () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imgTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(u.imgRes, img.naturalWidth, img.naturalHeight);
      auto = window.setTimeout(() => {
        if (target < 0.05) autoFrom = performance.now();
      }, 1800);
    };

    // Nobody has to do anything (Jack, 18 Nov: attention spans). Scrolling rinses the foam down
    // the car, one way only. If they don't scroll within 1.8 s it rinses itself.
    let target = 0; // where the rinse should be, 0 to 1
    let rinse = 0; // where it is, easing towards target
    let autoFrom = 0; // when the automatic rinse started
    let doneAt = 0; // when the rinse finished: the polish runs from here
    const onScroll = () => {
      const p = Math.min(window.scrollY / (window.innerHeight * 0.35), 1);
      if (p > target) target = p;
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(hero);
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(hero);
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!ready || !visible) return;
      if (dirty) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, maskTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask);
        dirty = false;
      }
      if (autoFrom) target = Math.max(target, Math.min((now - autoFrom) / 1600, 1));
      rinse += (target - rinse) * 0.12;
      if (target >= 1 && rinse > 0.995) rinse = 1;
      if (rinse >= 1 && !doneAt) doneAt = now;
      const sweep = doneAt ? Math.min((now - doneAt) / 1200, 1) : 0;
      gl.uniform1f(u.time, (now - t0) / 1000);
      gl.uniform1f(u.rinse, rinse);
      gl.uniform1f(u.sweep, sweep);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (sweep >= 1) cancelAnimationFrame(raf); // clean and polished: stop drawing
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(auto);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onFail]);

  return (
    <>
      <canvas ref={ref} className="hero-fx hero-foam-gl" aria-hidden="true" />
    </>
  );
}
