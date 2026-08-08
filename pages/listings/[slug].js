import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { LISTINGS, getListing } from "../../lib/listings";
import ListingPhotoGallery from "../../components/ListingPhotoGallery";

export async function getStaticPaths() {
  const paths = Object.keys(LISTINGS).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const listing = getListing(params.slug);

  return {
    props: {
      listing,
    },
  };
}

export default function ListingPage({ listing }) {
  const [language, setLanguage] = useState("en");

  const whatsappNumberE164 = "523221900492";
  const contactEmail = "joselo@ronmorgan.net";
  const phoneNumber = "+52 (322) 190-0492";

  const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLScFd3eXmE3mfKfb9NtqT9htyeQLxjBZWnPPR5tGMBKbUrqCig/viewform?usp=header";

  const isSpanish = language === "es";

  /*
   * English remains the default listing object.
   *
   * When Spanish is selected, the fields inside listing.es
   * override the corresponding English fields.
   *
   * Shared fields such as:
   * price
   * photos
   * MLS link
   * map
   * slug
   *
   * automatically remain unchanged.
   */
  const content =
    isSpanish && listing.es
      ? {
          ...listing,
          ...listing.es,
        }
      : listing;

  /*
   * Shared interface translations.
   *
   * These do NOT need to be repeated inside every listing.
   */
  const ui = isSpanish
    ? {
        allListings: "Todas las Propiedades →",
        whatsapp: "WhatsApp",
        email: "Correo",
        call: "Llamar",
        viewMls: "Ver Propiedad en MLS",
        whyThisProperty: "Por qué esta propiedad",
        topReasons: "Razones principales",
        rapidResponse: "Respuesta Rápida",
        justAsk: "Pregúntame",
        propertyInfo: "Información sobre esta propiedad",
        messageWhatsapp: "Enviar mensaje por WhatsApp",
        findYourFit: "¿No es para ti? Encuentra la ideal.",
        map: "Mapa",
        interested: "¿Te interesa esta propiedad?",
      }
    : {
        allListings: "All Listings →",
        whatsapp: "WhatsApp",
        email: "Email",
        call: "Call",
        viewMls: "View MLS Listing",
        whyThisProperty: "Why this property",
        topReasons: "Top reasons",
        rapidResponse: "Rapid Response",
        justAsk: "Just ask",
        propertyInfo: "Information about this property",
        messageWhatsapp: "Message on WhatsApp",
        findYourFit: "Not for you? Find your fit.",
        map: "Map",
        interested: "Interested in this property?",
      };

  /*
   * Change the document language when the toggle changes.
   */
  useEffect(() => {
    document.documentElement.lang = isSpanish ? "es-MX" : "en";
  }, [isSpanish]);

  /*
   * WhatsApp message changes language too.
   */
  const whatsappMessage = isSpanish
    ? `Hola, me interesa ${content.title} en ${content.addressOrArea}. ¿Me puedes compartir más información y disponibilidad?`
    : `Hi! I'm interested in ${content.title} in ${content.addressOrArea}. Can you share details and availability?`;

  const whatsappLink = `https://wa.me/${whatsappNumberE164}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  /*
   * Contact page stays the same.
   */
  const contactPageLink = `https://contact.joselo.net/?listing=${encodeURIComponent(
    listing.slug
  )}`;

  return (
    <>
      <Head>
        <title>{`${content.title} | ${content.addressOrArea}`}</title>

        <meta
          name="description"
          content={content.seoDescription || content.subtitle}
        />

        <meta
          property="og:title"
          content={`${content.title} | ${content.addressOrArea}`}
        />

        <meta
          property="og:description"
          content={content.seoDescription || content.subtitle}
        />

        {listing.photos?.[0]?.src && (
          <meta property="og:image" content={listing.photos[0].src} />
        )}
      </Head>

      <main className="page">
        {/* TOP NAVIGATION */}
        <div className="topNav">
          {/* JOSELO HOME LINK */}
          <a href="https://www.joselo.net" className="homeLink">
            <Image
              src="/photos/JoseloLogoTransparent.png"
              alt="Joselo.net"
              width={105}
              height={31}
              className="homeLogo"
            />

            <span className="homeText">
              <span className="tagline">{ui.allListings}</span>
            </span>
          </a>

          {/* LANGUAGE TOGGLE */}
          <div
            className="languageToggle"
            aria-label="Language selector"
          >
            <button
              type="button"
              className={language === "en" ? "languageActive" : ""}
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              ENG
            </button>

            <span className="languageDivider">/</span>

            <button
              type="button"
              className={language === "es" ? "languageActive" : ""}
              onClick={() => setLanguage("es")}
              aria-pressed={language === "es"}
            >
              ESP
            </button>
          </div>
        </div>

        {/* HERO */}
        <header className="hero">
          <div className="heroText">
            <div className="badge">{content.addressOrArea}</div>

            <h1>{content.title}</h1>

            <p className="subtitle">{content.subtitle}</p>

            <div className="priceRow">
              <div className="price">{listing.priceText}</div>

              <div className="ctaRow">
                <a
                  className="btn primary"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ui.whatsapp}
                </a>

                <a
                  className="btn primary"
                  href={contactPageLink}
                >
                  {ui.email}
                </a>

                <a
                  className="btn primary"
                  href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
                >
                  {ui.call}
                </a>
              </div>
            </div>

            {/* FACTS */}
            <div className="facts">
              {content.facts?.map((f) => (
                <div
                  key={`${f.label}-${f.value}`}
                  className="fact"
                >
                  <div className="factLabel">{f.label}</div>
                  <div className="factValue">{f.value}</div>
                </div>
              ))}
            </div>

            {/* MLS LINK */}
            {listing.mlsLink && (
              <p className="mlsNote">
                <a
                  href={listing.mlsLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ui.viewMls}
                </a>
              </p>
            )}
          </div>

          <ListingPhotoGallery
            photos={listing.photos}
            title={content.title}
          />
        </header>

        {/* OPTIONAL SEO INTRO */}
        {content.seoIntro && (
          <section className="seoIntro">
            <p>{content.seoIntro}</p>
          </section>
        )}

        {/* SEO BODY */}
        {content.seoSections?.length > 0 && (
          <section className="seoBody">
            {content.seoSections.map((section, sectionIndex) => (
              <section
                key={`${section.heading}-${sectionIndex}`}
                className="seoSection"
              >
                <h2>{section.heading}</h2>

                {section.paragraphs?.map(
                  (paragraph, paragraphIndex) => (
                    <p
                      key={`${sectionIndex}-${paragraphIndex}`}
                    >
                      {paragraph}
                    </p>
                  )
                )}

                {section.list?.length > 0 && (
                  <ul className="seoList">
                    {section.list.map((item, itemIndex) => (
                      <li
                        key={`${sectionIndex}-${itemIndex}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </section>
        )}

        {/* DETAILS + CONTACT */}
        <section className="section twoCol">
          {/* LEFT: WHY THIS PROPERTY */}
          <div>
            <div className="whyCard">
              <div className="whyHeader">
                <h2 className="whyTitle">
                  {ui.whyThisProperty}
                </h2>

                <div className="whyPill">
                  {ui.topReasons}
                </div>
              </div>

              <ul className="bullets whyBullets">
                {content.highlights?.map((h, index) => (
                  <li key={`${h}-${index}`}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: CONTACT CARD */}
          <div className="card whyCard rapidCard">
            <div className="rapidHeader">
              <h3 className="rapidTitle">
                {ui.rapidResponse}
              </h3>

              <div className="rapidPill">
                {ui.justAsk}
              </div>
            </div>

            <div className="altCtas rapidCtas">
              <a
                className="btn primary"
                href={contactPageLink}
                target="_blank"
                rel="noreferrer"
              >
                {ui.propertyInfo}
              </a>

              <a
                className="btn primary"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                {ui.messageWhatsapp}
              </a>

              <a
                className="btn primary"
                href={googleFormLink}
                target="_blank"
                rel="noreferrer"
              >
                {ui.findYourFit}
              </a>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="section">
          <h2>{ui.map}</h2>

          <div className="mapWrap">
            <iframe
              src={listing.googleMapsEmbedUrl}
              width="100%"
              height="420"
              style={{
                border: 0,
                borderRadius: 16,
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={ui.map}
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <strong>{ui.interested}</strong>

            <div className="footerCtas">
              <a
                className="btn primary"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                {ui.whatsapp}
              </a>

              <a
                className="btn"
                href={contactPageLink}
              >
                {ui.email}
              </a>

              <a
                className="btn"
                href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
              >
                {ui.call}
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

            font-family:
              ui-sans-serif,
              system-ui,
              -apple-system,
              Segoe UI,
              Roboto,
              Helvetica,
              Arial;

            color: #0f172a;
          }

          /* =========================================
             TOP NAVIGATION
          ========================================= */

          .topNav {
            display: flex;
            align-items: center;
            gap: 14px;

            margin-bottom: 20px;

            flex-wrap: wrap;
          }

          /* =========================================
             JOSELO HOME BUTTON
          ========================================= */

          .homeLink {
            display: inline-flex;
            align-items: center;
            gap: 10px;

            padding: 10px 18px;

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
              0 0 10px rgba(212, 175, 55, 0.3),
              0 0 24px rgba(212, 175, 55, 0.15),
              0 8px 22px rgba(0, 0, 0, 0.08);

            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              border-color 0.25s ease;
          }

          .homeLink:hover {
            transform: translateY(-2px);

            box-shadow:
              0 0 18px rgba(212, 175, 55, 0.55),
              0 0 42px rgba(212, 175, 55, 0.35),
              0 14px 34px rgba(0, 0, 0, 0.12);

            border-color: #c99d33;
          }

          .homeLogo {
            height: 27px;
            width: auto;

            display: block;

            filter:
              drop-shadow(
                0 1px 2px rgba(255, 255, 255, 0.35)
              )
              brightness(1.02);

            opacity: 0.96;
          }

          .homeText {
            display: flex;
            flex-direction: column;
            line-height: 1.15;
          }

          .tagline {
            font-size: 14px;
            font-weight: 700;

            color: #14356b;

            letter-spacing: 0.02em;

            white-space: nowrap;
          }

          /* =========================================
             LANGUAGE TOGGLE
          ========================================= */

          .languageToggle {
            display: inline-flex;
            align-items: center;
            gap: 7px;

            padding: 9px 14px;

            border-radius: 999px;

            border: 1px solid #d6b15b;

            background: #fffdf8;

            box-shadow:
              0 0 8px rgba(212, 175, 55, 0.18),
              0 5px 16px rgba(0, 0, 0, 0.06);
          }

          .languageToggle button {
            appearance: none;

            border: 0;

            padding: 0;

            background: transparent;

            cursor: pointer;

            font-family: inherit;

            font-size: 13px;
            font-weight: 700;

            color: #94a3b8;

            transition:
              color 0.15s ease,
              transform 0.15s ease;
          }

          .languageToggle button:hover {
            color: #14356b;

            transform: translateY(-1px);
          }

          .languageToggle button.languageActive {
            color: #14356b;

            font-weight: 900;
          }

          .languageDivider {
            font-size: 12px;

            color: #c9a54a;
          }

          /* =========================================
             HERO
          ========================================= */

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

          /* =========================================
             PRICE + CTA
          ========================================= */

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

          /* =========================================
             FACTS
          ========================================= */

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

          .factLabel {
            font-weight: 700;
          }

          .factValue {
            margin-top: 2px;
          }

          /* =========================================
             HERO PHOTO
          ========================================= */

          .heroMedia img {
            width: 100%;

            height: 100%;

            object-fit: cover;

            border-radius: 18px;
          }

          /* =========================================
             GENERAL SECTIONS
          ========================================= */

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

          .seoBody {
            margin-top: 28px;
          }

          .seoSection {
            margin-top: 28px;
          }

          .seoSection p {
            line-height: 1.7;

            color: #334155;
          }

          .seoList {
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

          /* =========================================
             TWO COLUMN AREA
          ========================================= */

          .twoCol {
            display: grid;

            grid-template-columns: 1.05fr 0.95fr;

            gap: 18px;
          }

          .card {
            border: 1px solid #e2e8f0;

            padding: 16px;

            border-radius: 18px;

            box-shadow:
              0 10px 24px rgba(15, 23, 42, 0.06);
          }

          .altCtas {
            display: grid;

            gap: 10px;
          }

          /* =========================================
             FOOTER
          ========================================= */

          .footer {
            margin-top: 36px;

            border-top: 1px solid #e2e8f0;

            padding-top: 18px;

            display: flex;

            justify-content: space-between;

            flex-wrap: wrap;

            gap: 14px;
          }

          .footerCtas {
            margin-top: 10px;
          }

          .fineprint {
            font-size: 13px;

            color: #64748b;
          }

          /* =========================================
             WHY THIS PROPERTY
          ========================================= */

          .whyCard {
            border: 1px solid #dbeafe;

            background: linear-gradient(
              180deg,
              #eff6ff 0%,
              #ffffff 100%
            );

            border-radius: 18px;

            padding: 16px 16px 12px;

            box-shadow:
              0 14px 30px rgba(37, 99, 235, 0.08);
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

          /* =========================================
             RAPID RESPONSE
          ========================================= */

          .rapidCard {
            text-align: center;
          }

          .rapidHeader {
            display: flex;

            align-items: center;

            justify-content: space-between;

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

          /* =========================================
             TABLET / MOBILE
          ========================================= */

          @media (max-width: 900px) {
            .hero,
            .twoCol {
              grid-template-columns: 1fr;
            }

            h1 {
              font-size: 32px;
            }

            .topNav {
              justify-content: flex-start;

              gap: 10px;
            }

            .homeLink {
              width: auto;

              justify-content: flex-start;
            }

            /* Keep facts in three columns */
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
          }

          /* =========================================
             SMALL MOBILE
          ========================================= */

          @media (max-width: 520px) {
            .topNav {
              gap: 8px;
            }

            .homeLink {
              padding: 9px 12px;

              gap: 7px;
            }

            .homeLogo {
              height: 23px;

              width: auto;
            }

            .tagline {
              font-size: 11px;
            }

            .languageToggle {
              padding: 8px 10px;

              gap: 5px;
            }

            .languageToggle button {
              font-size: 11px;
            }

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
