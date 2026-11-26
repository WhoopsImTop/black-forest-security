<template>
  <section ref="sectionRef" class="bg-neutral-50">
    <div class="container mx-auto px-4 section-pad">
      <UiSectionHeading class="reveal" :title="team.title" :lead="team.lead" />
      <ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6">
        <li
          v-for="image in team.images"
          :key="image.src"
          class="reveal group aspect-[3/4] overflow-hidden border border-neutral-200 bg-neutral-100"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            width="600"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </li>
      </ul>

      <div id="unternehmenskodex" class="mt-20 scroll-mt-24">
        <UiSectionHeading
          class="reveal"
          title="Unser Unternehmenskodex"
          lead="Zehn Grundwerte, die unser Handeln im Einsatz und im Team prägen."
        />
        <ol class="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <li
            v-for="value in values"
            :key="value.title"
            class="reveal border border-neutral-200 bg-white p-6"
          >
            <UiValueIcon :name="value.icon" class="h-7 w-7 text-black" aria-hidden="true" />
            <h3 class="mt-4 font-heading text-base font-bold text-black">{{ value.title }}</h3>
            <p class="mt-2 text-sm text-neutral-600">{{ value.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  team: { type: Object, required: true },
  values: { type: Array, required: true },
});

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.05 });
</script>
