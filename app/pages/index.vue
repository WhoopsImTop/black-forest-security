<template>
  <div>
    <SectionsLandingHero
      :image="heroImages.home"
      :image-mobile="heroImages.homeMobile"
      :image-alt="heroAlts.home"
      :title="landingHero.title"
      :lead="landingHero.lead"
    />
    <SectionsPartnerParade />
    <SectionsContentSection
      :title="landingIntro.title"
      :paragraphs="landingIntro.paragraphs"
      centered
    />
    <SectionsServicesGrid />

    <section ref="trustRef" class="bg-white">
      <div class="container mx-auto max-w-3xl text-center px-4 section-pad">
        <UiSectionHeading :title="landingTrust.title" class="reveal" />
        <div class="space-y-4">
          <p
            v-for="(paragraph, index) in landingTrust.paragraphs"
            :key="index"
            class="reveal text-base text-neutral-600"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>
    <SectionsStatsSection :items="landingStats" />
    <SectionsFeatureList
      :items="landingIndustries"
      heading="Sicherheitslösungen für jede Branche"
      heading-lead="Wir schützen Unternehmen, Veranstalter und Eigentümer in Freiburg mit Konzepten, die zu ihrem Alltag passen."
    />
    <SectionsTrustSection />
    <SectionsFeatureList
      :items="landingProcess"
      heading="So arbeiten wir"
      heading-lead="In vier Schritten zu Ihrem Sicherheitskonzept."
    />

    <section class="bg-neutral-50">
      <div class="container mx-auto px-4 section-pad">
        <div class="mx-auto max-w-5xl">
          <UiSectionHeading :title="landingDistricts.title" :lead="landingDistricts.lead" />
          <p
            v-for="(paragraph, index) in landingDistricts.paragraphs"
            :key="index"
            class="mb-8 max-w-3xl text-base text-neutral-600"
          >
            {{ paragraph }}
          </p>
          <h3 class="mb-3 font-heading text-base font-bold text-black">Freiburger Stadtteile</h3>
          <ul class="mb-8 flex flex-wrap gap-2 text-sm text-neutral-700">
            <li
              v-for="district in landingDistricts.districts"
              :key="district"
              class="border border-neutral-200 bg-white px-3 py-1"
            >
              {{ district }}
            </li>
          </ul>
          <h3 class="mb-3 font-heading text-base font-bold text-black">Umland von Freiburg</h3>
          <ul class="mb-8 flex flex-wrap gap-2 text-sm text-neutral-700">
            <li
              v-for="place in landingDistricts.surroundings"
              :key="place"
              class="border border-neutral-200 bg-white px-3 py-1"
            >
              {{ place }}
            </li>
          </ul>
          <h3 class="mb-3 font-heading text-base font-bold text-black">Weitere Standorte in Südbaden</h3>
          <ul class="flex flex-wrap gap-3">
            <li v-for="city in cityPages" :key="city.slug">
              <NuxtLink
                :to="`/standorte/${city.slug}/`"
                class="inline-block border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 transition-colors hover:border-black"
              >
                Sicherheitsdienst {{ city.city }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="container mx-auto px-4 section-pad">
        <div class="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div class="overflow-hidden bg-neutral-100">
            <img
              :src="heroImages.ueberUns"
              :alt="heroAlts.ueberUns"
              class="h-full w-full object-cover"
              width="1920"
              height="823"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <UiSectionHeading
              :title="landingAboutTeaser.title"
              :lead="landingAboutTeaser.text"
            />
            <UiButtonLink :to="landingAboutTeaser.ctaTo" variant="outline">
              {{ landingAboutTeaser.ctaLabel }}
            </UiButtonLink>
          </div>
        </div>
      </div>
    </section>
    <SectionsFaqAccordion :items="landingFaq" centered />
    <SectionsContentSection centered>
      <p class="text-center text-sm text-neutral-600">
        Mehr zu Preisen und Kostenfaktoren:
        <NuxtLink
          to="/ratgeber/sicherheitsdienst-kosten/"
          class="font-medium text-black underline underline-offset-4"
        >
          Was kostet ein Sicherheitsdienst in Freiburg?
        </NuxtLink>
      </p>
    </SectionsContentSection>
    <SectionsCtaBand
      title="Bereit für Ihr Sicherheitskonzept?"
      lead="Schreiben Sie uns – wir melden uns zeitnah bei Ihnen."
      label="E-Mail schreiben"
      href="mailto:info@black-forest-security.de"
    />
  </div>
</template>

<script setup>
import { cityPages } from "~/content/cities";
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import {
  landingAboutTeaser,
  landingDistricts,
  landingFaq,
  landingHero,
  landingIndustries,
  landingIntro,
  landingProcess,
  landingSeo,
  landingStats,
  landingTrust,
} from "~/content/landing";

import {
  buildJsonLdPayloads,
  buildWebSiteSchema,
} from "~/utils/seo/schema";

usePageSeo({
  title: landingSeo.title,
  description: landingSeo.description,
  path: "/",
  ogImage: ogImages.home,
  jsonLd: buildJsonLdPayloads([buildWebSiteSchema()], landingFaq),
});

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: heroImages.home,
      imagesrcset: `${heroImages.homeMobile} 960w, ${heroImages.home} 1920w`,
      imagesizes: "100vw",
      fetchpriority: "high",
    },
  ],
});

const trustRef = ref(null);
useRevealOnScroll(trustRef, ".reveal");
</script>
