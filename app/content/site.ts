export const siteUrl = "https://www.black-forest-security.de";

export const siteContact = {
  company: "Black Forest Security GmbH",
  tagline: "Ihr Partner für Sicherheit und Schutz",
  street: "Kaiser-Joseph-Straße 194",
  city: "79098 Freiburg",
  postalCode: "79098",
  addressLocality: "Freiburg im Breisgau",
  region: "Baden-Württemberg",
  country: "DE",
  email: "info@black-forest-security.de",
  phone: "0761 3896836",
  phoneFloating: "0761 3896836",
  phoneImpressum: "0761 3896836",
  officeHours: ["Mo - So: rund um die Uhr"],
} as const;

export const siteMeta = {
  siteUrl,
  logo: `${siteUrl}/black-forest-security-logo.png`,
  defaultOgImage: `${siteUrl}/black-forest-security.jpg`,
  sameAs: [] as string[],
  areaServed: [
    "Freiburg im Breisgau",
    "Südbaden",
    "Ortenau",
    "Breisgau-Hochschwarzwald",
  ],
} as const;
