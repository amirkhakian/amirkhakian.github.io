/* Amir Khakian — portfolio, v4.
   All project videos are real files from his Drive portfolio folder.
   Each project is an editorial "chapter" with its own layout; clicking a
   chapter's frame swaps it in place for the player. Only one player is
   open at a time. To add a project: add one entry to PROJECTS with its
   Drive file ID, a chapter still in assets/images/chapters/ and a layout.
   The full archive lives in the Drive folder linked from the Work section. */

const EMAIL = "khakianamir5@gmail.com";

const DRIVE_PREVIEW = (id) => `https://drive.google.com/file/d/${id}/preview`;

/* Layouts: portrait (vertical still), wide (full-width still),
   split (still left), split-rev (still right). The last chapter is the
   feature: wide with a larger title. Order is Amir's own (Nov 2026). */
const PROJECTS = [
  {
    client: "HeelHero",
    title: "Live Action Ad",
    cat: "Commercial",
    dur: "1:17",
    driveId: "1uqSAjHDEf4hkjCfC3vDjUvud1bgC2Lgn",
    chapter: "assets/images/chapters/heelhero-live.jpg",
    layout: "wide",
    desc: "Live-action TV commercial for HeelHero, a Danish kids\u2019 insole brand. Young footballers on the pitch, close on the boots and the faces \u2014 cut fast, bright and confident, with the colour, music, sound effects, VFX and full finish all my work; only the 3D models came from elsewhere.",
  },
  {
    client: "HeelHero",
    title: "3D Insole Ad",
    cat: "Commercial",
    dur: "0:26",
    driveId: "1ir04WLUWu1Y0NMVM9i0osgz53EvnzXyE",
    chapter: "assets/images/chapters/heelhero-3d.jpg",
    layout: "split",
    desc: "Bringing 3D concepts to life through post-production. For the HeelHero promo I took a basic 3D animation and turned it into an energetic, polished commercial \u2014 full compositing and VFX, dynamic camera moves and transitions, complete sound design and audio sync, all in After Effects and Premiere Pro.",
  },
  {
    client: "Sara Charif",
    title: "Fashion Film",
    cat: "Short-Form",
    dur: "0:18",
    driveId: "1_xjkWyesPN_yJYJ9o7IC1-ulUP7_h0o6",
    chapter: "assets/images/chapters/sara-charif.jpg",
    chapterPos: "50% 18%",
    layout: "portrait",
    desc: "A fashion film edit for Sara Charif, cut for a polished, editorial feel. Pacing, transitions, colour and finishing \u2014 every detail shaped around the styling, the movement and the brand\u2019s visual identity, so the final piece feels cohesive and premium.",
  },
  {
    client: "Fitness",
    title: "Talking Head Edit",
    cat: "Short-Form",
    dur: "0:22",
    driveId: "1bypmFgrEKnG3B0L-Er1CzwSiJM2kQM7S",
    chapter: "assets/images/chapters/fitness.jpg",
    layout: "split-rev",
    desc: "Raw footage, rebuilt for retention. Custom 2D motion graphics visualise the message, high-contrast kinetic captions guide the eye, and intentional zooms, quick cuts and layered sound design keep a 22-second argument moving \u2014 no dead space.",
  },
  {
    client: "Documentary Intro",
    title: "Opening Sequence",
    cat: "Documentary",
    dur: "0:11",
    driveId: "1zb2R83ZbT91bjzXEQvFBUdRwdCGo6d9_",
    chapter: "assets/images/chapters/doc-intro.jpg",
    layout: "split",
    desc: "A documentary-style opening that turns information, numbers and ideas into clean, cinematic visuals. Motion design, 3D elements, transitions and small visual details carry the story forward \u2014 a city street, a shattering question mark, a glowing $1B+ in eleven seconds.",
  },
  {
    client: "WWII Documentary",
    title: "Vertical Sequence",
    cat: "Documentary",
    dur: "0:16",
    driveId: "1q00CgNHyzkyeIXoR4RBsKqdobUklxHU1",
    chapter: "assets/images/chapters/picopry.jpg",
    layout: "portrait",
    desc: "A vertical WWII documentary sequence. Worn textures and a weathered flag \u2014 the whole tone set in sixteen seconds.",
  },
  {
    client: "Japan",
    title: "Travel Vlog",
    cat: "Travel",
    dur: "0:35",
    localVideo: "assets/videos/japan-35s.mp4",
    poster: "assets/images/chapters/japan.jpg",
    chapter: "assets/images/chapters/japan.jpg",
    layout: "wide",
    desc: "Nine minutes through Japan \u2014 neon streets, night crossings, and the small moments in between. A long-form travel vlog cut for rhythm, holding the journey together from the first frame to the last.",
  },
  {
    client: "Synthwave",
    title: "Music Visualizer",
    cat: "Motion",
    dur: "4:08",
    driveId: "1ysFGZp7VzIRAHhXtMzl6Ld1OBkNUe-WC",
    chapter: "assets/images/chapters/synthwave.jpg",
    layout: "split",
    desc: "Four minutes of retro screens, neon skylines and teal light, cut frame by frame to the track. A synthwave visualizer where every cut, glow and camera move lands on the beat.",
  },
  {
    client: "Larry Fink",
    title: "\u201CThe $15 Trillion Company Nobody Can Name\u201D",
    cat: "Documentary",
    dur: "0:56",
    localVideo: "assets/videos/larry-fink-clip.mp4",
    poster: "assets/images/larry-fink-poster.jpg",
    fullEpisodeUrl: "https://drive.google.com/file/d/1UIbnd8KTOVn5A7LLwsxlOTltBmcKjsQ-/view?usp=drive_link",
    layout: "wide",
    feature: true,
    desc: "Motion design and sound design for episode 2 of a YouTube animated documentary about Larry Fink and BlackRock. This 56-second excerpt runs from his First Boston years to the fall.",
  },
];

