# Fonts — Cocogoose & Biko

The design calls for **Cocogoose** (display) and **Biko** (text). Both are
licensed and were not supplied, so the repo currently ships with free
stand-ins wired in `src/lib/fonts.ts`:

| Role | Spec | Interim |
|------|------|---------|
| display | Cocogoose | Bricolage Grotesque |
| text | Biko | Jost |

## Swapping in the real fonts

1. Obtain the licensed `.woff2` (and optionally `.woff`) files.
2. Place them here, e.g.:

```
src/fonts/
  cocogoose/Cocogoose-Regular.woff2
  cocogoose/Cocogoose-SemiBold.woff2
  cocogoose/Cocogoose-Bold.woff2
  biko/Biko-Light.woff2
  biko/Biko-Regular.woff2
  biko/Biko-Bold.woff2
```

3. Replace the body of `src/lib/fonts.ts` with:

```ts
import localFont from "next/font/local";

export const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../fonts/cocogoose/Cocogoose-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cocogoose/Cocogoose-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cocogoose/Cocogoose-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const text = localFont({
  variable: "--font-text",
  display: "swap",
  src: [
    { path: "../fonts/biko/Biko-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/biko/Biko-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/biko/Biko-Bold.woff2", weight: "700", style: "normal" },
  ],
});
```

Nothing else needs to change — the rest of the app only references the
`--font-display` / `--font-text` CSS variables.
