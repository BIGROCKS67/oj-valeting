import type { Review } from "@/data/reviews";

export function ReviewList({ items }: { items: Review[] }) {
  return (
    <ul className="reviews" role="list">
      {items.map((r) => (
        <li key={r.name + r.when}>
          <blockquote>
            <p>&ldquo;{r.text}&rdquo;</p>
          </blockquote>
          <p className="who">
            {r.name} <span className="when">{r.when}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
