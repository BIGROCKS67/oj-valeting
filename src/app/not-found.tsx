import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap prose">
      <h1>That page isn&rsquo;t here</h1>
      <p>
        Try the <Link href="/#prices">price list</Link> or <Link href="/book/">book a clean</Link>.
      </p>
    </section>
  );
}
