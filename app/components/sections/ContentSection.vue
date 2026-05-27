<template>
  <section ref="sectionRef" class="border-b border-neutral-200 bg-[var(--color-paper)]">
    <div class="container mx-auto px-4 section-pad">
      <div class="max-w-3xl">
        <h2
          v-if="title"
          class="reveal mb-6 font-heading text-xl font-bold text-black md:text-2xl"
        >
          {{ title }}
        </h2>
        <div class="space-y-4">
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="index"
            class="reveal text-base text-neutral-600"
          >
            {{ paragraph }}
          </p>
        </div>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: undefined },
  paragraphs: { type: Array, default: () => [] },
});

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal");
</script>
