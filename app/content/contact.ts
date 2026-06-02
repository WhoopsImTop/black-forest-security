import type { SeoMeta } from "./types";
import { siteContact } from "./site";

export const kontaktSeo: SeoMeta = {
  title: "Kontakt | Black Forest Security GmbH",
  description:
    "Kontakt zur Black Forest Security GmbH in Freiburg: Kaiser-Joseph-Straße 194, Telefon 0761 55655725, E-Mail info@black-forest-security.de – 24/7 erreichbar.",
};

export const kontaktContent = {
  title: "Kontakt",
  lead: "Wir freuen uns auf Ihre Anfrage. Schreiben Sie uns oder rufen Sie uns an.",
  officeHours: siteContact.officeHours,
  address: {
    street: siteContact.street,
    city: siteContact.city,
  },
  email: siteContact.email,
  phone: siteContact.phone,
};
