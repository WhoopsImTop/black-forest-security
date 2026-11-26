import type { SeoMeta, TeamMember } from "./types";

export const ueberUnsSeo: SeoMeta = {
  title: "Über uns – Sicherheitsfirma aus Freiburg | Black Forest Security",
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
  { name: "Enrico Stanciu", role: "Geschäftsführer", image: "/img/enrico-stanciu.webp" },
  { name: "Mervan Arslan", role: "Office Management & Buchhaltung", image: "/img/mervan-aslan.webp" },
  { name: "Andy Fischer", role: "Leiter Personal- und Organisationsentwicklung", image: "/img/andy-fischer.webp" },
];

export const teamOnSite = {
  title: "Die Menschen hinter unserem Einsatz",
  lead: "Rund 68 Mitarbeitende bilden unser Team. Hier sehen Sie einen Einblick in die Menschen, die Black Forest Security vor Ort vertreten. Für jedes Objekt werden Aufgaben, Einweisung und Meldewege konkret festgelegt.",
  images: Array.from({ length: 12 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `/img/team/team-portraet-${number}.webp`,
      alt: "Sicherheitsmitarbeiter von Black Forest Security in Freiburg",
    };
  }),
};

export type CompanyValueIcon =
  | "handshake"
  | "scale"
  | "mind"
  | "sprout"
  | "people"
  | "target"
  | "shield"
  | "heart-hand"
  | "summit"
  | "growth";

export interface CompanyValue {
  title: string;
  description: string;
  icon: CompanyValueIcon;
}

export const companyValues: CompanyValue[] = [
  { title: "Respekt", icon: "handshake", description: "Wir begegnen allen Lebewesen mit Respekt, Wertschätzung und Achtsamkeit." },
  { title: "Ehrlichkeit", icon: "scale", description: "Wir handeln offen, transparent und verlässlich." },
  { title: "Weisheit", icon: "mind", description: "Wir lernen kontinuierlich und entwickeln uns weiter." },
  { title: "Selbstdisziplin", icon: "sprout", description: "Wir handeln kontrolliert, verantwortungsbewusst und zuverlässig." },
  { title: "Menschlichkeit", icon: "people", description: "Wir begegnen allen Menschen mit Empathie und Fairness." },
  { title: "Maßvolles Handeln", icon: "target", description: "Wir treffen überlegte und angemessene Entscheidungen." },
  { title: "Schutz der Schwachen", icon: "shield", description: "Wir stehen für Sicherheit und schützen besonders diejenigen, die sich nicht selbst verteidigen können." },
  { title: "Treue", icon: "heart-hand", description: "Wir sind loyal zu Black Forest Security, unseren Kunden und unserem Team." },
  { title: "Tapferkeit und Mut", icon: "summit", description: "Wir zeigen Zivilcourage und übernehmen Verantwortung." },
  { title: "Dem höheren Ziel verpflichtet", icon: "growth", description: "Wir leben diesen Kodex – jeden Tag und mit Überzeugung." },
];
