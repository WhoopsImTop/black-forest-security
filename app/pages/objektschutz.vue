<template>
  <div>
    <SectionsPageHero
      :image="heroImages.objektschutz"
      :title="content.title"
      :lead="content.lead"
    />
    <SectionsContentSection
      v-for="section in content.sections"
      :key="section.id"
      :title="section.title"
      :paragraphs="section.paragraphs"
      :centered="section.centered ?? true"
    />
    <SectionsFaqAccordion v-if="content.faq" :items="content.faq" centered />
    <SectionsMoreServicesSlider current-slug="objektschutz" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { objektschutzContent as content } from "~/content/services/objektschutz";

useServicePageSeo(content, "objektschutz", heroImages.objektschutz);
</script>
