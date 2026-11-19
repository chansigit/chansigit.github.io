// Animated 3D model of the rotating-mirror scanner: a four-facet mirror spins in front of a
// fixed laser / receiver / line-scan camera module. Schematic, not to scale.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const D2R = Math.PI / 180;
const APOTHEM = 20; // distance from the axis to each mirror facet
const Z0 = 14.142; // beam offset so it lands on the facet centre at phi = 0
const YC = 30; // beam / polygon centre height
const NCH = 16;
const PITCH = 2; // receiver channels
const R_WIN = 100;
const R_SCR = 190;
const EFF = 30; // effective |phi| in degrees
const OMEGA = 300 * D2R; // mirror rotation in rad/s, shown at 0.1x real time

const css = (el, name) => getComputedStyle(el).getPropertyValue(name).trim();

function facetMaterial(letter) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, "#e9eef2");
  grad.addColorStop(1, "#a9b6c1");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  g.strokeStyle = "#6d7b87";
  g.lineWidth = 4;
  g.strokeRect(2, 2, 124, 124);
  g.fillStyle = "#2b3946";
  g.font = "700 72px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(letter, 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({ map: tex, metalness: 0.25, roughness: 0.35 });
}

function box(w, h, d, color, opts) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1, ...(opts || {}) });
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
}

function lineBetween(a, b, color, opacity = 1) {
  const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
  return new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
}

function arcLine(r, y, a0, a1, color, opacity) {
  const pts = [];
  const n = 96;
  for (let i = 0; i <= n; i++) {
    const a = (a0 + ((a1 - a0) * i) / n) * D2R;
    pts.push(new THREE.Vector3(r * Math.sin(a), y, r * Math.cos(a)));
  }
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
}

export function mountLidarDemo(host) {
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    build(host);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        start();
      }
    }, { threshold: 0.3 });
    io.observe(host);
  } else {
    start();
  }
}

