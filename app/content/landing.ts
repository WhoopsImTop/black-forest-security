import type { FaqItem, FeatureItem, SeoMeta } from "./types";

export const landingSeo: SeoMeta = {
  title: "Sicherheitsdienst Freiburg 24/7 | Black Forest Security",
  description:
    "Sicherheitsdienst in Freiburg: Objektschutz, Veranstaltungsschutz, Türsteher, Baustellenbewachung und Revierdienst – §34a-qualifiziert, 24/7 erreichbar.",
};

export const landingHero = {
  title: "Sicherheitsdienst Freiburg & Region",
  lead: "Black Forest Security GmbH – Ihr Partner für Veranstaltungsschutz, Objektschutz, Türsteher, Baustellenüberwachung und Streifen- und Revierdienst in Freiburg, der Ortenau und im Südbaden.",
};

export const landingIntro = {
  title: "Ihr Sicherheitsdienst in Freiburg im Breisgau",
  paragraphs: [
    "Die Black Forest Security GmbH ist ein Sicherheitsdienst mit Sitz in der Freiburger Innenstadt. Als regionale Sicherheitsfirma schützen wir Unternehmen, Veranstalter, Hausverwaltungen, Bauherren und öffentliche Auftraggeber in Freiburg und ganz Südbaden – rund um die Uhr.",
    "Ob Wachdienst für Ihr Firmengelände, Security für ein Stadtfest, Türsteher für Ihren Club oder Bewachung Ihrer Baustelle: Wir entwickeln ein Sicherheitskonzept, das zu Ihrem Objekt, Ihren Abläufen und Ihrem Budget passt, und setzen es mit geschultem Personal zuverlässig um.",
  ],
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
    "Durch kurze Wege, regionale Ortskenntnis und eingespielte Prozesse können wir in Freiburg schnell auf neue Lagen reagieren und Maßnahmen direkt nachschärfen. Sie haben feste Ansprechpartner und erhalten eine saubere Dokumentation aller relevanten Vorkommnisse.",
  ],
};

export const landingDistricts = {
  title: "Einsatzgebiete in Freiburg und Umgebung",
  lead: "Wir sind in allen Freiburger Stadtteilen und im gesamten Umland im Einsatz.",
  districts: [
    "Altstadt",
    "Wiehre",
    "Herdern",
    "Neuburg",
    "Stühlinger",
    "Brühl",
    "Industriegebiet Nord",
    "Zähringen",
    "Haslach",
    "Haid",
    "Weingarten",
    "Rieselfeld",
    "Vauban",
    "St. Georgen",
    "Betzenhausen",
    "Mooswald",
    "Landwasser",
    "Lehen",
    "Littenweiler",
    "Ebnet",
    "Kappel",
    "Hochdorf",
    "Tiengen",
    "Opfingen",
    "Munzingen",
  ],
  surroundings: [
    "Gundelfingen",
    "Denzlingen",
    "Umkirch",
    "March",
    "Gottenheim",
    "Merzhausen",
    "Au",
    "Kirchzarten",
    "Ebringen",
    "Schallstadt",
    "Breisach",
    "Teningen",
  ],
  paragraphs: [
    "Ob Einzelhandel in der Innenstadt, Gewerbe im Industriegebiet Nord und auf der Haid, Wohnanlagen im Rieselfeld oder Veranstaltungen rund um Messe und Universität: Wir kennen die Anforderungen vor Ort und planen Einsätze entsprechend.",
  ],
};

export const landingIndustries: FeatureItem[] = [
  {
    title: "Gastronomie, Clubs & Bars",
    description:
      "Türsteher, Einlass- und Jugendschutzkontrollen sowie Präsenz im Innenbereich – freundlich und konsequent.",
  },
  {
    title: "Einzelhandel & Einkaufszentren",
    description:
      "Präsenz auf der Fläche, Kontrollgänge, Schließdienst und Unterstützung bei Hausverboten.",
  },
  {
    title: "Veranstalter & Vereine",
    description:
      "Ordnungsdienst, Einlass, Besucherlenkung und Sicherheitskonzepte für Feste, Konzerte und Firmenevents.",
  },
  {
    title: "Bauunternehmen & Bauherren",
    description:
      "Baustellenbewachung gegen Diebstahl und Vandalismus – stationär oder mit mobilen Kontrollen.",
  },
  {
    title: "Hausverwaltungen & Wohnanlagen",
    description:
      "Revierdienst, Kontrollen von Tiefgaragen und Gemeinschaftsflächen sowie Leerstandsschutz.",
  },
  {
    title: "Industrie, Gewerbe & öffentliche Auftraggeber",
    description:
      "Objektschutz, Pforten- und Empfangsdienst sowie Zutrittskontrolle für Betriebs- und Verwaltungsgebäude.",
  },
];

