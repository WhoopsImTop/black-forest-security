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
      :centered="section.centered ?? true"
    />
    <SectionsFeatureList v-if="content.features" :items="content.features" />
    <SectionsMoreServicesSlider current-slug="veranstaltungsschutz" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { veranstaltungsschutzContent as content } from "~/content/services/veranstaltungsschutz";

useServicePageSeo(content, "veranstaltungsschutz", heroImages.veranstaltungsschutz);
</script>
