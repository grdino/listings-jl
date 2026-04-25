"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

export default function ListingPhotoGallery({ photos = [], title = "Property photos" }) {
  const [index, setIndex] = useState(-1);

  const slides = useMemo(
    () =>
      photos.map((photo) => ({
        src: photo.src,
        alt: photo.alt || title,
        description: photo.alt || title,
      })),
    [photos, title]
  );

  if (!photos.length) return null;

  const visiblePhotos = photos.slice(0, 5);
  const extraCount = photos.length - visiblePhotos.length;

  return (
    <section className="listing-gallery">
      <style jsx>{`
        .listing-gallery {
          width: 100%;
          margin: 32px 0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 10px;
          height: 520px;
          border-radius: 24px;
          overflow: hidden;
        }

        .gallery-main,
        .gallery-thumb {
          border: 0;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          background: #111;
          position: relative;
        }

        .gallery-main img,
        .gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
          display: block;
        }

        .gallery-main:hover img,
        .gallery-thumb:hover img {
          transform: scale(1.04);
        }

        .gallery-side {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.55);
          color: white;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          padding: 12px;
        }

        @media (max-width: 768px) {
          .gallery-grid {
            display: block;
            height: auto;
            border-radius: 18px;
          }

          .gallery-main {
            height: 340px;
            width: 100%;
          }

          .gallery-side {
            display: none;
          }
        }
      `}</style>

      <div className="gallery-grid">
        <button className="gallery-main" onClick={() => setIndex(0)}>
          <img src={photos[0].src} alt={photos[0].alt || title} />
        </button>

        <div className="gallery-side">
          {visiblePhotos.slice(1).map((photo, i) => {
            const photoIndex = i + 1;
            const isLast = photoIndex === 4 && extraCount > 0;

            return (
              <button
                key={photo.src}
                className="gallery-thumb"
                onClick={() => setIndex(photoIndex)}
              >
                <img src={photo.src} alt={photo.alt || title} />

                {isLast && (
                  <span className="gallery-overlay">
                    View all {photos.length} photos
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Thumbnails, Zoom, Counter]}
        carousel={{ imageFit: "contain" }}
      />
    </section>
  );
}