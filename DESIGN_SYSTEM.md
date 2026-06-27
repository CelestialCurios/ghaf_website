# GHAF DESIGN SYSTEM
# Version 1.0 — Locked for PR 1
# DO NOT MODIFY without explicit approval from architect session

---

## 1. COLOR TOKENS

All colors must be defined as CSS custom properties in globals.css.
Zero 6-digit hex literals permitted in any .tsx file.

```css
:root {
  /* Backgrounds */
  --color-bg:        #3D5C3A;   /* Primary section bg — desaturated sage green */
  --color-bg-dark:   #2E4A2B;   /* Darker section bg — nav, team, footer */
  --color-bg-mid:    #344F31;   /* Mid-tone for subtle variation */

  /* Text & Accents */
  --color-cream:     #F5F0E8;   /* Primary text, buttons, UI elements */
  --color-cream-dim: #EDE8DC;   /* Secondary cream, card surfaces */
  --color-accent:    #FFDE59;   /* SINGLE accent — hero "HERE.", key highlights only */
  --color-muted:     rgba(245, 240, 232, 0.5);   /* Muted text, labels */
  --color-dim:       rgba(245, 240, 232, 0.25);  /* Borders, dividers */
  --color-dim-bg:    rgba(245, 240, 232, 0.07);  /* Card fills on dark bg */

  /* Semantic (used only where meaningful) */
  --color-green-mid: #4CAF50;   /* App UI references only — not page chrome */
}
```

