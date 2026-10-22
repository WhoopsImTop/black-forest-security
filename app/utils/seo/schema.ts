import { siteContact, siteMeta, siteUrl } from "~/content/site";
import { services } from "~/content/services";
import type { FaqItem } from "~/content/types";

export type JsonLd = Record<string, unknown>;

const organizationId = `${siteUrl}/#organization`;

/** Absolute URL mit abschließendem Slash – identisch zu Canonical und Sitemap. */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") {
    return `${siteUrl}/`;
  }
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${withLeading.endsWith("/") ? withLeading : `${withLeading}/`}`;
}

function areaServedSchema() {
  return siteMeta.areaServed.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  }));
}

/** Basis-Organisation – in jedem Seiten-Graph enthalten für gültige @id-Verweise. */
export function buildOrganizationSchema(): JsonLd {
  return {
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": organizationId,
    name: siteContact.company,
    legalName: siteContact.company,
    url: absoluteUrl("/"),
    logo: siteMeta.logo,
    image: siteMeta.defaultOgImage,
    description: siteMeta.description,
    telephone: siteContact.phoneInternational,
    email: siteContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.street,
      addressLocality: siteContact.addressLocality,
      postalCode: siteContact.postalCode,
      addressRegion: siteContact.region,
      addressCountry: siteContact.country,
    },
    ...(siteMeta.geo ? { geo: { "@type": "GeoCoordinates", ...siteMeta.geo } } : {}),
    hasMap: siteMeta.mapUrl,
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
    areaServed: areaServedSchema(),
    knowsAbout: [
      "Sicherheitsdienst",
      "Wachdienst",
      "Objektschutz",
      "Veranstaltungsschutz",
      "Türsteher",
      "Baustellenbewachung",
      "Revierdienst",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sicherheitsdienstleistungen",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: absoluteUrl(service.to),
        },
      })),
    },
    ...(siteMeta.sameAs.length > 0 ? { sameAs: siteMeta.sameAs } : {}),
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: absoluteUrl("/"),
    name: siteContact.company,
    description: siteMeta.description,
    inLanguage: "de-DE",
    publisher: { "@id": organizationId },
  };
}

export function buildServiceSchema(options: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: JsonLd | JsonLd[];
}): JsonLd {
  const pageUrl = absoluteUrl(options.path);
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: options.name,
    serviceType: options.serviceType ?? options.name,
    description: options.description,
    url: pageUrl,
    provider: { "@id": organizationId },
    areaServed: options.areaServed ?? areaServedSchema(),
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
  const lastPath = items[items.length - 1]?.path ?? "/";
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(lastPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Stadtseiten: Service mit areaServed statt eigenem LocalBusiness.
 * Ohne echtes Büro vor Ort würde ein LocalBusiness mit Freiburger Adresse
 * von Google als irreführender Standort gewertet.
 */
export function buildCityServiceSchema(options: {
  city: string;
  region: string;
  description: string;
  path: string;
}): JsonLd {
  return buildServiceSchema({
    name: `Sicherheitsdienst ${options.city}`,
    serviceType: "Sicherheitsdienst",
    description: options.description,
    path: options.path,
    areaServed: {
      "@type": "City",
      name: options.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: options.region,
      },
    },
  });
}

export function buildArticleSchema(options: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): JsonLd {
  const pageUrl = absoluteUrl(options.path);
  return {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: options.headline,
    description: options.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    image: options.image ?? siteMeta.defaultOgImage,
    inLanguage: "de-DE",
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
  };
}

export function buildContactPageSchema(): JsonLd {
  const pageUrl = absoluteUrl("/kontakt");
  return {
    "@type": "ContactPage",
    "@id": `${pageUrl}#contactpage`,
    url: pageUrl,
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
