<template>
  <section class="bg-black text-white">
    <div class="container mx-auto px-4 section-pad">
      <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div class="max-w-xl">
          <h2 class="font-heading text-2xl font-bold md:text-3xl">{{ title }}</h2>
          <p v-if="lead" class="mt-4 text-sm text-neutral-400">{{ lead }}</p>
        </div>
        <UiButtonLink
          :to="href ? undefined : to || '/kontakt'"
          :href="href"
          variant="outline"
          class="!border-white/30 !text-white hover:!bg-white hover:!text-black"
        >
          {{ label }}
        </UiButtonLink>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: "Kontakt aufnehmen" },
  lead: {
    type: String,
    default: "Wir beraten Sie gerne zu Ihrem individuellen Sicherheitskonzept.",
  },
  label: { type: String, default: "Kontakt aufnehmen" },
  to: { type: String, default: "" },
  href: { type: String, default: undefined },
});
</script>
