export type PartnerLogo = {
  name: string;
  src: string;
  alt: string;
  /** Bereits hell auf dunklem Grund — kein Invert-Filter */
  lightOnDark?: boolean;
};

export const partners: PartnerLogo[] = [
  {
    name: "Siemens",
    src: "/Partner/Siemens.png",
    alt: "Siemens",
    lightOnDark: true,
  },
  {
    name: "HWK Freiburg",
    src: "/Partner/HWK_Freiburg_RGB_S.webp",
    alt: "Handwerkskammer Freiburg",
    lightOnDark: true,
  },
  {
    name: "Landratsamt",
    src: "/Partner/landratsamt.png",
    alt: "Landratsamt",
    lightOnDark: true,
  },
  {
    name: "Skajo",
    src: "/Partner/Logo_Skajo_black_cmyk.png",
    alt: "Skajo",
    lightOnDark: true,
  },
  {
    name: "Bertolds",
    src: "/Partner/logo_bertolds_weiss_gold.svg",
    alt: "Bertolds Cafébar",
    lightOnDark: true,
  },
  {
    name: "Breisgau Center",
    src: "/Partner/breisgau_center_logo_600px.png",
    alt: "Breisgau Center",
    lightOnDark: true,
  },
  {
    name: "D&S",
    src: "/Partner/D%26S_Blau_rgb.png",
    alt: "D&S",
    lightOnDark: true,
  },
  {
    name: "LEMI Freiburg",
    src: "/Partner/images.png",
    alt: "LEMI Freiburg",
    lightOnDark: true,
  },
  {
    name: "FREBURG",
    src: "/Partner/freiburg.svg",
    alt: "FREBURG",
    lightOnDark: true,
  },
];
