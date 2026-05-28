<template>
  <section ref="sectionRef" class="bg-white">
    <div class="container mx-auto px-4 section-pad">
      <div :class="centered ? 'mx-auto max-w-3xl' : ''">
        <UiSectionHeading title="Häufige Fragen" class="reveal" />
        <div class="divide-y divide-neutral-200 border border-neutral-200">
          <details
            v-for="item in items"
            :key="item.question"
            class="reveal group bg-white px-6 py-5"
          >
            <summary
              class="cursor-pointer list-none font-heading text-base font-bold text-black marker:content-none"
            >
              <span class="flex items-start justify-between gap-4">
                {{ item.question }}
                <span
                  class="mt-1 shrink-0 text-neutral-400 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >+</span>
              </span>
            </summary>
            <p class="mt-4 text-sm text-neutral-600">{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  centered: { type: Boolean, default: false },
});

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.08 });
</script>