/* ---------- Chapters + in-place players ---------- */

const chaptersEl = document.getElementById("chapters");
let openEntry = null;

PROJECTS.forEach((p, i) => {
  const chapter = document.createElement("article");
  chapter.className = `chapter layout-${p.layout}` + (p.feature ? " layout-feature" : "");
  /* Chapters are always visible: no opacity reveal. The ribbon's tip
     gives each one a tiny nudge animation when it reaches it. */

  const grid = document.createElement("div");
  grid.className = "chapter-grid";

  const media = document.createElement("div");
  media.className = "chapter-media";
  const still = document.createElement("button");
  still.className = "chapter-still";
  still.type = "button";
  still.setAttribute("aria-expanded", "false");
  still.setAttribute("aria-label", `Play ${p.client} — ${p.title}`);
  const img = document.createElement("img");
  img.src = p.localVideo ? p.poster : p.chapter;
  img.alt = "";
  img.loading = "lazy";
  if (p.chapterPos) img.style.objectPosition = p.chapterPos;
  const badge = document.createElement("span");
  badge.className = "play-badge";
  badge.setAttribute("aria-hidden", "true");
  badge.innerHTML = "<span>▶</span>";
  still.append(img, badge);

  const player = document.createElement("div");
  player.className = "chapter-player";
  player.hidden = true;
  let frame = null;
  let video = null;
  if (p.localVideo) {
    video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.poster = p.poster;
    player.appendChild(video);
  } else {
    frame = document.createElement("iframe");
    frame.title = `${p.client} — ${p.title}`;
    frame.setAttribute("allow", "autoplay; fullscreen");
    frame.allowFullscreen = true;
    player.appendChild(frame);
  }
  media.append(still, player);

  const text = document.createElement("div");
  text.className = "chapter-text";
  const idx = document.createElement("p");
  idx.className = "mono chapter-idx";
  idx.textContent = `Chapter ${String(i + 1).padStart(2, "0")}`;
  const h3 = document.createElement("h3");
  h3.textContent = p.client;
  const title = document.createElement("p");
  title.className = "chapter-title";
  title.textContent = p.title;
  const meta = document.createElement("p");
  meta.className = "mono chapter-meta";
  meta.textContent = p.dur ? `${p.cat} · ${p.dur}` : p.cat;
  const desc = document.createElement("p");
  desc.className = "chapter-desc";
  desc.textContent = p.desc;
  const links = document.createElement("div");
  links.className = "chapter-links";
  if (p.driveId) {
    const drive = document.createElement("span");
    drive.className = "chapter-drive";
    drive.innerHTML = `<a href="https://drive.google.com/file/d/${p.driveId}/view" target="_blank" rel="noopener noreferrer">Open in Drive ↗</a>`;
    links.appendChild(drive);
  }
  if (p.fullEpisodeUrl) {
    const full = document.createElement("span");
    full.className = "chapter-drive";
    full.innerHTML = `<a href="${p.fullEpisodeUrl}" target="_blank" rel="noopener noreferrer">Open in Drive ↗</a>`;
    links.appendChild(full);
  }
  const closeBtn = document.createElement("button");
  closeBtn.className = "player-close";
  closeBtn.type = "button";
  closeBtn.textContent = "Close ×";
  closeBtn.hidden = true;
  links.appendChild(closeBtn);
  text.append(idx, h3, title, meta, desc, links);

  grid.append(media, text);
  chapter.appendChild(grid);
  chaptersEl.appendChild(chapter);

  const entry = { still, player, frame, video, closeBtn, project: p };
  still.addEventListener("click", () => openPlayer(entry));
  closeBtn.addEventListener("click", () => closePlayer(entry));
});

