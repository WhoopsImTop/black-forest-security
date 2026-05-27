import type { SeoMeta } from "./types";

export const landingSeo: SeoMeta = {
  title: "Black Forest Security GmbH – Ihr Partner für Sicherheit und Schutz",
  description:
    "Professionelle Sicherheitsdienste in Freiburg: Veranstaltungsschutz, Objektschutz, Türsteher, Baustellenüberwachung und Streifen- und Revierdienst.",
};

export const landingHero = {
  title: "Black Forest Security GmbH",
  lead: "Ihr Partner für Sicherheit und Schutz – professionelle Sicherheitslösungen in Freiburg und der Region, diskret, zuverlässig und individuell auf Ihre Anforderungen abgestimmt.",
};

export const landingStats = [
  { value: 68, label: "Mitarbeiter" },
  { value: 200, label: "Zufriedene Kunden" },
  { value: 5, label: "Jahre Erfahrung" },
] as const;

export const landingTrust = {
  title: "Sicherheit mit Erfahrung",
  paragraphs: [
    "Mit fundiertem Fachwissen, geschultem Personal und maßgeschneiderten Konzepten schützen wir Ihre Veranstaltungen, Objekte und Baustellen.",
    "Von der Planung bis zur Umsetzung begleiten wir Sie als verlässlicher Partner – regional verwurzelt in Freiburg, professionell in der gesamten Branche vernetzt.",
  ],
};

export const landingAboutTeaser = {
  title: "Über uns",
  text: "Lernen Sie das Team hinter Black Forest Security kennen – erfahrene Fachkräfte mit dem Anspruch, höchste Sicherheitsstandards zu gewährleisten.",
  ctaLabel: "Team kennenlernen",
  ctaTo: "/ueber-uns",
};
