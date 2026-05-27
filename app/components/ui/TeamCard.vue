<template>
  <article class="border border-neutral-200 bg-white p-8">
    <div
      class="mb-6 flex h-20 w-20 items-center justify-center bg-black text-lg font-bold tracking-wide text-white"
      aria-hidden="true"
    >
      {{ initials }}
    </div>
    <h3 class="font-heading text-lg font-bold text-black">{{ name }}</h3>
    <p class="mt-2 text-sm text-neutral-600">{{ role }}</p>
  </article>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  role: { type: String, required: true },
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