function openPlayer(entry) {
  if (openEntry && openEntry !== entry) closePlayer(openEntry);
  openEntry = entry;
  const p = entry.project;
  entry.still.hidden = true;
  entry.player.hidden = false;
  entry.closeBtn.hidden = false;
  entry.still.setAttribute("aria-expanded", "true");
  if (p.localVideo) {
    entry.video.src = p.localVideo;
    /* The frame click is a user gesture, so autoplay with sound is allowed. */
    entry.video.play().catch(() => {});
  } else {
    entry.frame.src = DRIVE_PREVIEW(p.driveId);
  }
}

function closePlayer(entry) {
  const p = entry.project;
  if (p.localVideo) {
    entry.video.pause();
    entry.video.removeAttribute("src");
    entry.video.load();
  } else {
    entry.frame.removeAttribute("src");
  }
  entry.player.hidden = true;
  entry.still.hidden = false;
  entry.closeBtn.hidden = true;
  entry.still.setAttribute("aria-expanded", "false");
  if (openEntry === entry) openEntry = null;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && openEntry) closePlayer(openEntry);
});

/* ---------- Hero video: still frame when motion is reduced ---------- */

const heroVideo = document.getElementById("heroVideo");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

/* ---------- Top bar: paper once the film scrolls away ---------- */

const topbar = document.getElementById("topbar");
const hero = document.querySelector(".hero");
function onScroll() {
  topbar.classList.toggle("scrolled", window.scrollY > hero.offsetHeight - 80);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Copy email ---------- */

const copyBtn = document.getElementById("copyEmailBtn");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyBtn.textContent = "Copied";
  } catch {
    copyBtn.textContent = EMAIL;
  }
  setTimeout(() => (copyBtn.textContent = "Copy email"), 2000);
});

/* ---------- Winding scroll line + chapter nudge ----------
   A sage ribbon winds down the Work section like a river, swinging left
   and right as you scroll (Amir's sketch, 2026-11-16). It is an SVG path
   built through the chapters. Chapters are always visible — there is no
   opacity reveal; when the ribbon's tip reaches a chapter, it gets one
   tiny nudge animation. Other reveal elements (section heads, About,
   Services, Contact) still use the IntersectionObserver below. With
   reduced motion there is no line and no nudge. */

const chapterEls = [...chaptersEl.querySelectorAll(".chapter")];
const lineReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/* The ribbon is a desktop flourish: on narrow screens the chapters stack
   and the ribbon's path would run through the text column, so there is
   no line at all below 640px. Checked live (not once) because the
   viewport can cross the threshold on rotate or resize. */
