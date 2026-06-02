<template>
  <div>
    <SectionsPageHero
      :image="heroImages.karriere"
      title="Standorte in der Region"
      lead="Lokale Sicherheitsdienstleistungen für Städte rund um Freiburg und den Südwesten."
    />

    <section class="bg-white">
      <div class="container mx-auto px-4 section-pad">
        <UiSectionHeading
          :title="standorteIntro.title"
          :lead="standorteIntro.lead"
        />
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="city in pilotCities"
            :key="city.slug"
            :to="`/standorte/${city.slug}`"
            class="group border border-neutral-200 bg-white p-6 transition-colors hover:border-black"
          >
            <h3 class="font-heading text-xl font-bold text-black">
              {{ city.city }}
            </h3>
            <p class="mt-2 text-sm text-neutral-600">{{ city.region }}</p>
            <span
              class="mt-6 inline-block text-sm font-medium text-neutral-900 group-hover:underline"
            >
              Stadtseite ansehen →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { cityPages, cityPilotSlugs } from "~/content/cities";
import { heroImages } from "~/content/hero-images";
import { standorteIntro, standorteSeo } from "~/content/standorte-seo";
import { buildBreadcrumbSchema, toJsonLdGraph } from "~/utils/seo/schema";

const pilotCities = computed(() =>
  cityPages.filter((city) => cityPilotSlugs.includes(city.slug)),
);

usePageSeo({
  title: standorteSeo.title,
  description: standorteSeo.description,
  path: "/standorte",
  ogImage: heroImages.karriere,
  jsonLd: toJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Standorte", path: "/standorte" },
    ]),
  ]),
});
</script>
