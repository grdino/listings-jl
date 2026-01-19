import Link from "next/link";
import { LISTINGS } from "../../lib/listings";

export default function ListingsIndex() {
  const items = Object.values(LISTINGS);

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Listings</h1>
      <p>Select a listing:</p>

      <ul>
        {items.map((l) => (
          <li key={l.slug} style={{ margin: "10px 0" }}>
            <Link href={`/listings/${l.slug}`}>
              {l.title}
            </Link>
            <div style={{ color: "#64748b", marginTop: 4 }}>{l.subtitle}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
