<template>
  <div>
    <SectionsPageHero
      :image="heroImages.streifenUndRevierdienst"
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
    <SectionsMoreServicesSlider current-slug="streifen-und-revierdienst" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { streifenRevierdienstContent as content } from "~/content/services/streifen-und-revierdienst";

useHead({
  title: content.seo.title,
  meta: [{ name: "description", content: content.seo.description }],
  htmlAttrs: { lang: "de" },
});
</script>
