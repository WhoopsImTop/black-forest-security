import type { SeoMeta } from "./types";
import { siteContact } from "./site";

export const kontaktSeo: SeoMeta = {
  title: "Kontakt | Black Forest Security GmbH",
  description:
    "Kontaktieren Sie Black Forest Security GmbH in Freiburg – Bürozeiten, Adresse, Telefon und E-Mail.",
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
