<template>
  <div>
    <SectionsPageHero :title="impressumContent.title" />
    <section class="bg-white">
      <div class="container mx-auto px-4 section-pad">
        <UiProseContent :blocks="impressumContent.blocks" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { impressumContent } from "~/content/legal/impressum";

usePageSeo({
  title: impressumContent.seo.title,
  description: impressumContent.seo.description,
  path: "/impressum",
});
</script>