function build(host) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } catch (e) {
    host.textContent = "This animation needs WebGL, which is not available here.";
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  host.appendChild(renderer.domElement);
  const labelsEl = document.createElement("div");
  labelsEl.className = "lidar-tags";
  host.appendChild(labelsEl);
  const hint = document.createElement("div");
  hint.className = "lidar-hint";
  hint.textContent = "Drag to rotate, click to pause";
  host.appendChild(hint);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 1, 3000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enableZoom = false; // keep the wheel for scrolling the page
  controls.enablePan = false;

  scene.add(new THREE.AmbientLight(0xffffff, 0.75 * Math.PI));
  const sun = new THREE.DirectionalLight(0xffffff, 0.7 * Math.PI);
  sun.position.set(120, 260, 160);
  scene.add(sun);

  /* ---------- static structure ---------- */
  const base = box(250, 4, 90, 0xc3ccd4);
  base.position.set(-35, -2, 14);
  scene.add(base);

  const motor = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 5, 32), new THREE.MeshStandardMaterial({ color: 0x3d4852, roughness: 0.5, metalness: 0.5 }));
  motor.position.set(0, 2.5, 0);
  scene.add(motor);

  const spin = new THREE.Group();
  scene.add(spin);
  const plain = new THREE.MeshStandardMaterial({ color: 0x55636f, roughness: 0.6 });
  // BoxGeometry face order: +x, -x, +y, -y, +z, -z  ->  D, B, top, bottom, A, C
  const faceMats = [facetMaterial("D"), facetMaterial("B"), plain, plain, facetMaterial("A"), facetMaterial("C")];
  const poly = new THREE.Mesh(new THREE.BoxGeometry(40, 44, 40), faceMats);
  poly.position.y = 30;
  spin.add(poly);

  const disc = new THREE.Mesh(new THREE.CylinderGeometry(18, 18, 1.5, 48), new THREE.MeshStandardMaterial({ color: 0x27313a, roughness: 0.5, metalness: 0.4 }));
  disc.position.y = 6;
  spin.add(disc);
  for (let k = 0; k < 4; k++) {
    const g = (75 + 90 * k) * D2R;
    const mk = box(3, 3, 3, 0xff6a00, { emissive: 0x552200 });
    mk.position.set(17 * Math.sin(g), 7.5, 17 * Math.cos(g));
    mk.rotation.y = g;
    spin.add(mk);
  }
  const sensor = box(5, 5, 5, 0x4a5966);
  sensor.position.set(0, 7.5, 22);
  scene.add(sensor);

  const shell = new THREE.Group();
  scene.add(shell);
  const housing = new THREE.Mesh(new THREE.BoxGeometry(60, 44, 44), new THREE.MeshBasicMaterial({ color: 0x8aa0b3, transparent: true, opacity: 0.1, depthWrite: false }));
  housing.position.set(-126, YC, Z0);
  shell.add(housing);
  const hEdges = new THREE.LineSegments(new THREE.EdgesGeometry(housing.geometry), new THREE.LineBasicMaterial({ color: 0x8a97a3 }));
  hEdges.position.copy(housing.position);
  shell.add(hEdges);

  const lens = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 10, 40), new THREE.MeshStandardMaterial({ color: 0x7fb8e6, transparent: true, opacity: 0.55, roughness: 0.1, metalness: 0.2 }));
  lens.rotation.z = Math.PI / 2;
  lens.position.set(-93, YC, Z0);
  scene.add(lens);

  const laser = box(8, 10, 8, 0xe5484d, { emissive: 0x3a0a0c });
  laser.position.set(-148, YC, Z0);
  scene.add(laser);

  const splitter = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshStandardMaterial({ color: 0x9fd0ee, transparent: true, opacity: 0.6, roughness: 0.1 }));
  splitter.position.set(-118, YC, Z0);
  splitter.rotation.y = 45 * D2R;
  scene.add(splitter);

  for (let i = 0; i < NCH; i++) {
    const apd = box(1.6, 1.5, 2.4, 0x3a86ff, { emissive: 0x0b2a66 });
    apd.position.set(-118, YC + (i - 7.5) * PITCH, Z0 - 16);
    scene.add(apd);
  }
  const cam = box(1.6, 34, 2.4, 0x2fbf71, { emissive: 0x0b3a22 });
  cam.position.set(-118, YC, Z0 + 16);
  scene.add(cam);

  scene.add(lineBetween([-144, YC, Z0], [-88, YC, Z0], 0xff9d00, 0.9));
  scene.add(lineBetween([-118, YC, Z0], [-118, YC, Z0 - 15], 0x3a86ff, 0.9));
  scene.add(lineBetween([-118, YC, Z0], [-118, YC, Z0 + 15], 0x2fbf71, 0.9));

  const win = new THREE.Mesh(
    new THREE.CylinderGeometry(R_WIN, R_WIN, 60, 96, 1, true, -72 * D2R, 144 * D2R),
    new THREE.MeshBasicMaterial({ color: 0x7db7e8, transparent: true, opacity: 0.13, side: THREE.DoubleSide, depthWrite: false })
  );
  win.position.y = YC;
  shell.add(win);
  shell.add(arcLine(R_WIN, YC + 30, -72, 72, 0x7db7e8, 0.8));
  shell.add(arcLine(R_WIN, YC - 30, -72, 72, 0x7db7e8, 0.8));

  const screenGroup = new THREE.Group();
  scene.add(screenGroup);
  const SEG = 120;
  const screenBase = new THREE.Mesh(
    new THREE.CylinderGeometry(R_SCR, R_SCR, 34, SEG, 1, true, -60 * D2R, 120 * D2R),
    new THREE.MeshBasicMaterial({ color: 0x8a97a3, transparent: true, opacity: 0.09, side: THREE.DoubleSide, depthWrite: false })
  );
  screenBase.position.y = YC;
  screenGroup.add(screenBase);
  const fillGeo = new THREE.CylinderGeometry(R_SCR - 0.4, R_SCR - 0.4, 34, SEG, 1, true, -60 * D2R, 120 * D2R);
  const screenFill = new THREE.Mesh(fillGeo, new THREE.MeshBasicMaterial({ color: 0xff9d00, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false }));
  screenFill.position.y = YC;
  screenGroup.add(screenFill);
  screenGroup.add(arcLine(R_SCR, YC + 17, -60, 60, 0x8a97a3, 0.8));
  screenGroup.add(arcLine(R_SCR, YC - 17, -60, 60, 0x8a97a3, 0.8));
  for (const a of [-60, 60]) {
    const x = R_SCR * Math.sin(a * D2R);
    const z = R_SCR * Math.cos(a * D2R);
    screenGroup.add(lineBetween([x, YC - 17, z], [x, YC + 17, z], 0x8a97a3, 0.8));
  }

  const fan = new THREE.Group();
  scene.add(fan);
  const sector = (r, from, to, color, opacity) => {
    const geo = new THREE.CircleGeometry(r, 64, (from - 90) * D2R, (to - from) * D2R);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.3;
    return m;
  };
  fan.add(sector(R_SCR, -60, 60, 0xff9d00, 0.08));
  fan.add(sector(120, 60, 90, 0x8a97a3, 0.1));
  fan.add(sector(120, -90, -60, 0x8a97a3, 0.1));
  fan.add(lineBetween([0, 0.4, 0], [0, 0.4, R_SCR], 0x8a97a3, 0.9));
  for (const a of [-60, -30, 30, 60]) {
    const r = a * D2R;
    fan.add(lineBetween([0, 0.4, 0], [R_SCR * Math.sin(r), 0.4, R_SCR * Math.cos(r)], 0x8a97a3, 0.45));
  }
  fan.add(arcLine(150, 0.4, -60, 60, 0x8a97a3, 0.7));

  let grid = null;
  const themed = [base.material, hEdges.material];
  function applyTheme() {
    scene.background = new THREE.Color(css(host, "--surface"));
    base.material.color.set(css(host, "--line"));
    hEdges.material.color.set(css(host, "--muted"));
    if (grid) scene.remove(grid);
    grid = new THREE.GridHelper(700, 35, new THREE.Color(css(host, "--muted")), new THREE.Color(css(host, "--line")));
    grid.position.set(0, -4.5, 60);
    grid.material.transparent = true;
    grid.material.opacity = 0.6;
    scene.add(grid);
  }
  void themed;
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", applyTheme);

  /* ---------- dynamic beam ---------- */
  const beamGroup = new THREE.Group();
  scene.add(beamGroup);
  const rayPos = new Float32Array(NCH * 2 * 2 * 3);
  const rayGeo = new THREE.BufferGeometry();
  rayGeo.setAttribute("position", new THREE.BufferAttribute(rayPos, 3));
  const rays = new THREE.LineSegments(rayGeo, new THREE.LineBasicMaterial({ color: 0xff9d00 }));
  rays.frustumCulled = false;
  beamGroup.add(rays);

  function makeSheet() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(12), 3));
    geo.setIndex([0, 1, 2, 0, 2, 3]);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xff9d00, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }));
    m.frustumCulled = false;
    beamGroup.add(m);
    return geo;
  }
  const sheetIn = makeSheet();
  const sheetOut = makeSheet();
  function setQuad(geo, ax, az, bx, bz, y0, y1) {
    const p = geo.attributes.position.array;
    p[0] = ax; p[1] = y0; p[2] = az;
    p[3] = ax; p[4] = y1; p[5] = az;
    p[6] = bx; p[7] = y1; p[8] = bz;
    p[9] = bx; p[10] = y0; p[11] = bz;
    geo.attributes.position.needsUpdate = true;
  }

  /* ---------- labels ---------- */
  // [text, anchor point, label offset in px from the anchor]
  const tagDefs = [
    ["Rotating mirror", [0, 54, 0], [50, -50]],
    ["Laser", [-148, YC + 8, Z0], [-60, 0]],
    ["Beam splitter", [-118, YC + 5, Z0], [20, -105]],
    ["Receiver", [-118, YC + 17, Z0 - 16], [-60, -55]],
    ["Line-scan camera", [-118, YC - 12, Z0 + 16], [-100, 105]],
    ["Shared lens", [-93, YC - 12, Z0], [20, 62]],
    ["Motor and encoder wheel", [10, 6.5, 12], [30, 105]],
    ["Frame trigger sensor", [0, 8, 22], [60, 55]],
    ["Window", [0, YC + 30, R_WIN], [110, -5]],
    ["Field of view", [0, YC + 17, R_SCR], [50, 30]],
  ];
  const svgNS = "http://www.w3.org/2000/svg";
  const leaders = document.createElementNS(svgNS, "svg");
  leaders.setAttribute("class", "lidar-leaders");
  labelsEl.appendChild(leaders);
  const tags = tagDefs.map(([text, p, off]) => {
    const el = document.createElement("div");
    el.className = "lidar-tag" + (off[0] < 0 ? " left" : "");
    el.textContent = text;
    const dot = document.createElement("div");
    dot.className = "lidar-dot";
    const line = document.createElementNS(svgNS, "line");
    leaders.appendChild(line);
    labelsEl.appendChild(dot);
    labelsEl.appendChild(el);
    return { el, dot, line, off, pos: new THREE.Vector3(...p) };
  });

  /* ---------- state ---------- */
  let psi = -45 * D2R;
  let prevPhi = -45;
  let playing = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const speed = 0.1;
  let flash = 0;
  let visible = true;

  function update(dt) {
    if (playing) psi += OMEGA * dt * speed;
    const u = psi / D2R + 45;
    const kf = Math.floor(u / 90);
    const phi = u - 90 * kf - 45;
    const alpha = 2 * phi;
    const effective = Math.abs(phi) <= EFF;

    spin.rotation.y = psi - 45 * D2R;
    if (prevPhi < -EFF && phi >= -EFF) flash = 0.35;
    prevPhi = phi;

    const beta = (-45 + phi) * D2R;
    const xh = (APOTHEM - Math.cos(beta) * Z0) / Math.sin(beta);
    const ar = alpha * D2R;
    const dx = Math.sin(ar);
    const dz = Math.cos(ar);
    const b2 = xh * dx + Z0 * dz;
    const c2 = xh * xh + Z0 * Z0 - R_SCR * R_SCR;
    const tEnd = -b2 + Math.sqrt(Math.max(b2 * b2 - c2, 0));
    const ex = xh + dx * tEnd;
    const ez = Z0 + dz * tEnd;

    beamGroup.visible = effective;
    if (effective) {
      let n = 0;
      for (let i = 0; i < NCH; i++) {
        const y = YC + (i - 7.5) * PITCH;
        rayPos[n++] = -88; rayPos[n++] = y; rayPos[n++] = Z0;
        rayPos[n++] = xh; rayPos[n++] = y; rayPos[n++] = Z0;
        rayPos[n++] = xh; rayPos[n++] = y; rayPos[n++] = Z0;
        rayPos[n++] = ex; rayPos[n++] = y; rayPos[n++] = ez;
      }
      rayGeo.attributes.position.needsUpdate = true;
      setQuad(sheetIn, -88, Z0, xh, Z0, YC - 15.5, YC + 15.5);
      setQuad(sheetOut, xh, Z0, ex, ez, YC - 15.5, YC + 15.5);
    }

    const frac = Math.max(0, Math.min(1, (alpha + 60) / 120));
    fillGeo.setDrawRange(0, Math.floor(frac * SEG) * 6);

    if (flash > 0) flash = Math.max(0, flash - dt);
    sensor.material.emissive.setHex(flash > 0 ? 0xff8a00 : 0x000000);
    sensor.material.emissiveIntensity = flash > 0 ? 1.4 : 0;
  }

  function placeLabels() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    const v = new THREE.Vector3();
    labelsEl.style.display = w < 560 ? "none" : ""; // labels do not fit on a phone-width stage
    for (const tg of tags) {
      v.copy(tg.pos).project(camera);
      const hide = v.z > 1 || v.z < -1;
      tg.el.style.display = tg.dot.style.display = hide ? "none" : "";
      tg.line.style.display = hide ? "none" : "";
      if (hide) continue;
      const x = (v.x * 0.5 + 0.5) * w;
      const y = (-v.y * 0.5 + 0.5) * h;
      const k = Math.min(1, w / 900);
      const lx = x + tg.off[0] * k;
      const ly = y + tg.off[1] * k;
      tg.dot.style.left = `${x.toFixed(1)}px`;
      tg.dot.style.top = `${y.toFixed(1)}px`;
      tg.el.style.left = `${lx.toFixed(1)}px`;
      tg.el.style.top = `${ly.toFixed(1)}px`;
      tg.line.setAttribute("x1", x.toFixed(1));
      tg.line.setAttribute("y1", y.toFixed(1));
      tg.line.setAttribute("x2", lx.toFixed(1));
      tg.line.setAttribute("y2", ly.toFixed(1));
    }
  }

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // on narrow stages widen the vertical field of view so the whole scene still fits across
    camera.fov = 2 * Math.atan(Math.tan(21 * D2R) * Math.max(1, 1.7 / camera.aspect)) / D2R;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);

  // click (without dragging) pauses and resumes
  let downAt = null;
  renderer.domElement.addEventListener("pointerdown", (e) => { downAt = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (downAt && Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) < 5) playing = !playing;
    downAt = null;
  });

  new IntersectionObserver((entries) => { visible = entries.some((e) => e.isIntersecting); }, { threshold: 0.05 }).observe(host);

  applyTheme();
  camera.position.set(-40, 235, 320);
  controls.target.set(-25, 10, 75);
  controls.update();
  resize();

  let last = performance.now();
  function loop(t) {
    const dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    if (visible) {
      update(dt);
      controls.update();
      renderer.render(scene, camera);
      placeLabels();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
