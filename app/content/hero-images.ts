/** Fullscreen-Hero-Bilder aus /public/img (WebP, komprimiert) */
export const heroImages = {
  home: "/img/sicherheitsdienst-freiburg.webp",
  homeMobile: "/img/sicherheitsdienst-freiburg-960.webp",
  veranstaltungsschutz: "/img/veranstaltungsschutz-freiburg.webp",
  objektschutz: "/img/objektschutz-freiburg.webp",
  tuersteher: "/img/tuersteher-freiburg.webp",
  baustellenueberwachung: "/img/baustellenueberwachung-freiburg.webp",
  streifenUndRevierdienst: "/img/streifen-revierdienst-freiburg.webp",
  ueberUns: "/img/team-black-forest-security-freiburg.webp",
  kontakt: "/img/kontakt-black-forest-security-freiburg.webp",
  karriere: "/img/karriere-sicherheitsdienst-freiburg.webp",
} as const;

/** JPG-Varianten für og:image (Social-Media-Vorschauen unterstützen WebP nicht überall). */
export const ogImages = {
  home: "/black-forst-security-freiburg-landing.jpg",
  veranstaltungsschutz: "/veranstaltungsschutz.jpg",
  objektschutz: "/objektschutz.jpg",
  tuersteher: "/tuersteher.jpg",
  baustellenueberwachung: "/streifendienst.jpg",
  streifenUndRevierdienst: "/streifen-revierdeinst.jpg",
  ueberUns: "/black-forest-security.jpg",
  kontakt: "/ueber-uns.jpg",
  karriere: "/black-forest-security-2.jpg",
} as const;

/** Alt-Texte für Hero-Bilder */
export const heroAlts = {
  home: "Sicherheitsdienst Black Forest Security im Einsatz in Freiburg",
  veranstaltungsschutz: "Veranstaltungsschutz in Freiburg durch Black Forest Security",
  objektschutz: "Objektschutz in Freiburg – Sicherheitskraft bei der Bewachung",
  tuersteher: "Türsteher von Black Forest Security beim Einlass in Freiburg",
  baustellenueberwachung: "Baustellenbewachung in Freiburg durch Sicherheitspersonal",
  streifenUndRevierdienst: "Streifen- und Revierdienst in Freiburg",
  ueberUns: "Team der Black Forest Security GmbH in Freiburg",
  kontakt: "Kontakt zur Black Forest Security GmbH in Freiburg",
  karriere: "Karriere im Sicherheitsdienst bei Black Forest Security in Freiburg",
} as const;
