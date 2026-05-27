<template>
  <SectionsPageHero
    section-id="home"
    :image="image"
    :title="title"
    :lead="lead"
    :image-alt="imageAlt"
  >
    <template #actions>
      <UiButtonLink
        to="/#leistungen"
        variant="primary"
        class="!border-white !bg-white !text-black hover:!bg-white/90"
      >
        Leistungen
      </UiButtonLink>
      <UiButtonLink
        to="/kontakt"
        variant="outline"
        class="!border-white/40 !text-white hover:!border-white hover:!bg-white hover:!text-black"
      >
        Kontakt
      </UiButtonLink>
    </template>
  </SectionsPageHero>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  imageAlt: { type: String, default: "Black Forest Security GmbH" },
  title: { type: String, required: true },
  lead: { type: String, required: true },
});
</script>
