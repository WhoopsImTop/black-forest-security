import type { LegalPageContent } from "../types";

export const impressumContent: LegalPageContent = {
  seo: {
    title: "Impressum | Black Forest Security GmbH",
    description: "Impressum der Black Forest Security GmbH, Freiburg im Breisgau.",
  },
  title: "Impressum",
  blocks: [
    {
      type: "p",
      text: "Black Forest Security GmbH\nKaiser-Joseph-Straße 194\n79098 Freiburg im Breisgau",
    },
    { type: "h3", text: "Registereintrag Handelsregister" },
    { type: "p", text: "Amtsgericht Freiburg i. Br. (HRB 731407)" },
    { type: "h3", text: "Vertreten durch" },
    { type: "p", text: "Enrico Stanciu" },
    { type: "h2", text: "Kontakt" },
    {
      type: "p",
      text: "Telefon: 01786375306\nE-Mail: info@black-forest-security.de",
    },
    { type: "h2", text: "Umsatzsteuer-ID" },
    {
      type: "p",
      text: "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\nDE369853072",
    },
    { type: "h2", text: "Angaben zur Berufshaftpflichtversicherung" },
    {
      type: "p",
      text: "Name und Sitz des Versicherers:\nBadischer Gemeinde-Versicherungs-Verband\nDurlacher Allee 56\n76131 Karlsruhe",
    },
    { type: "h2", text: "Redaktionell verantwortlich" },
    { type: "p", text: "Laszlo Bojarski" },
    { type: "h2", text: "EU-Streitschlichtung" },
    {
      type: "p",
      text: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.",
    },
    { type: "h2", text: "Verbraucherstreitbeilegung/Universalschlichtungsstelle" },
    {
      type: "p",
      text: "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    },
  ],
};
