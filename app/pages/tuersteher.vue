<template>
  <div>
    <SectionsPageHero
      :image="heroImages.tuersteher"
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
    <SectionsFeatureList v-if="content.features" :items="content.features" />
    <SectionsMoreServicesSlider current-slug="tuersteher" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { tuersteherContent as content } from "~/content/services/tuersteher";

useHead({
  title: content.seo.title,
  meta: [{ name: "description", content: content.seo.description }],
  htmlAttrs: { lang: "de" },
});
</script>
