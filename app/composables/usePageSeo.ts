import { siteMeta } from "~/content/site";
import type { JsonLd } from "~/utils/seo/schema";

export interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  /** Ein Graph oder mehrere JSON-LD-Dokumente (z. B. @graph + separates FAQPage). */
  jsonLd?: JsonLd | JsonLd[] | null;
  robots?: string;
}

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }
  return path.startsWith("/") ? path : `/${path}`;
}

function resolveOgImage(ogImage?: string): string {
  if (!ogImage) {
    return siteMeta.defaultOgImage;
  }
  if (ogImage.startsWith("http")) {
    return ogImage;
  }
  return `${siteMeta.siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;
}

function normalizeJsonLdPayloads(
  jsonLd?: JsonLd | JsonLd[] | null,
): JsonLd[] {
  if (!jsonLd) {
    return [];
  }
  return Array.isArray(jsonLd) ? jsonLd : [jsonLd];
}

export function usePageSeo(options: PageSeoOptions) {
  const path = normalizePath(options.path);
  const canonicalUrl = `${siteMeta.siteUrl}${path === "/" ? "" : path}`;
  const ogImage = resolveOgImage(options.ogImage);
  const jsonLdPayloads = normalizeJsonLdPayloads(options.jsonLd);

  useHead({
    title: options.title,
    htmlAttrs: { lang: "de" },
    link: [{ rel: "canonical", href: canonicalUrl }],
    meta: [
      { name: "description", content: options.description },
      ...(options.robots ? [{ name: "robots", content: options.robots }] : []),
      { property: "og:type", content: options.ogType ?? "website" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:site_name", content: "Black Forest Security GmbH" },
      { property: "og:title", content: options.title },
      { property: "og:description", content: options.description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: options.title },
      { name: "twitter:description", content: options.description },
      { name: "twitter:image", content: ogImage },
    ],
    script: jsonLdPayloads.map((payload, index) => ({
      key: `jsonld-${index}`,
      type: "application/ld+json",
      innerHTML: JSON.stringify(payload),
    })),
  });
}
