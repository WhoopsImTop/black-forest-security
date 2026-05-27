<template>
  <div class="mb-10 max-w-2xl">
    <h2 class="font-heading text-2xl font-bold tracking-tight text-black md:text-3xl">
      {{ title }}
    </h2>
    <p v-if="lead" class="mt-4 text-base text-neutral-600">
      {{ lead }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  lead: { type: String, default: undefined },
});
</script>
