import type { ReactNode } from "react";

// The dark title band every inner page opens with, in the same type as the home hero, so each page
// starts with some presence (Jack, 18 Nov: make every page feel slick).
export function PageHead({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-band" aria-labelledby={id}>
      <div className="wrap page-band-in">
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        <h1 id={id}>{title}</h1>
        {children && <div className="page-intro">{children}</div>}
      </div>
    </section>
  );
}
