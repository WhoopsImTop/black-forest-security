import type { ContentSection, FaqItem, SeoMeta } from "../types";

export const kostenRatgeberMeta = {
  path: "/ratgeber/sicherheitsdienst-kosten",
  datePublished: "2026-10-02",
  dateModified: "2026-10-02",
};

export const kostenRatgeberSeo: SeoMeta = {
  title: "Was kostet ein Sicherheitsdienst? Preise 2026 | Black Forest Security",
  description:
    "Was kostet ein Sicherheitsdienst in Freiburg? Stundensätze für Objektschutz, Events, Türsteher, Baustelle und Revierdienst – alle Kostenfaktoren erklärt.",
};

export const kostenRatgeberIntro = {
  title: "Was kostet ein Sicherheitsdienst in Freiburg?",
  lead: "Stundensätze, Zuschläge und Kostenfaktoren – verständlich erklärt für Unternehmen, Veranstalter und Hausverwaltungen.",
};

/**
 * Marktübliche Richtwerte (netto pro Stunde und Sicherheitskraft).
 * BITTE VOR VERÖFFENTLICHUNG MIT DER EIGENEN KALKULATION ABGLEICHEN.
 */
export const kostenRichtwerte: { leistung: string; preis: string; hinweis: string; to: string }[] = [
  {
    leistung: "Objektschutz / Wachdienst",
    preis: "ca. 25–35 € / Std.",
    hinweis: "stationäre Präsenz, Empfangs- und Pfortendienst",
    to: "/objektschutz/",
  },
  {
    leistung: "Veranstaltungsschutz",
    preis: "ca. 28–40 € / Std.",
    hinweis: "Ordnungsdienst, Einlass, Besucherlenkung",
    to: "/veranstaltungsschutz/",
  },
  {
    leistung: "Türsteher",
    preis: "ca. 30–45 € / Std.",
    hinweis: "Sachkundeprüfung nach § 34a GewO erforderlich",
    to: "/tuersteher/",
  },
  {
    leistung: "Baustellenbewachung",
    preis: "ca. 25–35 € / Std.",
    hinweis: "stationär; mobile Kontrollen meist günstiger",
    to: "/baustellenueberwachung/",
  },
  {
    leistung: "Streifen- und Revierdienst",
    preis: "pro Kontrolle",
    hinweis: "abhängig von Anzahl, Dauer und Uhrzeit der Kontrollen",
    to: "/streifen-und-revierdienst/",
  },
];

export const kostenRatgeberSections: ContentSection[] = [
  {
    id: "abrechnung",
    title: "Wie rechnen Sicherheitsdienste ab?",
    paragraphs: [
      "Die meisten Sicherheitsdienste rechnen pro Stunde und Sicherheitskraft ab. Beim Revierdienst wird dagegen häufig pro Kontrolle oder als Monatspauschale abgerechnet, weil sich mehrere Kunden eine Route teilen.",
      "Für Veranstaltungen gibt es oft Mindesteinsatzzeiten pro Person, da An- und Abreise sowie das Briefing mit eingeplant werden müssen. Für Daueraufträge wie Objektschutz sind Monatspauschalen üblich.",
    ],
  },
  {
    id: "faktoren",
    title: "Diese Faktoren bestimmen den Preis",
    paragraphs: [
      "Qualifikation: Für einfache Bewachungsaufgaben reicht die Unterrichtung nach § 34a GewO. Für Türsteher in Diskotheken, Streifendienste im öffentlichen Verkehrsraum oder Bewachung von Flüchtlingsunterkünften ist die Sachkundeprüfung Pflicht – entsprechend höher ist der Stundensatz.",
      "Einsatzzeiten: Nachtstunden, Sonntage und Feiertage werden mit tariflichen Zuschlägen berechnet. Wer Einsätze flexibel planen kann, spart.",
      "Einsatzdauer und Umfang: Langfristige Aufträge und größere Teams sind pro Stunde meist günstiger als kurze Einzeleinsätze.",
      "Aufgaben und Risiko: Reine Präsenz kostet weniger als Einsätze mit Zutrittskontrolle, Kassen- oder Wertsachenschutz oder erhöhtem Konfliktpotenzial.",
      "Ausrüstung und Technik: Dienstfahrzeuge, Funk, Wächterkontrollsysteme oder Videotechnik können zusätzlich kalkuliert werden.",
    ],
  },
  {
    id: "sparen",
    title: "So senken Sie die Kosten – ohne an Sicherheit zu sparen",
    paragraphs: [
      "Revierdienst statt Dauerbewachung: Für viele Objekte reichen mehrere Kontrollfahrten pro Nacht. Das ist deutlich günstiger als eine dauerhafte Präsenz.",
      "Kombinierte Konzepte: Feste Präsenz zu Kernzeiten, mobile Kontrollen in ruhigen Stunden – so zahlen Sie nur für das, was Sie wirklich brauchen.",
      "Frühzeitig planen: Bei Veranstaltungen lassen sich Personal und Schichten besser kalkulieren, wenn wir früh eingebunden sind.",
    ],
  },
  {
    id: "billig",
    title: "Warum der günstigste Anbieter selten der beste ist",
    paragraphs: [
      "Sehr niedrige Stundensätze lassen sich mit tariflicher Bezahlung, Versicherung, Ausbildung und Einsatzleitung kaum darstellen. Achten Sie darauf, dass Ihr Sicherheitsdienst im Bewacherregister eingetragen ist, seine Mitarbeitenden nach § 34a GewO qualifiziert sind und eine Betriebshaftpflicht nachweisen kann.",
      "Ein seriöser Anbieter erstellt Ihnen ein transparentes Angebot mit klar beschriebenen Leistungen, Einsatzzeiten und Zuschlägen.",
    ],
  },
];

export const kostenRatgeberFaq: FaqItem[] = [
  {
    question: "Was kostet ein Sicherheitsdienst pro Stunde?",
    answer:
      "Marktüblich liegen die Stundensätze je nach Leistung und Qualifikation grob zwischen 25 und 45 € netto pro Sicherheitskraft. Hinzu kommen Zuschläge für Nacht-, Sonn- und Feiertagsarbeit. Ein verbindlicher Preis ergibt sich erst aus Ihrem konkreten Einsatz.",
  },
  {
    question: "Was kostet ein Türsteher für eine private Feier?",
    answer:
      "Für private Feiern wird pro Türsteher und Stunde abgerechnet, häufig mit einer Mindesteinsatzzeit. Für eine Feier mit 100 bis 150 Gästen reichen oft ein bis zwei Türsteher.",
  },
  {
    question: "Wie bekomme ich ein Angebot?",
    answer:
      "Rufen Sie uns unter 0761 3896836 an oder schreiben Sie an info@black-forest-security.de. Nach einem kurzen Gespräch erhalten Sie ein transparentes Angebot.",
  },
];
