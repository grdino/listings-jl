export const LISTINGS = {
  "zr-1br-terrace-unit-a": {
    slug: "zr-1br-terrace-unit-a",
    title: "D'esire 204",
    subtitle:
      "SOLD • Chic Urban Oasis • Heart of Zona Romántica",

    priceText: "$470,000 USD",
    facts: [
      { label: "BEDROOMS", value: "1" },
      { label: "BATHROOMS", value: "2" },
      { label: "SPACE", value: "~ 849 SqFt" },
      // { label: "INDOOR/OUTDOOR", value: "Large Terrace" }, 
      // { label: "WALKABILITY 10/10", value: "Dining, nightlife & shopping" },
      // { label: "BEACH", value: "3.5 Blocks" }, 
    ],
    highlights: [
      "\u00A0Walkable lifestyle",
      "\u00A0Indoor/outdoor living",
      "\u00A0Excellent Rental Potential",
      "\u00A0Steps to restaurants, bars, shopping, and galleries",
    ],
    locationBlurb:
      "Heart of Zona Romántica",
    addressOrArea: "Zona Romántica, Puerto Vallarta",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4040.961767114745!2d-105.23755652451321!3d20.604090102228515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8421454c45077437%3A0xa0f020f2975aa55d!2sC.%20Constituci%C3%B3n%20207%2C%20Zona%20Rom%C3%A1ntica%2C%20Emiliano%20Zapata%2C%2048380%20Puerto%20Vallarta%2C%20Jal.!5e1!3m2!1sen!2smx!4v1768694039833!5m2!1sen!2smx",
    photos: [
      { src: "/photos/unit-a/hero.jpg", alt: "Living Space" },
      { src: "/photos/unit-a/01.jpg", alt: "Kitchen" },
      { src: "/photos/unit-a/02.jpg", alt: "Bedroom" },
      { src: "/photos/unit-a/03.jpg", alt: "Bathroom" },
      { src: "/photos/unit-a/04.jpg", alt: "Terrace" },
      { src: "/photos/unit-a/05.jpg", alt: "Rooftop" },
      { src: "/photos/unit-a/06.jpg", alt: "Gym" },
    ],
    mlsLink: "https://www.flexmls.com/share/DJnXn/207-Calle-Constitucion-204-D-esire-JA-Puerto-Vallarta-",
  },

  "zr-1br-terrace-unit-b": {
    slug: "zr-1br-terrace-unit-b",
    title: "1 Bedroom Condo for Sale at Madero 320 #305 in Zona Romántica, Puerto Vallarta",
    subtitle:
      "Luxurious Urban Oasis • Heart of Zona Romántica",
    priceText: "$575,000 USD",
    seoDescription:
    "1-bedroom, 2-bath condo for sale at Madero 320 #305 in Zona Romántica, Puerto Vallarta with ~1,064 sq ft, private terrace, walkable location, and close proximity to the beach.",
    seoIntro:
    "This 1-bedroom, 2-bath condo for sale at Madero 320 #305 offers a rare combination of quiet indoor-outdoor living in the heart of Zona Romántica, Puerto Vallarta. Located just steps from restaurants, galleries, nightlife, and the beach, this furnished residence features approximately 1,064 square feet, upscale finishes, a spacious private terrace, and a layout ideal for full-time living, a second home, or a vacation rental investment. Buyers searching for a condo for sale in Zona Romántica will appreciate the walkable location, quality construction, and strong lock-and-leave appeal.",
    facts: [
      { label: "Bedrooms", value: "1" },
      { label: "Bathrooms", value: "2" },
      { label: "Size", value: "~1064 SqFt" },
      { label: "Indoor/Outdoor", value: "Terrace" },
      { label: "Walkability 10/10", value: "Dining, bars & shopping steps away" },
      { label: "BEACH", value: "3.5 Blocks" }, 
    ],
    highlights: [
      "\u00A0 Hot Zona Romántica location",
      "\u00A0 Indoor-outdoor quiet luxury",
      "\u00A0 Quality finishes • High-end furnishings • Upgrades everywhere",
      "\u00A0 Dining, Galleries & Nightlife — Just Outside Your Door",
    ],
    locationBlurb:
      "Heart of Zona Romántica",
    addressOrArea: "Zona Romántica, Puerto Vallarta",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4040.9569704387213!2d-105.23730752451326!3d20.60427100222244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842145be96b17575%3A0x869c542986cc76d0!2sMadero%20320!5e1!3m2!1sen!2sus!4v1768684814840!5m2!1sen!2sus",
    photos: [
      { src: "/photos/unit-b/hero.jpg", alt: "Living Space" },
      { src: "/photos/unit-b/01.jpg", alt: "Kitchen" },
      { src: "/photos/unit-b/02.jpg", alt: "Bedroom" },
      { src: "/photos/unit-b/03.jpg", alt: "Bathroom" },
      { src: "/photos/unit-b/04.jpg", alt: "Terrace" },
      { src: "/photos/unit-b/05.jpg", alt: "Rooftop" },
      { src: "/photos/unit-b/06.jpg", alt: "Gym" },
    ],
    mlsLink: "https://www.flexmls.com/share/DrH1t/320-Calle-Francisco-I-Madero-305-Madero-320-JA-Puerto-Vallarta-",
  },
};

export function getListing(slug) {
  return LISTINGS[slug] || null;
}
