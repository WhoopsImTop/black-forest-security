<template>
  <div>
    <SectionsPageHero
      :image="heroImages.karriere"
      :image-mobile="heroImages.karriereMobile"
      :image-alt="heroAlts.karriere"
      :title="karriereContent.title"
      :lead="karriereContent.lead"
    />
    <SectionsContentSection
      :title="karriereContent.sectionTitle"
      :paragraphs="karriereContent.paragraphs"
      centered
    >
      <div class="mt-8">
        <UiButtonLink href="mailto:bewerbung@black-forest-security.de">
          Initiativbewerbung senden
        </UiButtonLink>
      </div>
    </SectionsContentSection>
  </div>
</template>

<script setup>
import { karriereContent, karriereSeo } from "~/content/karriere";
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { buildBreadcrumbSchema, toJsonLdGraph } from "~/utils/seo/schema";

usePageSeo({
  title: karriereSeo.title,
  description: karriereSeo.description,
  path: "/karriere",
  ogImage: ogImages.karriere,
  jsonLd: toJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Karriere", path: "/karriere" },
    ]),
  ]),
});
</script>