export const landingProcess: FeatureItem[] = [
  {
    title: "1. Anfrage",
    description:
      "Sie schildern uns telefonisch, per E-Mail oder Chat Ihr Anliegen. Wir melden uns zeitnah zurück.",
  },
  {
    title: "2. Bedarfsanalyse",
    description:
      "Wir klären Objekt, Veranstaltung, Zeiten und Risiken – bei Bedarf mit einer Besichtigung vor Ort.",
  },
  {
    title: "3. Konzept & Angebot",
    description:
      "Sie erhalten ein transparentes Angebot mit Personaleinsatz, Aufgaben und Einsatzzeiten.",
  },
  {
    title: "4. Einsatz & Dokumentation",
    description:
      "Eingewiesene Sicherheitskräfte übernehmen den Einsatz. Vorkommnisse werden dokumentiert und gemeldet.",
  },
];

export const landingFaq: FaqItem[] = [
  {
    question: "Welche Leistungen bietet Black Forest Security in Freiburg an?",
    answer:
      "Wir bieten Objektschutz, Veranstaltungsschutz, Türsteher, Baustellenüberwachung sowie Streifen- und Revierdienst an – einzeln oder als kombiniertes Sicherheitskonzept.",
  },
  {
    question: "Was kostet ein Sicherheitsdienst in Freiburg?",
    answer:
      "Die Kosten hängen von Leistung, Einsatzzeiten, Personalstärke und Qualifikation ab. Sicherheitsdienste rechnen meist pro Stunde und Sicherheitskraft ab, der Revierdienst häufig pro Kontrolle. Einen Überblick über alle Kostenfaktoren finden Sie in unserem Ratgeber „Was kostet ein Sicherheitsdienst?“.",
  },
  {
    question: "Wie schnell können Sie in Freiburg starten?",
    answer:
      "Je nach Einsatzart können wir kurzfristige Termine realisieren. Für regelmäßige Einsätze planen wir gemeinsam einen festen Starttermin inklusive Verantwortlichkeiten und Kommunikationswegen.",
  },
  {
    question: "Bieten Sie auch Nacht- und Wochenenddienste an?",
    answer:
      "Ja, wir decken Einsätze rund um die Uhr ab, inklusive Wochenenden und Feiertagen. Dabei berücksichtigen wir objektspezifische Ruhezeiten und sensible Zeitfenster.",
  },
  {
    question: "Sind Ihre Sicherheitskräfte nach § 34a GewO qualifiziert?",
    answer:
      "Ja. Alle Einsatzkräfte verfügen über die für ihre Tätigkeit vorgeschriebene Unterrichtung oder Sachkundeprüfung nach § 34a Gewerbeordnung und sind im Bewacherregister erfasst.",
  },
  {
    question: "Welche Leistungen werden in Freiburg am häufigsten gebucht?",
    answer:
      "Besonders gefragt sind Objektschutz, Veranstaltungsschutz, Kontrollgänge außerhalb der Geschäftszeiten und kombinierte Konzepte mit Zutrittskontrolle und Revierdienst.",
  },
  {
    question: "Sind Sie auch außerhalb von Freiburg im Einsatz?",
    answer:
      "Ja. Neben Freiburg betreuen wir Kunden unter anderem in Emmendingen, Waldkirch, Offenburg, Lörrach, Weil am Rhein, Bad Krozingen und Titisee-Neustadt.",
  },
  {
    question: "Wie erreiche ich Sie am schnellsten?",
    answer:
      "Telefonisch unter 0761 3896836 – wir sind 24/7 erreichbar. Alternativ per E-Mail an info@black-forest-security.de oder über den Chat auf unserer Website.",
  },
];

export const landingAboutTeaser = {
  title: "Über uns",
  text: "Lernen Sie das Team hinter Black Forest Security kennen – erfahrene Fachkräfte mit dem Anspruch, höchste Sicherheitsstandards zu gewährleisten.",
  ctaLabel: "Team kennenlernen",
  ctaTo: "/ueber-uns/",
};
