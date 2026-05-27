<template>
  <div>
    <SectionsPageHero
      :image="heroImages.baustellenueberwachung"
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
import { baustellenueberwachungContent as content } from "~/content/services/baustellenueberwachung";

useHead({
  title: content.seo.title,
  meta: [{ name: "description", content: content.seo.description }],
  htmlAttrs: { lang: "de" },
});
</script>
