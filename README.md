# Amir Khakian — Portfolio Website

A hand-built, static portfolio site. No framework, no build step, no AI-template
structure. Just HTML + CSS + vanilla JavaScript.

## Concept (v4, Nov 2026)

"A cinema that opens into a magazine." The hero is dark and moving — a
montage of several of his films plays muted and full-bleed behind his
name — and the rest of the page reads like a well-set magazine on warm
paper. One idea, carried by type, composition and the work itself. The
design rules behind it live in
`~/workspace/custom-skills/portfolio-web-design/SKILL.md`.

## Preview

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Deploy

Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages,
Cloudflare Pages, or plain hosting). The site assumes the domain
`amirkhakian.com` in the Open Graph tags (`index.html`, top of file) — change
it if the domain is different.

## What is inside

- `index.html` — structure + all copy
- `styles/main.css` — all styling. Palette: warm paper `#F4F1EA`, warm ink
  `#1B1815`, deep sage accent `#5C6656` (the sage from his portrait,
  deepened so it holds on light ground). The green also appears as a pale
  sage wash behind the intro (`#E9EBE3`) and a deep sage contact block
  (`#4C5745`). Display type is Fraunces
  (variable serif, self-hosted); body is Space Grotesk; labels are
  JetBrains Mono. A fixed SVG film-grain overlay (~5%, multiply) gives
  the paper tactility.
- `scripts/main.js` — project data + chapter rendering + in-place players
  + hero-video reduced-motion handling + top-bar scroll state +
  copy-email. Clicking a chapter's frame swaps it in place for the player
  (Drive preview embed, or the local `<video>` for Larry Fink); only one
  player is open at a time, and closing a chapter stops its video.
  Stills are always visible (hover-only previews fail on mobile, where
  there is no hover state).
- Scroll line (Amir's idea, 2026-11-16; reshaped from his sketch the same
  day): a sage thread WINDS down the Work section like a river, swinging
  left and right past each chapter — not a straight spine. It is an SVG
  path built through the chapters (Catmull-Rom smoothing, aim points
  alternating 12%/88% of the width at each chapter's middle); the fill
  draws with scroll progress (stroke-dashoffset), the tip travels along
  the path, and each chapter reveals (fade + rise) the moment the tip's
  Y passes it, lighting a small node where the line meets it.
  Implemented in `main.js` (`buildLine`/`updateLine`, trigger at 72%
  viewport height; path rebuilt on resize and load) and `main.css`
  (`.scroll-line-svg`, `.scroll-line-track`, `.scroll-line-fill-path`,
  `.scroll-line-dot`, `.scroll-line-node`); with reduced motion the line
  is hidden and all chapters show at once.
- `assets/fonts/` — Fraunces (variable roman + italic), Space Grotesk,
  JetBrains Mono (latin woff2, self-hosted — no Google Fonts dependency)
- `assets/icons/` — real brand SVGs (Premiere Pro + After Effects +
  Photoshop from Devicon, DaVinci Resolve from Simple Icons), recoloured
  to the deep sage accent. Note: Simple Icons removed all Adobe icons in
  v14 (Dec 2024), which is why the Adobe icons come from Devicon instead.
  The AI Creative Tools icon is a hand-drawn sparkle.
- `assets/images/amir-khakian.jpg` — portrait (from his LinkedIn photo)
- `assets/images/chapters/` — large chapter stills (1600×900; Sara and
  PicoPry vertical 1000×1778). `assets/images/thumbs/` holds the older small
  thumbnails (kept, currently unused by v4).
- `assets/images/larry-fink-poster.jpg` — poster for the local clip
- `assets/images/hero-montage-poster.jpg` — poster for the hero montage
- `assets/videos/larry-fink-clip.mp4` — 56s Larry Fink excerpt, 720p, 8 MB
  — the closing chapter's video
- `assets/videos/hero-montage.mp4` — the muted looping hero montage, 49s:
  seven 7-second excerpts in chapter order (HeelHero Live 52–59s,
  HeelHero 3D 0–7s — its first seven seconds, per Amir — Fitness 1–8s,
  Documentary Intro 0–7s, Japan 502–509s Shibuya at night, Synthwave
  57–64s neon car, Larry Fink 44–51s rising angel). The two vertical
  films (Sara Charif, PicoPry) are not in the montage: vertical clips do
  not fit the full-bleed 16:9 hero. Fitness is 4096×2160, so its segment
  is scaled with aspect preserved and padded (letterboxed) — a plain
  1280×720 scale visibly stretched it (Amir's catch, 2026-11-16).

## How the videos work

Eight projects play from Amir's Google Drive portfolio folder via the Drive
preview embed (`drive.google.com/file/d/ID/preview`), opening in place
when their chapter's frame is clicked. The files must stay shared (link
sharing on) or the embeds show an access screen. Each chapter also has an
"Open in Drive ↗" fallback link. A "full archive" block at the end of the
Work section links the whole Drive portfolio folder
(`drive/folders/1Gcucp3UfmTAMAAFuv1aE2dJF--69E0xH`).

The Larry Fink clip is a local file (the episode is not in the Drive folder)
and autoplays with sound when its chapter is opened (the click is the user
gesture that allows it). The hero background is a separate local file, a
montage cut from excerpts of the selected works; it plays muted and looped,
and visitors with reduced-motion settings see its poster frame instead of
the moving video.

## Editing

- **Email:** currently `khakianamir5@gmail.com`. Change it in two places:
  `index.html` (the `mailto:` link + visible text) and `scripts/main.js`
  (the `EMAIL` constant at the top).
- **Add a project:** add one entry to the `PROJECTS` array at the top of
  `scripts/main.js` (client, title, category, duration, Drive file ID,
  chapter still path, layout, one-line description). Drop its still into
  `assets/images/chapters/` at 1600px wide (Drive serves stills at
  requested sizes: `drive.google.com/thumbnail?id=FILE_ID&sz=w1600` — but
  verify the frame; if Drive's auto-thumbnail is a blank or black frame,
  extract a real mid-video frame with ffmpeg instead). Layouts: `wide`
  (full-width), `split` / `split-rev` (still beside text),
  `portrait` (vertical still). For a local video instead of Drive, use
  `localVideo` + `poster` like the Larry Fink entry. Optional `chapterPos`
  (e.g. `"50% 18%"`) shifts the crop window for vertical or off-centre
  frames.
- **Mark a project finished:** move it from the `SOON` array to `PROJECTS`
  in `scripts/main.js` and give it a video + chapter still.
- **Availability:** the "Available for work" badge is plain text in
  `index.html` (top bar). Edit or remove it there.
- **Services:** the six rows mirror Amir's LinkedIn bio specializations
  (Nov 2026). Colour grading stays listed with the Full Finish note —
  it is a specialization, not a standalone offer.

## What is deliberately not here

No preloader, no NDA vault (there is no gated work to put behind one),
no client marquee (clients are already in the works list), no fake stats,
no award claims, no AI mention, no showreel button (no showreel exists yet —
add it as a project entry when it is ready).
