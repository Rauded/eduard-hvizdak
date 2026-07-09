import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeContext';
import handsSrc from '../../assets/hero/hands.jpg';

// WebGL hero: the hands photo rendered live as a true analytic halftone in the
// site navy. Dot SIZE encodes tone (proper print halftone), three navy tiers
// give modelling, the cursor brushes a soft light, and a top-band mask keeps
// the dither off the headline. Straight-alpha blended so it composites over the
// white page. Raw WebGL, no dependency; reduced-motion and off-screen both
// pause it. Alternative to AsciiDitherBackground; pick via ?hands= in hero.tsx.

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;

  &.ready {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;      // canvas size in device px
uniform float uTime;
uniform float uImgAspect; // img height / width
uniform float uDpr;

const vec3 DEEP = vec3(0.078, 0.141, 0.306); // deep navy shadow
const vec3 MID  = vec3(0.247, 0.357, 0.627); // #3f5ba0 mid body
const vec3 HI   = vec3(0.541, 0.647, 0.847); // #8aa5d8 highlight

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main() {
  // Pixel coords with origin at the TOP-left (WebGL origin is bottom-left).
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);

  // Place the whole hands image full-width, anchored to the top band.
  float bandH = uRes.x * uImgAspect;
  float scale = 1.0 + 0.02 * sin(uTime * 0.15);
  vec2 samp = vec2(px.x / uRes.x, px.y / bandH);
  samp = (samp - vec2(0.5, 0.0)) / scale + vec2(0.5, 0.0);
  if (samp.x < 0.0 || samp.x > 1.0 || samp.y < 0.0 || samp.y > 1.0) discard;

  vec3 texc = texture2D(uTex, vec2(samp.x, 1.0 - samp.y)).rgb;
  float L = luma(texc);
  float tone = clamp((L - 0.08) * 2.15, 0.0, 1.0);

  if (tone < 0.04) discard;

  // Analytic halftone: dot radius grows with tone within a fixed cell.
  float pitch = 5.0 * uDpr;
  vec2 cell = mod(px, pitch) - pitch * 0.5;
  float d = length(cell) / (pitch * 0.5);
  float radius = sqrt(tone);
  float aa = 1.6 / (pitch * 0.5);
  float dotv = smoothstep(radius + aa, radius - aa, d);

  vec3 col = tone > 0.72 ? HI : (tone > 0.4 ? MID : DEEP);

  // Fade the hands out toward the bottom of the band so nothing overlays text.
  float mask = smoothstep(1.0, 0.62, samp.y);

  float alpha = dotv * mask;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(col, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

const HandsShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true });
    if (!gl) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return undefined;
    const prog = gl.createProgram();
    if (!prog) return undefined;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);

    // Fullscreen triangle.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(prog, 'uTex');
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uImgAspect = gl.getUniformLocation(prog, 'uImgAspect');
    const uDpr = gl.getUniformLocation(prog, 'uDpr');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let imgReady = false;
    let imgAspect = 1;
    const img = new Image();
    img.onload = () => {
      imgAspect = img.height / img.width;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      imgReady = true;
      canvas.classList.add('ready');
      resize();
      draw(performance.now());
      startLoop();
    };
    img.src = handsSrc;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    let running = false;
    let inView = true;
    let lastFrame = 0;
    const FRAME_MS = 33; // ~30fps
    const start = performance.now();

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      if (!imgReady) return;
      const t = (now - start) / 1000;
      gl.useProgram(prog);
      gl.uniform1i(uTex, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 0 : t);
      gl.uniform1f(uImgAspect, imgAspect);
      gl.uniform1f(uDpr, dpr);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;
      draw(now);
    };

    const startLoop = () => {
      if (running || reduced || !imgReady || !inView || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startLoop();
      else stopLoop();
    });
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener('visibilitychange', onVis);

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        draw(performance.now());
      }, 150);
    });
    ro.observe(parent);

    return () => {
      stopLoop();
      img.onload = null;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      if (resizeTimer) clearTimeout(resizeTimer);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
    };
  }, [theme]);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};

export default HandsShader;
