<template>
  <section
    :id="sectionId"
    ref="sectionRef"
    class="relative w-full overflow-hidden"
    :class="
      hasImage
        ? 'flex min-h-[65vh] flex-col justify-end'
        : 'bg-white'
    "
  >
    <template v-if="hasImage">
      <img
        :src="image"
        :alt="imageAlt || title"
        class="hero-image absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35"
        aria-hidden="true"
      />
    </template>

    <div
      class="relative z-10 w-full"
      :class="hasImage ? '' : 'container mx-auto px-4 pb-12 pt-28 md:pb-16 md:pt-32'"
    >
      <div :class="hasImage ? 'container mx-auto w-full px-4 pb-12 pt-24 md:pb-16 md:pt-28' : ''">
        <div class="max-w-3xl">
          <h1
            class="hero-title font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            :class="hasImage ? 'text-white' : 'text-black'"
          >
            {{ title }}
          </h1>
          <p
            v-if="lead"
            class="hero-lead mt-6 text-base md:text-lg"
            :class="hasImage ? 'text-white/80' : 'text-neutral-600'"
          >
            {{ lead }}
          </p>
          <div v-if="$slots.actions" class="hero-cta mt-10 flex flex-wrap gap-4">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  image: { type: String, default: undefined },
  imageAlt: { type: String, default: undefined },
  title: { type: String, required: true },
  lead: { type: String, default: undefined },
  sectionId: { type: String, default: undefined },
});

const hasImage = computed(() => Boolean(props.image));

const sectionRef = ref(null);
const prefersReducedMotion = usePrefersReducedMotion();
const { run, gsap } = useGsapContext();

onMounted(() => {
  if (prefersReducedMotion.value || !sectionRef.value) {
    return;
  }

  run(sectionRef.value, () => {
    if (hasImage.value) {
      gsap.from(".hero-image", {
        scale: 1.06,
        duration: 1.4,
        ease: "power2.out",
      });
    }
    gsap.from(".hero-title", { autoAlpha: 0, y: 28, duration: 0.9, ease: "power2.out" });
    gsap.from(".hero-lead", { autoAlpha: 0, y: 20, duration: 0.9, delay: 0.12, ease: "power2.out" });
    gsap.from(".hero-cta", { autoAlpha: 0, y: 16, duration: 0.8, delay: 0.22, ease: "power2.out" });
  });
});
</script>
