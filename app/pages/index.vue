<template>
  <div>
    <SectionsLandingHero
      :image="heroImages.home"
      :title="landingHero.title"
      :lead="landingHero.lead"
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
    <section class="bg-white">
      <div class="container mx-auto px-4 section-pad">
        <div class="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div class="overflow-hidden bg-neutral-100">
            <img
              :src="heroImages.ueberUns"
              alt="Team von Black Forest Security"
              class="h-full w-full object-cover"
              loading="lazy"
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
    <SectionsCtaBand
      title="Bereit für Ihr Sicherheitskonzept?"
      lead="Schreiben Sie uns – wir melden uns zeitnah bei Ihnen."
      label="E-Mail schreiben"
      href="mailto:info@black-forest-security.de"
    />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import {
  landingAboutTeaser,
  landingHero,
  landingSeo,
  landingStats,
  landingTrust,
} from "~/content/landing";

import { buildWebSiteSchema, toJsonLdGraph } from "~/utils/seo/schema";

usePageSeo({
  title: landingSeo.title,
  description: landingSeo.description,
  path: "/",
  ogImage: heroImages.home,
  jsonLd: toJsonLdGraph([buildWebSiteSchema()]),
});

const trustRef = ref(null);
useRevealOnScroll(trustRef, ".reveal");
</script>