### Color usage rules
- `--color-bg` → all section backgrounds except nav/team/footer
- `--color-bg-dark` → nav, team section, footer
- `--color-cream` → ALL headlines, body text, buttons, icons
- `--color-accent` → ONE use per section maximum. Hero: "HERE." only. Elsewhere: a single word or stat emphasis.
- `--color-muted` → eyebrows, sub-text, labels, ghost CTAs
- `--color-dim` → all borders, dividers — never opaque borders
- NEVER use `--color-green-mid` (#4CAF50) for page chrome. Reserved for app UI illustration only.

---

## 2. TYPOGRAPHY

### Font stack
```css
/* Load in app/layout.tsx via next/font/google */
--font-display: 'Heading Now', 'Space Grotesk', sans-serif;
--font-body:    'Inter', sans-serif;
```

### Heading Now (self-hosted)
- File location: `public/fonts/HeadingNow-Bold.woff2`
- Weight: 700 (display use only)
- Used for: ALL section headlines, hero H1
- Must be declared in globals.css via @font-face

### Fallback until font file is available
Space Grotesk 800 with letter-spacing: -3px to -4px approximates the compressed blocky feel.

### Type scale
```
H1 (hero):        Heading Now, 72px, weight 800, uppercase, letter-spacing -4px, line-height 0.90
H2 (sections):    Heading Now, 40px, weight 800, uppercase, letter-spacing -1.5px, line-height 1.0
H3 (cards):       Space Grotesk, 13px, weight 700, normal case
Eyebrow:          Space Grotesk, 10px, weight 700, uppercase, letter-spacing 2.5px
Body:             Inter, 13px, weight 400, line-height 1.7
Caption/label:    Space Grotesk, 9–10px, weight 600, uppercase, letter-spacing 1px
CTA button:       Space Grotesk, 13px, weight 700
```

### Type color rules
- Headlines → `var(--color-cream)`
- Accent word (one per headline max) → `var(--color-accent)` (#FFDE59)
- Dimmed words (stylistic fade) → `var(--color-cream)` at opacity 0.55
- Body text → `var(--color-muted)`
- Eyebrows → `var(--color-muted)`

---

## 3. TEXTURE

Every section background must have a grain texture overlay.

```css
/* Apply .textured class to every section wrapper */
.textured {
  position: relative;
}
.textured::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: url('/noise.png');
  background-size: 220px 220px;
  background-repeat: repeat;
  opacity: 0.06;
  mix-blend-mode: soft-light;
}
.textured > * {
  position: relative;
  z-index: 2;
}
```

### noise.png generation
Generate a 220×220px noise texture PNG via:
```bash
node -e "
const { createCanvas } = require('canvas');
const c = createCanvas(220, 220);
const ctx = c.getContext('2d');
for(let i=0;i<220;i++) for(let j=0;j<220;j++) {
  const v = Math.floor(Math.random()*255);
  ctx.fillStyle = \`rgb(\${v},\${v},\${v})\`;
  ctx.fillRect(i,j,1,1);
}
require('fs').writeFileSync('public/noise.png', c.toBuffer('image/png'));
"
```
Or use any 220px grayscale noise PNG placed at `public/noise.png`.

---

## 4. SPACING & LAYOUT

```css
--section-padding-y: 52px;
--section-padding-x: 32px;
--card-padding:      18px;
--card-radius:       12px;
--btn-radius:        8px;
--gap-sm:            8px;
--gap-md:            14px;
--gap-lg:            24px;
--gap-xl:            32px;
```

### Layout rules
- Max content width: 1200px, centered
- Mobile-first. All layouts stack on < 768px
- NO drop shadows anywhere — `box-shadow: none` enforced globally
- NO card elevation — flat surfaces only
- Borders = `1px solid var(--color-dim)` — never opaque

---

## 5. COMPONENTS

### Button — Primary
```tsx
// Cream fill, dark text, flat
background: var(--color-cream)
color: var(--color-bg-dark)
font: Space Grotesk 700 13px
padding: 13px 26px
border-radius: var(--btn-radius)
border: none
// hover: opacity 0.9, no transform
```

### Button — Ghost
```tsx
// No fill, muted text, underline only
background: transparent
color: var(--color-muted)
border: none
border-bottom: 1px solid var(--color-dim)
padding-bottom: 2px
font: Space Grotesk 13px
```

### Eyebrow label
```tsx
font: Space Grotesk 700 10px
letter-spacing: 2.5px
text-transform: uppercase
color: var(--color-muted)
margin-bottom: 12px
```

### Stat card (inline, no elevation)
```tsx
// Part of a unified bordered row — not individual floating cards
background: var(--color-dim-bg)
border: 1px solid var(--color-dim)  // only on outer wrapper
padding: 14px 14px 12px
// Adjacent stats share a single border container, divided by 1px internal borders
```

### Badge (win/credential)
```tsx
background: var(--color-dim-bg)
border: 1px solid var(--color-dim)
border-radius: 10px
padding: 10px 16px
// text: --color-cream for title, --color-muted for sub
```

### Feature card
```tsx
background: var(--color-dim-bg)
border: 1px solid var(--color-dim)
border-radius: var(--card-radius)
padding: var(--card-padding)
border-left: 2px solid var(--color-cream)  // only decoration allowed
// NO box-shadow
```

### Founder avatar
```tsx
width: 42px
height: 42px
border-radius: 50%
border: 1px solid var(--color-dim)
background: var(--color-dim-bg)
color: var(--color-cream)
font: Space Grotesk 700 11px
```

---

## 6. SECTION BACKGROUNDS

```
Nav:          --color-bg-dark   + .textured
Hero:         --color-bg        + .textured
Team:         --color-bg-dark   + .textured
Problem:      --color-bg        + .textured
Features:     --color-bg-mid    + .textured
Why Ghaf:     --color-bg-dark   + .textured
Footer:       #0f1a0e           + .textured
```

---

## 7. MOTION

Framer Motion — scroll-triggered only. No ambient loops.

```
Scroll reveal:   fade + translateY(24px) → 0, duration 0.5s, ease-out
Stagger:         0.08s between children in a group
Hero H1 lines:   stagger 0.1s per line on mount
Progress bar:    animate width 0 → value on mount, duration 1.2s ease-out
Video autoplay:  IntersectionObserver, muted, plays when 60% in viewport
Reduced motion:  prefers-reduced-motion: all animations disabled
```

---

## 8. ASSET PATHS

```
/public/fonts/HeadingNow-Bold.woff2     — self-hosted display font
/public/noise.png                       — grain texture tile
/public/mockup.png                      — 3D phone mockup (app_screen_mockup1.png)
/public/logo-dark.png                   — GHAF logo on dark bg (img1)
/public/logo-light.png                  — GHAF logo on light bg (img2)
/public/video/pitch.mp4                 — MBRIF competition video
```

---

## 9. ANTI-PATTERNS — NEVER DO

- No 6-digit hex literals in .tsx files
- No `box-shadow` anywhere
- No `border-radius` without a full border on all sides
- No `#4CAF50` green in page chrome (app UI illustration only)
- No `--color-accent` (#FFDE59) used more than once per section
- No native `<select>` — use design system dropdown
- No `<button>` tag — use `<Button>` primitive
- No gradients in backgrounds
- No inline font-size overrides — use type scale tokens only
- No `position: fixed` in components

---

## 10. PAGE COMPONENT MAP

```
app/
  layout.tsx                — font loading, metadata, globals
  page.tsx                  — composes all sections
  globals.css               — CSS tokens, @font-face, .textured, reset

components/
  Nav.tsx
  sections/
    Hero.tsx
    Team.tsx
    Problem.tsx
    Features.tsx
    WhyGhaf.tsx
    Footer.tsx
  ui/
    Button.tsx
    Eyebrow.tsx
    FounderAvatar.tsx
    StatRow.tsx
    FeatureCard.tsx
    WaitlistForm.tsx          — email capture, Supabase insert
    VideoPlayer.tsx           — autoplay on scroll, muted
```

