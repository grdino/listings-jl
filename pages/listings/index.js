import Link from "next/link";
import { LISTINGS } from "../../lib/listings";

export default function ListingsIndex() {
  const items = Object.values(LISTINGS);

  const activeListings = items.filter((l) => l.status !== "sold");
  const soldListings = items.filter((l) => l.status === "sold");

  return (
    <main className="page">
      <header className="header">
        <h1>Puerto Vallarta Listings</h1>
        <p>Explore current and recently sold properties.</p>
      </header>

      <ListingSection title="Active Listings" listings={activeListings} />
      <ListingSection title="Sold Listings" listings={soldListings} muted />

      <style jsx>{`
        .page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 18px 60px;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI,
            Roboto, Helvetica, Arial;
          color: #0f172a;
        }

        .header {
          margin-bottom: 30px;
        }

        h1 {
          font-size: 42px;
          margin: 0 0 8px;
        }

        .header p {
          color: #64748b;
          font-size: 17px;
          margin: 0;
        }
      `}</style>
    </main>
  );
}

function ListingSection({ title, listings, muted = false }) {
  if (!listings.length) return null;

  return (
    <section className="section">
      <h2>{title}</h2>

      <div className="cards">
        {listings.map((listing) => (
          <Link
            key={listing.slug}
            href={`/listings/${listing.slug}`}
            className={`card ${muted ? "muted" : ""}`}
          >
            <div className="imageWrap">
              <img
                src={listing.photos?.[0]?.src || "/photos/placeholder.jpg"}
                alt={listing.photos?.[0]?.alt || listing.title}
              />

              {listing.status === "sold" && (
                <div className="statusBadge">Sold</div>
              )}
            </div>

            <div className="content">
              <div className="price">{listing.priceText}</div>
              <h3>{listing.title}</h3>
              <p>{listing.subtitle}</p>
              <div className="area">{listing.addressOrArea}</div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .section {
          margin-top: 34px;
        }

        h2 {
          font-size: 26px;
          margin: 0 0 16px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .card {
          display: block;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid #e2e8f0;
          background: white;
          color: inherit;
          text-decoration: none;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 38px rgba(15, 23, 42, 0.12);
        }

        .card.muted {
          opacity: 0.82;
        }

        .imageWrap {
          position: relative;
          height: 280px;
          background: #0f172a;
        }

        .imageWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .statusBadge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #0f172a;
          color: white;
          padding: 7px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .content {
          padding: 18px;
        }

        .price {
          display: inline-block;
          margin-bottom: 10px;
          background: #eff6ff;
          color: #1d4ed8;
          padding: 7px 10px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 14px;
        }

        h3 {
          margin: 0 0 8px;
          font-size: 23px;
          line-height: 1.15;
        }

        p {
          margin: 0 0 12px;
          color: #475569;
          line-height: 1.45;
        }

        .area {
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
        }

        @media (max-width: 760px) {
          .cards {
            grid-template-columns: 1fr;
          }

          .imageWrap {
            height: 240px;
          }
        }
      `}</style>
    </section>
  );
}