function lineDisabled() {
  return lineReduced || window.matchMedia("(max-width: 640px)").matches;
}
const SVGNS = "http://www.w3.org/2000/svg";

let lineSvg = null;
let trackPath = null;
let guidePath = null;
let ribbonPath = null;
let pathLen = 0;
let ribbonStartY = 0; /* first video's centre, container coords */
let ribbonEndY = 1; /* last video's centre, container coords */

/* The ribbon: a thick sage stroke that draws itself down the Work
   section as you scroll. A plain SVG stroke can't taper, so the drawn
   part is rebuilt every frame as a filled shape: points sampled along
   the guide path, offset either side by a half-width that swells in at
   the start and tapers slightly (to 85% over the last 120px) at the
   moving tip, which ends in a shallow elliptical cap. The ribbon sits UNDER the chapters: the video
   frames cover it, so it only shows in the gaps between chapters, and
   its path is routed through the videos, never through the text. The
   guide path is sampled ONCE per build (see buildRibbonSamples):
   getPointAtLength is far too slow to call hundreds of times per frame,
   and doing so is what made the ribbon lag. */
const RIBBON_HALF = 18; /* 36px at full width */
const RIBBON_STEP = 16; /* sample spacing along the path, px */

function smoothstep(x) {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
}

/* Half-width of the ribbon at distance d along a drawn length drawLen.
   The start swells in over the first 5% (hidden inside the first video).
   The tip tapers only over the last 120px of the drawn length — a fixed
   length, not a percentage, so the taper stays a short clean transition
   instead of a long tail — down to 85% of full width, and ends in a
   shallow elliptical cap: soft, never sharp, never a thin tail, and
   never a round knob. */
const TIP_TAPER_LEN = 120; /* px */
const TIP_END = 0.85; /* end width as a fraction of full width */
const CAP_BULGE = 6; /* forward bulge of the elliptical cap, px */

function ribbonHalfWidth(d, drawLen) {
  const t = d / drawLen;
  if (t < 0.05) return RIBBON_HALF * (0.7 + 0.3 * smoothstep(t / 0.05));
  const toTip = drawLen - d;
  if (toTip < TIP_TAPER_LEN) {
    return RIBBON_HALF * (TIP_END + (1 - TIP_END) * smoothstep(toTip / TIP_TAPER_LEN));
  }
  return RIBBON_HALF;
}

/* Samples along the guide path, computed once per build with tangents.
   Per frame, drawRibbon only slices these and joins strings — no
   getPointAtLength in the hot path. tipPoint is the interpolated tip
   position after the latest draw (null when nothing is drawn). */
let ribbonSamples = [];
let tipPoint = null;

function buildRibbonSamples() {
  ribbonSamples = [];
  const n = Math.max(2, Math.floor(pathLen / RIBBON_STEP) + 1);
  for (let i = 0; i < n; i++) {
    const d = Math.min(pathLen, (i * pathLen) / (n - 1));
    const p = guidePath.getPointAtLength(d);
    ribbonSamples.push({ x: p.x, y: p.y, d, tx: 0, ty: 0 });
  }
  for (let i = 0; i < ribbonSamples.length; i++) {
    const a = ribbonSamples[Math.max(0, i - 1)];
    const b = ribbonSamples[Math.min(ribbonSamples.length - 1, i + 1)];
    let tx = b.x - a.x;
    let ty = b.y - a.y;
    const tl = Math.hypot(tx, ty) || 1;
    ribbonSamples[i].tx = tx / tl;
    ribbonSamples[i].ty = ty / tl;
  }
}

