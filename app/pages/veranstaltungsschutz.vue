<template>
  <div>
    <SectionsPageHero
      :image="heroImages.veranstaltungsschutz"
      :title="content.title"
      :lead="content.lead"
    />
    <SectionsContentSection
      v-for="section in content.sections"
      :key="section.id"
      :title="section.title"
      :paragraphs="section.paragraphs"
    />
    <SectionsFeatureList v-if="content.features" :items="content.features" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { veranstaltungsschutzContent as content } from "~/content/services/veranstaltungsschutz";

useHead({
  title: content.seo.title,
  meta: [{ name: "description", content: content.seo.description }],
  htmlAttrs: { lang: "de" },
});
</script>
