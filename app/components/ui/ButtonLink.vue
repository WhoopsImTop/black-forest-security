<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-300"
    :class="[variantClass, $attrs.class]"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase transition-colors duration-300"
    :class="[variantClass, $attrs.class]"
  >
    <slot />
  </a>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

const props = defineProps({
  to: { type: String, default: undefined },
  href: { type: String, default: undefined },
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "outline"].includes(v),
  },
});

const variantClass = computed(() =>
  props.variant === "primary"
    ? "bg-black text-white hover:bg-neutral-800"
    : "border border-black/20 bg-transparent text-black hover:border-black hover:bg-black hover:text-white",
);
</script>
