<template>
  <div>
    <SectionsPageHero :title="datenschutzContent.title" />
    <section class="bg-white">
      <div class="container mx-auto px-4 section-pad">
        <UiProseContent :blocks="datenschutzContent.blocks" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { datenschutzContent } from "~/content/legal/datenschutz";

usePageSeo({
  title: datenschutzContent.seo.title,
  description: datenschutzContent.seo.description,
  path: "/datenschutzerklaerung",
});
</script>
