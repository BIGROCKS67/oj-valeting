import type { Review } from "@/data/reviews";
import { Stars } from "@/components/Stars";

// Every review Owen has is five stars (5.0 on Google), so each card shows five.
export function ReviewList({ items, cards }: { items: Review[]; cards?: boolean }) {
  return (
    <ul className={cards ? "reviews review-cards" : "reviews"} role="list">
      {items.map((r) => (
        <li key={r.name + r.when}>
          <Stars />
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
