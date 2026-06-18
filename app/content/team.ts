import type { SeoMeta, TeamMember } from "./types";

export const ueberUnsSeo: SeoMeta = {
  title: "Über uns | Black Forest Security GmbH",
  description:
    "Black Forest Security GmbH in Freiburg: erfahrenes Sicherheitsteam mit rund 68 Mitarbeitern für professionelle Schutzdienstleistungen in der Region.",
};

export const ueberUnsIntro = {
  title: "Ihr Sicherheitspartner in Freiburg",
  paragraphs: [
    "Die Black Forest Security GmbH hat ihren Sitz in Freiburg im Breisgau und betreut Kunden in der gesamten Region – von der Ortenau bis zum Hochschwarzwald.",
    "Mit rund 68 Mitarbeitern und eingespielten Einsatzabläufen bieten wir Veranstaltungsschutz, Objektschutz, Türsteherdienste, Baustellenüberwachung und Streifen- und Revierdienst aus einer Hand.",
    "Unser Anspruch: verlässliche Sicherheit, klare Kommunikation mit Auftraggebern und dokumentierte Prozesse, die zu Ihrem Objekt oder Event passen.",
  ],
};

export const teamMembers: TeamMember[] = [
  { name: "Enrico Stanciu", role: "Geschäftsführer", image: "/enrico-stancio.jpeg" },
  { name: "Mervan Aslan", role: "Büromanager", image: "/mervan-aslan.jpg" },
  { name: "Andy Fischer", role: "Personalmanagement", image: "/andy-fischer.jpg" },
];
