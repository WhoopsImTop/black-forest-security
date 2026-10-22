<template>
  <div>
    <SectionsPageHero
      :title="kostenRatgeberIntro.title"
      :lead="kostenRatgeberIntro.lead"
    />

    <section class="bg-white">
      <div class="container mx-auto px-4 pb-4">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-6 font-heading text-xl font-bold text-black md:text-2xl">
            Richtwerte: Sicherheitsdienst-Preise im Überblick
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full border border-neutral-200 text-left text-sm">
              <thead class="bg-neutral-50 text-black">
                <tr>
                  <th scope="col" class="px-4 py-3 font-heading font-bold">Leistung</th>
                  <th scope="col" class="px-4 py-3 font-heading font-bold">Richtwert (netto)</th>
                  <th scope="col" class="px-4 py-3 font-heading font-bold">Hinweis</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200 text-neutral-700">
                <tr v-for="row in kostenRichtwerte" :key="row.leistung">
                  <td class="px-4 py-3">
                    <NuxtLink :to="row.to" class="font-medium text-black underline underline-offset-4">
                      {{ row.leistung }}
                    </NuxtLink>
                  </td>
                  <td class="whitespace-nowrap px-4 py-3">{{ row.preis }}</td>
                  <td class="px-4 py-3">{{ row.hinweis }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-4 text-xs text-neutral-500">
            Marktübliche Richtwerte ohne Gewähr, zzgl. MwSt. und ggf. Zuschlägen für Nacht-, Sonn- und
            Feiertagsarbeit. Ihr verbindlicher Preis ergibt sich aus dem individuellen Angebot.
          </p>
        </div>
      </div>
    </section>

    <SectionsContentSection
      v-for="section in kostenRatgeberSections"
      :key="section.id"
      :title="section.title"
      :paragraphs="section.paragraphs"
      centered
    />
    <SectionsTrustSection />
    <SectionsFaqAccordion :items="kostenRatgeberFaq" centered />
    <SectionsCtaBand
      title="Angebot anfragen"
      lead="Beschreiben Sie uns Ihren Einsatz – Sie erhalten ein transparentes Angebot."
      label="Angebot anfragen"
      to="/kontakt/"
    />
  </div>
</template>

<script setup>
import { ogImages } from "~/content/hero-images";
import {
  kostenRatgeberFaq,
  kostenRatgeberIntro,
  kostenRatgeberMeta,
  kostenRatgeberSections,
  kostenRatgeberSeo,
  kostenRichtwerte,
} from "~/content/ratgeber/sicherheitsdienst-kosten";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildJsonLdPayloads,
} from "~/utils/seo/schema";
import { siteUrl } from "~/content/site";

usePageSeo({
  title: kostenRatgeberSeo.title,
  description: kostenRatgeberSeo.description,
  path: kostenRatgeberMeta.path,
  ogType: "article",
  ogImage: ogImages.home,
  jsonLd: buildJsonLdPayloads(
    [
      buildArticleSchema({
        headline: kostenRatgeberIntro.title,
        description: kostenRatgeberSeo.description,
        path: kostenRatgeberMeta.path,
        datePublished: kostenRatgeberMeta.datePublished,
        dateModified: kostenRatgeberMeta.dateModified,
        image: `${siteUrl}${ogImages.home}`,
      }),
      buildBreadcrumbSchema([
        { name: "Startseite", path: "/" },
        { name: "Sicherheitsdienst Kosten", path: kostenRatgeberMeta.path },
      ]),
    ],
    kostenRatgeberFaq,
  ),
});
</script>
