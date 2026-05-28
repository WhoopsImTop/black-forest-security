<template>
  <NuxtLink
    :to="service.to"
    class="reveal group flex h-full flex-col overflow-hidden border border-neutral-200 bg-white transition-colors duration-300 hover:border-black"
  >
    <div class="aspect-[16/10] overflow-hidden bg-neutral-100">
      <img
        :src="service.image"
        :alt="service.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 object-top"
        loading="lazy"
      />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="font-heading text-xl font-bold text-black">{{ service.title }}</h3>
      <p class="mt-3 flex-1 text-sm text-neutral-600">{{ service.description }}</p>
      <span class="mt-6 text-sm font-medium text-neutral-900 group-hover:underline">
        Mehr erfahren →
      </span>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  service: { type: Object, required: true },
});
</script>