function drawRibbon(drawLen) {
  if (drawLen <= 0 || !pathLen || !ribbonSamples.length) {
    ribbonPath.setAttribute("d", "");
    tipPoint = null;
    return;
  }
  /* Binary-search the last sample at or before the drawn length. */
  let lo = 0;
  let hi = ribbonSamples.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (ribbonSamples[mid].d <= drawLen) lo = mid;
    else hi = mid - 1;
  }
  /* Interpolate the exact tip point so the cap never jumps in steps. */
  const s0 = ribbonSamples[lo];
  const s1 = ribbonSamples[Math.min(lo + 1, ribbonSamples.length - 1)];
  const span = s1.d - s0.d || 1;
  const f = Math.min(1, Math.max(0, (drawLen - s0.d) / span));
  let ttx = s0.tx + (s1.tx - s0.tx) * f;
  let tty = s0.ty + (s1.ty - s0.ty) * f;
  const ttl = Math.hypot(ttx, tty) || 1;
  ttx /= ttl;
  tty /= ttl;
  const tip = {
    x: s0.x + (s1.x - s0.x) * f,
    y: s0.y + (s1.y - s0.y) * f,
    tx: ttx,
    ty: tty,
  };
  tipPoint = tip;
  const hwEnd = RIBBON_HALF * TIP_END;
  const left = [];
  const right = [];
  for (let i = 0; i <= lo; i++) {
    const s = ribbonSamples[i];
    const hw = ribbonHalfWidth(s.d, drawLen);
    left.push(`${(s.x - s.ty * hw).toFixed(1)} ${(s.y + s.tx * hw).toFixed(1)}`);
    right.push(`${(s.x + s.ty * hw).toFixed(1)} ${(s.y - s.tx * hw).toFixed(1)}`);
  }
  /* The tip itself, at the interpolated point, with the end half-width. */
  left.push(`${(tip.x - tip.ty * hwEnd).toFixed(1)} ${(tip.y + tip.tx * hwEnd).toFixed(1)}`);
  right.push(`${(tip.x + tip.ty * hwEnd).toFixed(1)} ${(tip.y - tip.tx * hwEnd).toFixed(1)}`);
  /* Shallow elliptical cap: a gentle dome (6px forward bulge) that joins
     the sides smoothly, never a round knob and never tilted — it is
     symmetric about the tip tangent. */
  const cap = [];
  for (let k = 1; k < 8; k++) {
    const a = (k * Math.PI) / 8;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    cap.push(
      `${(tip.x + (-tip.ty * ca * hwEnd + tip.tx * sa * CAP_BULGE)).toFixed(1)} ${(tip.y + (tip.tx * ca * hwEnd + tip.ty * sa * CAP_BULGE)).toFixed(1)}`
    );
  }
  ribbonPath.setAttribute(
    "d",
    `M ${left.join(" L ")} L ${cap.join(" L ")} L ${right.reverse().join(" L ")} Z`
  );
}

