import localFont from "next/font/local";

/** Cocogoose Pro (trial) — display face. Kept mostly light: the design
 *  calls for refined, not heavy. */
export const display = localFont({
  variable: "--font-display-src",
  display: "swap",
  src: [
    { path: "../../public/cocogoose/Cocogoose-Pro-Thin-trial.ttf", weight: "200", style: "normal" },
    { path: "../../public/cocogoose/Cocogoose-Pro-Light-trial.ttf", weight: "300", style: "normal" },
    { path: "../../public/cocogoose/Cocogoose-Pro-Light-Italic-trial.ttf", weight: "300", style: "italic" },
    { path: "../../public/cocogoose/Cocogoose-Pro-Semilight-trial.ttf", weight: "400", style: "normal" },
    { path: "../../public/cocogoose/Cocogoose-Pro-Semilight-Italic-trial.ttf", weight: "400", style: "italic" },
    { path: "../../public/cocogoose/Cocogoose-Pro-Regular-trial.ttf", weight: "500", style: "normal" },
    { path: "../../public/cocogoose/Cocogoose-Pro-Bold-trial.ttf", weight: "700", style: "normal" },
  ],
});

/** Biko — supporting / UI face. */
export const text = localFont({
  variable: "--font-text-src",
  display: "swap",
  src: [
    { path: "../../public/biko/Biko_Light-Restricted.otf", weight: "300", style: "normal" },
    { path: "../../public/biko/Biko_Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/biko/Biko_Bold.otf", weight: "700", style: "normal" },
  ],
});
