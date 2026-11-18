"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/data/base";
import { captions } from "@/data/photos";

// Look 2: scrolling runs through Owen's own jobs. Each car is pushed in slowly, then a water
// squeegee pulls down the screen and leaves the next car behind it: a bright blade line, the
// picture bent by the water around it, and droplets in its wake. The car's name lands in big
// type as each one arrives. Drawn only when the scroll moves. Calls onFail without WebGL.

export const scrollSeq = [
  "porsche-taycan-black",
  "defender-snow-foam",
  "porsche-boxster-red",
  "alfa-romeo-4c",
  "range-rover-black",
  "bmw-m4-white",
  "porsche-taycan-blue",
  "bmw-m2",
];

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main() { vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec2 uRes;
uniform vec2 uImgRes;
uniform float uT;
uniform float uZoomA;
uniform float uZoomB;
uniform float uDpr;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

vec2 cover(vec2 uv, float zoom) {
  float ar = uRes.x / uRes.y;
  float ir = uImgRes.x / uImgRes.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  uv = 0.5 + (uv - 0.5) / zoom;
  return (1.0 - s) * 0.5 + uv * s;
}

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  // The blade: a slightly tilted line travelling from the top to the bottom
  float s = uv.y + (uv.x - 0.5) * 0.18;
  float edge = mix(-0.12, 1.12, uT) + sin(uv.x * 17.0 + uT * 9.0) * 0.006;
  float d = s - edge; // < 0: already wiped (next car), > 0: still the old one

  // Water around the blade bends the picture
  float water = exp(-d * d * 220.0);
  vec2 bend = vec2(0.0, water * 0.035 * sign(d));
  vec3 a = texture2D(uA, cover(uv + bend, uZoomA)).rgb;
  vec3 b = texture2D(uB, cover(uv + bend, uZoomB)).rgb;
  float k = smoothstep(0.004, -0.004, d);
  vec3 col = mix(a, b, k);

  // Wet sheen and a bright line where the rubber meets the glass
  col += water * 0.14;
  col += exp(-d * d * 60000.0) * 0.9 * step(0.001, uT) * step(uT, 0.999);

  // Droplets left behind the blade, fading as it moves on
  vec2 px = uv * uRes / (6.0 * uDpr);
  vec2 cell = floor(px);
  vec2 h = hash2(cell);
  vec2 r = fract(px) - 0.5 - (h - 0.5) * 0.4;
  float behind = smoothstep(-0.3, -0.01, d) * (1.0 - k * 0.0) * step(d, 0.0);
  float drop = smoothstep(0.3, 0.18, length(r)) * step(0.86, h.x) * behind;
  float spec = smoothstep(0.1, 0.0, length(r - vec2(-0.08, 0.1))) * drop;
  col = col * (1.0 - drop * 0.15) + spec * 0.8;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function ScrollGL({ onFail }: { onFail: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [at, setAt] = useState(0);

  useEffect(() => {
    const cv = ref.current!;
    const hero = cv.closest<HTMLElement>(".hero")!;
    const gl = cv.getContext("webgl", { antialias: false });
    if (!gl) return onFail();
    const sh = (type: number, src: string) => {
      const x = gl.createShader(type)!;
      gl.shaderSource(x, src);
      gl.compileShader(x);
      if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(x) || "shader");
      return x;
    };
    const prog = gl.createProgram()!;
    try {
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch (e) {
      console.warn(e);
      return onFail();
    }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    gl.uniform1i(U("uA"), 0);
    gl.uniform1i(U("uB"), 1);

    const wide = window.innerWidth >= 700;
    const dpr = Math.min(window.devicePixelRatio || 1, wide ? 1.5 : 1.25);
    gl.uniform1f(U("uDpr"), dpr);

    // Every photo becomes a texture as it arrives
    const texs: (WebGLTexture | null)[] = scrollSeq.map(() => null);
    let imgRes: [number, number] | null = null;
    scrollSeq.forEach((id, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = wide ? asset(`/photos/hero-${id}-1536.webp`) : asset(`/photos/${id}-960.webp`);
      img.onload = () => {
        const t = gl.createTexture();
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        texs[i] = t;
        if (!imgRes) {
          imgRes = [img.naturalWidth, img.naturalHeight];
          gl.uniform2f(U("uImgRes"), imgRes[0], imgRes[1]);
        }
        ask();
      };
    });

    const size = () => {
      const stage = cv.parentElement!;
      cv.width = Math.round(stage.clientWidth * dpr);
      cv.height = Math.round(stage.clientHeight * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(U("uRes"), cv.width, cv.height);
      ask();
    };

    // The picture follows the scroll with some weight: a flick glides instead of jumping,
    // and it catches up faster the further behind it is, so a hard scroll still gets through.
    let raf = 0;
    let shown = -1;
    let p = -1;
    const draw = () => {
      raf = 0;
      const r = hero.getBoundingClientRect();
      const run = Math.max(r.height - window.innerHeight, 1);
      const goal = Math.min(Math.max(-r.top / run, 0), 1);
      if (p < 0) p = goal;
      const gap = goal - p;
      p += gap * Math.min(0.06 + Math.abs(gap) * 0.5, 0.35);
      if (Math.abs(gap) < 0.0004) p = goal;
      else ask();
      const f = p * (scrollSeq.length - 1);
      const i = Math.min(Math.floor(f), scrollSeq.length - 2);
      const local = f - i;
      // Hold on each car for the first part of its stretch, then the squeegee pass
      const t0 = Math.min(Math.max((local - 0.3) / 0.65, 0), 1);
      const t = t0 * t0 * (3 - 2 * t0);
      const A = texs[i];
      const B = texs[i + 1] ?? A;
      if (!A || !imgRes) return;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, A);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, B);
      gl.uniform1f(U("uT"), t);
      gl.uniform1f(U("uZoomA"), 1.03 + 0.07 * local);
      gl.uniform1f(U("uZoomB"), 1.1 - 0.07 * t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      cv.classList.add("is-on");
      const now = t > 0.55 ? i + 1 : i;
      if (now !== shown) {
        shown = now;
        setAt(now);
      }
    };
    function ask() {
      if (!raf) raf = requestAnimationFrame(draw);
    }

    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv.parentElement!);
    window.addEventListener("scroll", ask, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", ask);
    };
  }, [onFail]);

  const id = scrollSeq[at];
  return (
    <div className="hero-fx hero-seq" aria-hidden="true">
      <div className="seq-stage">
        <canvas ref={ref} className="seq-gl" />
        <p className="seq-name" key={id}>
          {captions[id]}
        </p>
        <p className="seq-count">
          <span className="num">{String(at + 1).padStart(2, "0")}</span> / {String(scrollSeq.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
