<template>
  <div>
    <SectionsLandingHero
      :image="heroImages.home"
      :title="landingHero.title"
      :lead="landingHero.lead"
    />
    <SectionsServicesGrid />
    <SectionsStatsSection :items="landingStats" />
    <section ref="trustRef" class="border-b border-neutral-200 bg-white">
      <div class="container mx-auto px-4 section-pad">
        <UiSectionHeading
          :title="landingTrust.title"
          class="reveal"
        />
        <div class="max-w-3xl space-y-4">
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
    <section class="border-b border-neutral-200 bg-[var(--color-paper)]">
      <div class="container mx-auto px-4 section-pad">
        <UiSectionHeading
          :title="landingAboutTeaser.title"
          :lead="landingAboutTeaser.text"
        />
        <UiButtonLink :to="landingAboutTeaser.ctaTo" variant="outline">
          {{ landingAboutTeaser.ctaLabel }}
        </UiButtonLink>
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

useHead({
  title: landingSeo.title,
  meta: [{ name: "description", content: landingSeo.description }],
  htmlAttrs: { lang: "de" },
});

const trustRef = ref(null);
useRevealOnScroll(trustRef, ".reveal");
</script>
