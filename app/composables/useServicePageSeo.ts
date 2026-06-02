import type { ServicePageContent } from "~/content/types";
import {
  buildBreadcrumbSchema,
  buildJsonLdPayloads,
  buildServiceSchema,
} from "~/utils/seo/schema";

export function useServicePageSeo(
  content: ServicePageContent,
  slug: string,
  ogImage?: string,
) {
  const path = `/${slug}`;

  usePageSeo({
    title: content.seo.title,
    description: content.seo.description,
    path,
    ogImage,
    jsonLd: buildJsonLdPayloads(
      [
        buildServiceSchema({
          name: content.title,
          description: content.seo.description,
          path,
        }),
        buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: content.title, path },
        ]),
      ],
      content.faq,
    ),
  });
}
