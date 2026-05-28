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

useHead({
  title: impressumContent.seo.title,
  meta: [{ name: "description", content: impressumContent.seo.description }],
  htmlAttrs: { lang: "de" },
});
</script>
