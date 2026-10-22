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
  /** E.164-Format für strukturierte Daten */
  phoneInternational: "+49 761 3896836",
  phoneFloating: "0761 3896836",
  phoneImpressum: "0761 3896836",
  officeHours: ["Mo - So: rund um die Uhr"],
} as const;

export const siteMeta = {
  siteUrl,
  description:
    "Sicherheitsdienst aus Freiburg im Breisgau: Objektschutz, Veranstaltungsschutz, Türsteher, Baustellenbewachung sowie Streifen- und Revierdienst in Südbaden – 24/7 erreichbar.",
  logo: `${siteUrl}/black-forest-security-logo.png`,
  defaultOgImage: `${siteUrl}/black-forest-security.jpg`,
  /** Google-Unternehmensprofil (CID) */
  mapUrl: "https://maps.google.com/?cid=6260288871703875766",
  /**
   * Exakte Koordinaten des Büros (z. B. aus dem Google-Unternehmensprofil).
   * Erst eintragen, wenn sie geprüft sind – ungenaue Werte schaden mehr als sie nützen.
   */
  geo: null as { latitude: number; longitude: number } | null,
  /**
   * Offizielle Profile: Google-Unternehmensprofil, Instagram, TikTok, LinkedIn, Facebook …
   * Wichtig für Entity-Zuordnung und Knowledge Panel.
   */
  sameAs: [
    "https://maps.google.com/?cid=6260288871703875766",
    "https://www.instagram.com/black_forest_security/",
  ] as string[],
  areaServed: [
    "Freiburg im Breisgau",
    "Südbaden",
    "Ortenau",
    "Breisgau-Hochschwarzwald",
    "Landkreis Emmendingen",
    "Landkreis Lörrach",
  ],
} as const;

/**
 * Vertrauenssignale – nur ausgefüllte Felder werden auf der Website angezeigt.
 * Bitte ausschließlich belegbare Angaben eintragen.
 */
export const siteTrust = {
  /** Registrierungsnummer im Bewacherregister */
  bewacherregisterNr: "",
  /** z. B. "IHK Südlicher Oberrhein" */
  ihkMitgliedschaft: "",
  /** z. B. "5 Mio. €" */
  haftpflichtDeckungssumme: "",
  /** z. B. ["DIN 77200", "ISO 9001"] */
  zertifikate: [] as string[],
  /** z. B. ["BDSW"] */
  verbaende: [] as string[],
};
