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
      :centered="section.centered ?? true"
    />
    <SectionsFeatureList v-if="content.features" :items="content.features" />
    <SectionsMoreServicesSlider current-slug="baustellenueberwachung" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { baustellenueberwachungContent as content } from "~/content/services/baustellenueberwachung";

useServicePageSeo(content, "baustellenueberwachung", heroImages.baustellenueberwachung);
</script>
