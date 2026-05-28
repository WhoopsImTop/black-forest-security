<template>
  <section ref="sectionRef" class="bg-white">
    <div class="container mx-auto px-4 py-16 md:py-20">
      <div class="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-8 ">
        <div
          v-for="(stat, index) in items"
          :key="stat.label"
          class="reveal text-center"
        >
          <p
            class="stat-value font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl"
            :data-target="stat.value"
            :data-index="index"
          >
            &gt;{{ displayValues[index] }}
          </p>
          <p class="mt-3 text-sm text-neutral-500 md:text-base">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },
});

const sectionRef = ref(null);
const displayValues = ref(props.items.map(() => 0));
const prefersReducedMotion = usePrefersReducedMotion();
const { run, gsap } = useGsapContext();

useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.08, y: 16 });

onMounted(() => {
  if (prefersReducedMotion.value) {
    displayValues.value = props.items.map((item) => item.value);
    return;
  }

  if (!sectionRef.value) {
    return;
  }

  run(sectionRef.value, () => {
    props.items.forEach((item, index) => {
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: item.value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          displayValues.value[index] = Math.round(proxy.value);
        },
      });
    });
  });
});
</script>
