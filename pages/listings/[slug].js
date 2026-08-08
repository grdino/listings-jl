import Head from "next/head";
import Image from "next/image";
import { LISTINGS, getListing } from "../../lib/listings";
import ListingPhotoGallery from "../../components/ListingPhotoGallery";

export async function getStaticPaths() {
  const paths = Object.keys(LISTINGS).map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const listing = getListing(params.slug);
  return { props: { listing } };
}

export default function ListingPage({ listing }) {
  const whatsappNumberE164 = "523221900492";
  const contactEmail = "joselo@ronmorgan.net";
  const phoneNumber = "+52 (322) 190-0492";
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScFd3eXmE3mfKfb9NtqT9htyeQLxjBZWnPPR5tGMBKbUrqCig/viewform?usp=header";

  const whatsappLink = `https://wa.me/${whatsappNumberE164}?text=${encodeURIComponent(
    `Hi! I'm interested in ${listing.title} in ${listing.addressOrArea}. Can you share details and availability?`
  )}`;

  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `Inquiry: ${listing.title} (${listing.addressOrArea})`
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'm interested in ${listing.title} in ${listing.addressOrArea}.\n\nMy timeline is:\nMy budget range is:\nI plan to use it for (personal / investment / both):\n\nPlease send details (price, HOA, taxes, showing options).\n\nThanks!`
  )}`;

  const contactPageLink = `https://contact.joselo.net/?listing=${encodeURIComponent(
    listing.slug
  )}`;

  return (
    <>
      <Head>
        <title>{`${listing.title} | ${listing.addressOrArea}`}</title>
        <meta
          name="description"
          content={listing.seoDescription || listing.subtitle}
        />
        <meta
          property="og:title"
          content={`${listing.title} | ${listing.addressOrArea}`}
        />
        <meta
          property="og:description"
          content={listing.seoDescription || listing.subtitle}
        />
        {listing.photos?.[0]?.src && (
          <meta property="og:image" content={listing.photos[0].src} />
        )}
      </Head>

      <main className="page">

        <div className="topNav">
          <a
            href="https://www.joselo.net"
            className="homeLink"
          >
            <Image
              src="/photos/JoseloLogoHighRes.png"
              alt="Joselo.net"
              width={140}
              height={42}
              className="homeLogo"
            />

<span className="homeText">
  <span className="tagline">
    View All Listings →
  </span>
</span>
          </a>
        </div>
      
        {/* HERO */}
        <header className="hero">
          <div className="heroText">
            <div className="badge">{listing.addressOrArea}</div>
            <h1>{listing.title}</h1>
            <p className="subtitle">{listing.subtitle}</p>

            <div className="priceRow">
              <div className="price">{listing.priceText}</div>
              <div className="ctaRow">
                <a
                  className="btn primary"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <a className="btn primary" href={contactPageLink}>
                  Email
                </a>
                <a
                  className="btn primary"
                  href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
                >
                  Call
                </a>
              </div>
            </div>

            {/* FACTS */}
            <div className="facts">
              {listing.facts.map((f) => (
                <div key={f.label} className="fact">
                  <div className="factLabel">{f.label}</div>
                  <div className="factValue">{f.value}</div>
                </div>
              ))}
            </div>

            {listing.mlsLink && (
              <p className="mlsNote">
       {/*         Listed on the MLS.{" "} */}
                <a href={listing.mlsLink} target="_blank" rel="noreferrer">
                  View MLS Listing
                </a>
      {/*        .  */}
              </p>
            )}
          </div>

          <ListingPhotoGallery photos={listing.photos} title={listing.title} />
        </header>

        {listing.seoIntro && (
          <section className="seoIntro">
          <p>{listing.seoIntro}</p>
          </section>
        )}

        {listing.seoSections?.length > 0 && (
          <section className="seoBody">
            {listing.seoSections.map((section) => (
              <section key={section.heading} className="seoSection">
                <h2>{section.heading}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.list && (
                  <ul className="seoList">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </section>
        )}

        {/* DETAILS + CONTACT */}
        <section className="section twoCol">
          {/* LEFT: WHY THIS CONDO + LOCATION */}
          <div>
            {/* WHY THIS CONDO */}
            <div className="whyCard">
              <div className="whyHeader">
                <h2 className="whyTitle">Why this condo</h2>
                <div className="whyPill">Top reasons</div>
              </div>

              <ul className="bullets whyBullets">
                {listing.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

               {/* LOCATION */}
         {/*   <h2 style={{ marginTop: 28 }}>Location - Location - Location</h2> */}
         {/*   <p className="text">{listing.locationBlurb}</p> */}
          </div>

          {/* RIGHT: CONTACT CARD */}
          <div className="card whyCard rapidCard">
            <div className="rapidHeader">
              <h3 className="rapidTitle">Rapid Response</h3>
              <div className="rapidPill">Just ask</div>
            </div>

            <div className="altCtas rapidCtas">
              <a
                className="btn primary"
                href={contactPageLink}
                target="_blank"
                rel="noreferrer"
              >
                Information about this property
              </a>

              <a
                className="btn primary"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Message on WhatsApp
              </a>

              <a
                className="btn primary"
                href={googleFormLink}
                target="_blank"
                rel="noreferrer"
              >
                Not for you? Find your fit.
              </a>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="section">
          <h2>Map</h2>
          <div className="mapWrap">
            <iframe
              src={listing.googleMapsEmbedUrl}
              width="100%"
              height="420"
              style={{ border: 0, borderRadius: 16 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <strong>Interested in this condo?</strong>
            <div className="footerCtas">
              <a
                className="btn primary"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a className="btn" href={contactPageLink}>
                Email
              </a>
              <a
                className="btn"
                href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
              >
                Call
              </a>
            </div>
          </div>
          <div className="fineprint">
            © {new Date().getFullYear()} • {contactEmail}
          </div>
        </footer>

        {/* STYLES */}
        <style jsx>{`
          .page {
            max-width: 1100px;
            margin: 0 auto;
            padding: 22px 18px 60px;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI,
              Roboto, Helvetica, Arial;
            color: #0f172a;
          }

          .topNav {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .homeLink {
            display: inline-flex;
            align-items: center;
            gap: 14px;
          
            padding: 12px 22px;
          
            text-decoration: none;
          
            border-radius: 999px;
          
            background: linear-gradient(
              135deg,
              #fffdf8 0%,
              #f9f3e5 45%,
              #ecd9a5 100%
            );
          
            border: 1px solid #d6b15b;
          
            box-shadow:
              0 0 10px rgba(212,175,55,.30),
              0 0 24px rgba(212,175,55,.15),
              0 8px 22px rgba(0,0,0,.08);
          
            transition: all .25s ease;
          }
          
          .homeLink:hover {
          
            transform: translateY(-2px);
          
            box-shadow:
              0 0 18px rgba(212,175,55,.55),
              0 0 42px rgba(212,175,55,.35),
              0 14px 34px rgba(0,0,0,.12);
          
            border-color: #c99d33;
          }
          
          .homeLogo {
            height: 28px;      /* Was 34px */
            width: auto;
          
            display: block;
          
            filter:
              drop-shadow(0 1px 2px rgba(255,255,255,.35))
              brightness(1.02);
          
            opacity: .96;
          }
                    
          .brand {
            font-size: 19px;
            font-weight: 800;
            color: #3d2d0d;
          }
          
          .tagline {
            font-size: 15px;
            font-weight: 700;
            color: #14356b;      /* Matches your logo blue */
            letter-spacing: .03em;
            text-transform: none;
          }

          .hero {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 22px;
            margin-top: 10px;
          }

          .badge {
            font-size: 12px;
            padding: 6px 10px;
            border-radius: 999px;
            background: #f1f5f9;
            color: #334155;
            display: inline-block;
            margin-bottom: 10px;
          }

          h1 {
            font-size: 40px;
            margin: 0 0 10px;
          }

          .subtitle {
            color: #334155;
            margin-bottom: 14px;
          }

          .priceRow {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 14px;
          }

          .price {
            background: #0f172a;
            color: white;
            padding: 10px 12px;
            border-radius: 12px;
            font-weight: 700;
          }

          .ctaRow,
          .footerCtas {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .btn {
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            background: white;
            font-weight: 600;
            text-decoration: none;
            color: #0f172a;
          }

          .btn.primary {
            background: #2563eb;
            color: white;
            border-color: #2563eb;
          }

          .facts {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .fact {
            border: 1px solid #e2e8f0;
            padding: 10px 12px;
            border-radius: 14px;
            background: #f0f5fa;
            text-align: center;
          }

          .heroMedia img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 18px;
          }

          .section {
            margin-top: 34px;
          }

          .seoIntro {
            max-width: 1000px;
            margin-top: 22px;
          }

          .seoIntro p {
            margin: 0;
            font-size: 16px;
            line-height: 1.7;
            color: #334155;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .grid img {
            width: 100%;
            border-radius: 14px;
          }

          .twoCol {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 18px;
          }

          .card {
            border: 1px solid #e2e8f0;
            padding: 16px;
            border-radius: 18px;
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
          }

          .altCtas {
            display: grid;
            gap: 10px;
          }

          .footer {
            margin-top: 36px;
            border-top: 1px solid #e2e8f0;
            padding-top: 18px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 14px;
          }

          .fineprint {
            font-size: 13px;
            color: #64748b;
          }

          /* WHY THIS CONDO - standout styles */
          .whyCard {
            border: 1px solid #dbeafe;
            background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
            border-radius: 18px;
            padding: 16px 16px 12px;
            box-shadow: 0 14px 30px rgba(37, 99, 235, 0.08);
          }

          /* RAPID RESPONSE CARD */
          .rapidCard {
            text-align: center;
          }

          .rapidHeader {
            display: flex;
            align-items: center;
            justify-content: space-between; /* left title, right pill */
            gap: 12px;
            margin-bottom: 14px;
          }

          .rapidTitle {
            margin: 0;
            font-size: 20px;
            letter-spacing: -0.01em;
          }

          .rapidPill {
            font-size: 12px;
            font-weight: 700;
            padding: 6px 10px;
            border-radius: 999px;
            background: #2563eb;
            color: white;
            white-space: nowrap;
          }

          .rapidCtas {
            display: grid;
            gap: 10px;
          }

          .rapidBtn {
            width: 100%;
            text-align: center;
            justify-content: center;
            display: inline-flex;
            align-items: center;
          }

          .whyHeader {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 10px;
          }

          .whyTitle {
            margin: 0;
            font-size: 22px;
            letter-spacing: -0.01em;
          }

          .whyPill {
            font-size: 12px;
            font-weight: 700;
            padding: 6px 10px;
            border-radius: 999px;
            background: #2563eb;
            color: white;
            white-space: nowrap;
          }

          .whyBullets {
            margin: 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 10px;
          }

          .whyBullets li {
            position: relative;
            padding: 10px 12px 10px 34px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid #e2e8f0;
          }

          .whyBullets li::before {
            content: "✓";
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 22px;
            height: 22px;
            border-radius: 999px;
            display: grid;
            place-items: center;
            background: #dcfce7;
            border: 1px solid #86efac;
            font-weight: 900;
          }

          @media (max-width: 900px) {
            .hero,
            .twoCol {
              grid-template-columns: 1fr;
            }

            h1 {
              font-size: 32px;
            }

            /* keep facts in 3 columns */
            .facts {
              grid-template-columns: repeat(3, 1fr);
              gap: 8px;
            }

            .fact {
              padding: 8px;
            }

            .factLabel {
              font-size: 11px;
              font-weight: 700;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .factValue {
              font-size: 12px;
              font-weight: 400;
            }

            .grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .whyTitle {
              font-size: 20px;
            }
              .topNav {
                justify-content: center;
              }
              
              .homeLink {
                width: 100%;
                justify-content: center;
              }
              
              .brand {
                font-size: 17px;
              }
          }

          @media (max-width: 520px) {
            .facts {
              grid-template-columns: repeat(3, 1fr);
              gap: 6px;
            }

            .grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </>
  );
}
