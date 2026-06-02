import type { SeoMeta } from "./types";

export const landingSeo: SeoMeta = {
  title: "Sicherheitsdienst Freiburg & Region | Black Forest Security GmbH",
  description:
    "Sicherheitsdienst in Freiburg und Südbaden: Veranstaltungsschutz, Objektschutz, Türsteher, Baustellenüberwachung und Revierdienst – 24/7 erreichbar.",
};

export const landingHero = {
  title: "Sicherheitsdienst Freiburg & Region",
  lead: "Black Forest Security GmbH – Ihr Partner für Veranstaltungsschutz, Objektschutz, Türsteher, Baustellenüberwachung und Streifen- und Revierdienst in Freiburg, der Ortenau und im Südbaden.",
};

export const landingStats = [
  { value: 68, label: "Mitarbeiter" },
  { value: 200, label: "Zufriedene Kunden" },
  { value: 5, label: "Jahre Erfahrung" },
] as const;

export const landingTrust = {
  title: "Sicherheit mit Erfahrung",
  paragraphs: [
    "Als Sicherheitsdienst in Freiburg schützen wir mit geschultem Personal und maßgeschneiderten Konzepten Ihre Veranstaltungen, Objekte und Baustellen – von der Planung bis zur Umsetzung.",
    "Regional verwurzelt, deutschlandweit vernetzt: Über unsere Standortseiten finden Sie lokale Ansprechpartner in Freiburg, Offenburg, Lörrach und weiteren Städten in der Region.",
  ],
};

export const landingAboutTeaser = {
  title: "Über uns",
  text: "Lernen Sie das Team hinter Black Forest Security kennen – erfahrene Fachkräfte mit dem Anspruch, höchste Sicherheitsstandards zu gewährleisten.",
  ctaLabel: "Team kennenlernen",
  ctaTo: "/ueber-uns",
};
