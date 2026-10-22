<template>
  <div>
    <SectionsPageHero
      :image="image"
      :image-alt="imageAlt"
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
    <SectionsTrustSection />
    <SectionsFaqAccordion v-if="content.faq" :items="content.faq" centered />
    <SectionsServiceAreas />
    <SectionsMoreServicesSlider :current-slug="slug" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
defineProps({
  content: { type: Object, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: undefined },
});
</script>
