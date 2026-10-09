/** Cocogoose (the display face) has no digit glyphs — set any numbers in a
 * display-font string in Biko (`font-text`), e.g. "Insta360". */
export const textDigits = (s: string) =>
  s.split(/(\d+)/).map((part, i) =>
    /\d/.test(part) ? (
      <span key={i} className="font-text">
        {part}
      </span>
    ) : (
      part
    ),
  );
