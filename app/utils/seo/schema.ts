import { siteContact, siteMeta, siteUrl } from "~/content/site";
import type { FaqItem } from "~/content/types";

export type JsonLd = Record<string, unknown>;

const organizationId = `${siteUrl}/#organization`;

/** Basis-Organisation – in jedem Seiten-Graph enthalten für gültige @id-Verweise. */
export function buildOrganizationSchema(): JsonLd {
  return {
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": organizationId,
    name: siteContact.company,
    url: siteUrl,
    logo: siteMeta.logo,
    image: siteMeta.defaultOgImage,
    description: siteContact.tagline,
    telephone: siteContact.phone,
    email: siteContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.street,
      addressLocality: siteContact.addressLocality,
      postalCode: siteContact.postalCode,
      addressRegion: siteContact.region,
      addressCountry: siteContact.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: siteMeta.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    ...(siteMeta.sameAs.length > 0 ? { sameAs: siteMeta.sameAs } : {}),
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteContact.company,
    description: siteContact.tagline,
    inLanguage: "de-DE",
    publisher: { "@id": organizationId },
  };
}

export function buildServiceSchema(options: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  const pageUrl = `${siteUrl}${options.path}`;
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: options.name,
    description: options.description,
    url: pageUrl,
    provider: { "@id": organizationId },
    areaServed: siteMeta.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}

/** FAQPage als eigenständiges Top-Level-Dokument – von Google zuverlässiger erkannt als nur in @graph. */
export function buildFaqPageSchema(faq: FaqItem[]): JsonLd | null {
  if (!faq.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  const lastPath = items[items.length - 1]?.path ?? "";
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${lastPath === "/" ? "" : lastPath}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function buildLocalBusinessForCity(options: {
  city: string;
  region: string;
  description: string;
  path: string;
}): JsonLd {
  const pageUrl = `${siteUrl}${options.path}`;
  return {
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name: `${siteContact.company} – ${options.city}`,
    description: options.description,
    url: pageUrl,
    parentOrganization: { "@id": organizationId },
    telephone: siteContact.phone,
    email: siteContact.email,
    image: siteMeta.defaultOgImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.street,
      addressLocality: siteContact.addressLocality,
      postalCode: siteContact.postalCode,
      addressRegion: siteContact.region,
      addressCountry: siteContact.country,
    },
    areaServed: {
      "@type": "City",
      name: options.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: options.region,
      },
    },
  };
}

export function buildContactPageSchema(): JsonLd {
  return {
    "@type": "ContactPage",
    "@id": `${siteUrl}/kontakt#contactpage`,
    url: `${siteUrl}/kontakt`,
    name: "Kontakt",
    description: "Kontakt zur Black Forest Security GmbH in Freiburg",
    mainEntity: { "@id": organizationId },
  };
}

/** Ein @graph mit Organisation + Seiten-Schemas (ohne FAQPage). */
export function toJsonLdGraph(schemas: (JsonLd | null)[]): JsonLd {
  const pageNodes = schemas.filter((s): s is JsonLd => s !== null);
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationSchema(), ...pageNodes],
  };
}

/**
 * Liefert ein oder zwei JSON-LD-Skripte: Haupt-@graph (+ optional separates FAQPage).
 * Getrenntes FAQPage verbessert die Erkennung im Google Rich-Results-Test.
 */
export function buildJsonLdPayloads(
  pageSchemas: (JsonLd | null)[],
  faq?: FaqItem[] | null,
): JsonLd[] {
  const nonFaqSchemas = pageSchemas.filter((s): s is JsonLd => s !== null);
  const payloads: JsonLd[] = [toJsonLdGraph(nonFaqSchemas)];

  if (faq?.length) {
    const faqSchema = buildFaqPageSchema(faq);
    if (faqSchema) {
      payloads.push(faqSchema);
    }
  }

  return payloads;
}
