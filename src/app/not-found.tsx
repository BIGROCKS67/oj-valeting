import Link from "next/link";
import { site, bookHref } from "@/data/site";

export default function NotFound() {
  return (
    <section className="wrap prose">
      <h1>That Page Isn&rsquo;t Here</h1>
      <p>
        Try the <Link href="/#prices">price list</Link> or <a href={bookHref}>book a clean</a>.
      </p>
    </section>
  );
}
