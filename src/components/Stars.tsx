// Five gold stars (inline SVG, so no font needs the star glyph). Decorative: the rating is in text nearby.
export function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="stars-row" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" width={size} height={size}>
          <path fill="#f5b400" d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}
