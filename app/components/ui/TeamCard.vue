<template>
  <article class="border border-neutral-200 bg-white">
    <div class="aspect-1/1 overflow-hidden bg-neutral-100">
      <img
        v-if="image"
        :src="image"
        :alt="`Porträt von ${name}`"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-black text-2xl font-bold tracking-wide text-white"
        aria-hidden="true"
      >
        {{ initials }}
      </div>
    </div>
    <div class="p-6">
      <h3 class="font-heading text-lg font-bold text-black">{{ name }}</h3>
      <p class="mt-2 text-sm text-neutral-600">{{ role }}</p>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: undefined },
});

const initials = computed(() =>
  props.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
);
</script>
