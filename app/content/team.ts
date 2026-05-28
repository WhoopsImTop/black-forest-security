import type { SeoMeta, TeamMember } from "./types";

export const ueberUnsSeo: SeoMeta = {
  title: "Über uns | Black Forest Security GmbH",
  description:
    "Das Team der Black Forest Security GmbH in Freiburg – erfahrene Fachkräfte für professionelle Sicherheitsdienstleistungen.",
};

export const teamMembers: TeamMember[] = [
  { name: "Enrico Stancio", role: "Geschäftsführer", image: "/enrico-stancio.jpeg" },
  { name: "Mervan Aslan", role: "Büromanager", image: "/mervan-aslan.jpg" },
  { name: "Andy Fischer", role: "Personalmanagement", image: "/andy-fischer.jpg" },
];
