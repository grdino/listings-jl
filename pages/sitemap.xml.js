import { LISTINGS } from "../lib/listings";

const BASE_URL = "https://listings.joselo.net";

function generateSitemap() {
  const urls = [
    "/listings",
    ...Object.keys(LISTINGS).map(
      (slug) => `/listings/${slug}`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${BASE_URL}${path}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600");
  res.write(generateSitemap());
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}