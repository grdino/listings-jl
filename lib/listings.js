export const LISTINGS = {
  "zr-1br-terrace-unit-a": {
    slug: "zr-1br-terrace-unit-a",
    title: "D'esire 204",
    subtitle:
      "Chic Urban Oasis • Heart of Zona Romántica",

    priceText: "$470,000 USD",
    facts: [
      { label: "BEDROOMS", value: "1" },
      { label: "BATHROOMS", value: "2" },
      { label: "SPACE", value: "~ 849 SqFt" },
  //    { label: "OUTDOOR", value: "Large Terrace" }, 
  //    { label: "WALKABILITY 10/10", value: "Dining, nightlife & shopping" },
  //    { label: "BEACH", value: "Short, flat walk" }, 
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
    title: "Madero 320, #305",
    subtitle:
      "Luxurious Urban Oasis • Heart of Zona Romántica",
    priceText: "$595,000 USD",
    facts: [
      { label: "Bedrooms", value: "1" },
      { label: "Bathrooms", value: "2" },
      { label: "Size", value: "~1064 SqFt" },
  //    { label: "Outdoor", value: "Terrace" },
  //    { label: "Walkability", value: "Dining, bars & shopping steps away" },
  //    { label: "Dining, Galleries & Nightlife — Just Outside Your Door" },
    ],
    highlights: [
      "\u00A0Hot Zona Romántica location",
      "\u00A0Indoor-outdoor quiet luxury",
      "\u00A0Quality finishes • High-end furnishings • Upgrades everywhere",
      "\u00A0Dining, Galleries & Nightlife — Just Outside Your Door",
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
    mlsLink: "https://www.flexmls.com/share/DJorY/320-Calle-Francisco-I-Madero-305-Madero-320-JA-Puerto-Vallarta-",
  },
};

export function getListing(slug) {
  return LISTINGS[slug] || null;
}
