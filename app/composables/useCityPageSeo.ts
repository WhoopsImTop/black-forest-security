import type { CityPageContent } from "~/content/types";
import {
  buildBreadcrumbSchema,
  buildJsonLdPayloads,
  buildCityServiceSchema,
} from "~/utils/seo/schema";

export function useCityPageSeo(city: CityPageContent, ogImage?: string) {
  const path = `/standorte/${city.slug}`;

  usePageSeo({
    title: city.seo.title,
    description: city.seo.description,
    path,
    ogImage,
    jsonLd: buildJsonLdPayloads(
      [
        buildCityServiceSchema({
          city: city.city,
          region: city.region,
          description: city.seo.description,
          path,
        }),
        buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Standorte", path: "/standorte" },
          { name: city.city, path },
        ]),
      ],
      city.faq,
    ),
  });
}
