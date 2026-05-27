import { heroImages } from "../hero-images";
import type { ServiceSummary } from "../types";

export const services: ServiceSummary[] = [
  {
    slug: "veranstaltungsschutz",
    title: "Veranstaltungsschutz",
    description:
      "Individuelle Sicherheitskonzepte von der Planung bis zur Umsetzung – für Events jeder Größe.",
    to: "/veranstaltungsschutz",
    image: heroImages.veranstaltungsschutz,
  },
  {
    slug: "objektschutz",
    title: "Objektschutz",
    description:
      "Zuverlässiger Schutz für Gebäude und Grundstücke – präzise, hingebungsvoll und maßgeschneidert.",
    to: "/objektschutz",
    image: heroImages.objektschutz,
  },
  {
    slug: "tuersteher",
    title: "Türsteher",
    description:
      "Professioneller Einlass, Gästelistenkontrolle und sicheres Störungsmanagement für Ihre Veranstaltung.",
    to: "/tuersteher",
    image: heroImages.tuersteher,
  },
  {
    slug: "baustellenueberwachung",
    title: "Baustellenüberwachung",
    description:
      "Patrouillen, Zugangskontrolle und schnelle Reaktion – damit Ihr Bauprojekt geschützt bleibt.",
    to: "/baustellenueberwachung",
    image: heroImages.baustellenueberwachung,
  },
  {
    slug: "streifen-und-revierdienst",
    title: "Streifen- und Revierdienst",
    description:
      "Kontinuierliche Überwachung Ihres Geländes durch erfahrene Sicherheitskräfte.",
    to: "/streifen-und-revierdienst",
    image: heroImages.streifenUndRevierdienst,
  },
];
