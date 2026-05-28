<template>
  <section ref="sectionRef" class="bg-white">
    <div class="container mx-auto px-4 section-pad">
      <UiSectionHeading
        v-if="heading"
        :title="heading"
        :lead="headingLead"
        class="reveal"
      />
      <ol class="grid gap-6 md:grid-cols-2">
        <li
          v-for="item in items"
          :key="item.title"
          class="reveal border border-neutral-200 p-6"
        >
          <h3 class="font-heading text-lg font-bold text-black">{{ item.title }}</h3>
          <p class="mt-3 text-sm text-neutral-600">{{ item.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  heading: { type: String, default: "Leistungen im Detail" },
  headingLead: { type: String, default: undefined },
});

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.12 });
</script>