/* Smooth curve through a list of points (Catmull-Rom to Bezier). */
function smoothPath(pts) {
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function buildLine() {
  const w = chaptersEl.clientWidth;
  const h = chaptersEl.offsetHeight;
  lineSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  /* The ribbon starts hidden inside the first video and ends hidden
     inside the last one: nothing sticks out above the first frame or
     below the last one. It passes through the middle of each video.
     Wide chapters (media spanning the full width, text below) get an
     extra pin below the chapter on the right, so the curve stays right
     of the text until it is past it; the swing to the next video
     happens in the gap between chapters, never through a text block. */
  const containerRect = chaptersEl.getBoundingClientRect();
  const raw = [];
  chapterEls.forEach((ch, i) => {
    const media = ch.querySelector(".chapter-media");
    const r = media.getBoundingClientRect();
    const mx = r.left - containerRect.left;
    const my = r.top - containerRect.top;
    const wide = r.width > w * 0.8;
    const sideX = mx + (wide ? 0.65 : 0.5) * r.width;
    raw.push({ x: sideX, y: my + r.height / 2, ch: i });
    if (wide && i < chapterEls.length - 1) {
      raw.push({ x: w * 0.78, y: Math.min(h, ch.offsetTop + ch.offsetHeight + 12), ch: i });
    }
  });
  /* Pin each swing between chapters to the middle of the gap, so the
     curve crosses into the next chapter already on its video's side
     and never drifts across a text block. */
  const pts = [raw[0]];
  for (let i = 1; i < raw.length; i++) {
    const a = raw[i - 1];
    const b = raw[i];
    if (b.ch !== a.ch && a.ch >= 0 && b.ch < chapterEls.length) {
      const gapTop = chapterEls[a.ch].offsetTop + chapterEls[a.ch].offsetHeight;
      const gapBottom = chapterEls[b.ch].offsetTop;
      pts.push({ x: (a.x + b.x) / 2, y: (gapTop + gapBottom) / 2 });
    }
    pts.push(b);
  }
  const d = smoothPath(pts);
  trackPath.setAttribute("d", d);
  guidePath.setAttribute("d", d);
  pathLen = guidePath.getTotalLength();
  /* The draw maps the scroll trigger between the path's own endpoints
     (first video's centre to last video's centre), NOT the section's
     top to bottom: the section extends past both videos, so a
     section-based span left the ribbon short of the last video until
     it had already scrolled past. */
  ribbonStartY = pts[0].y;
  ribbonEndY = pts[pts.length - 1].y;
  buildRibbonSamples();
  updateLine();
}

function createLineSvg() {
  lineSvg = document.createElementNS(SVGNS, "svg");
  lineSvg.setAttribute("class", "scroll-line-svg");
  lineSvg.setAttribute("aria-hidden", "true");
  trackPath = document.createElementNS(SVGNS, "path");
  trackPath.setAttribute("class", "scroll-line-track");
  guidePath = document.createElementNS(SVGNS, "path");
  guidePath.setAttribute("class", "scroll-line-guide");
  ribbonPath = document.createElementNS(SVGNS, "path");
  ribbonPath.setAttribute("class", "scroll-line-ribbon");
  lineSvg.append(trackPath, guidePath, ribbonPath);
  chaptersEl.prepend(lineSvg);
  buildLine();
}

function destroyLineSvg() {
  if (lineSvg) lineSvg.remove();
  lineSvg = trackPath = guidePath = ribbonPath = null;
  pathLen = 0;
}

if (!lineDisabled()) createLineSvg();

function updateLine() {
  if (lineDisabled()) return;
  if (!pathLen) return;
  const rect = chaptersEl.getBoundingClientRect();
  /* The tip travels with a point 72% down the viewport. The ribbon
     tracks the scroll position directly, 1:1, with no easing: an eased
     (lerped) draw trailed behind the scroll and read as lag. */
  const triggerY = window.innerHeight * 0.72;
  /* The ribbon completes when the trigger reaches the last video's
     centre, so the tip is inside the last frame while the user is
     looking at it — not after it has scrolled past. */
  const progress = Math.min(
    1,
    Math.max(0, (triggerY - (rect.top + ribbonStartY)) / (ribbonEndY - ribbonStartY))
  );
  drawRibbon(pathLen * progress);
  /* Chapters are always visible (no opacity reveal). When the ribbon's
     tip reaches a chapter, it gets one tiny nudge animation. */
  if (tipPoint) {
    chapterEls.forEach((ch) => {
      if (!ch.classList.contains("line-hit") && tipPoint.y > ch.offsetTop + 40) {
        ch.classList.add("line-hit");
      }
    });
  }
}

let lineTicking = false;
function onLineScroll() {
  if (!lineTicking) {
    lineTicking = true;
    requestAnimationFrame(() => {
      updateLine();
      lineTicking = false;
    });
  }
}
window.addEventListener("scroll", onLineScroll, { passive: true });
let lineResizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(lineResizeTimer);
  lineResizeTimer = setTimeout(() => {
    if (lineDisabled()) {
      destroyLineSvg();
    } else if (!lineSvg) {
      createLineSvg();
    } else {
      buildLine();
    }
  }, 150);
});
window.addEventListener("load", () => {
  if (!lineDisabled() && lineSvg) buildLine();
});
updateLine();

/* ---------- Reveal on scroll (everything except the chapters) ---------- */

const revealEls = [...document.querySelectorAll(".reveal")].filter(
  (el) => !el.classList.contains("chapter")
);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ---------- Footer year ---------- */

document.getElementById("year").textContent = new Date().getFullYear();
