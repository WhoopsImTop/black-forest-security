<template>
  <section ref="sectionRef" class="bg-white">
    <div class="container mx-auto px-4 section-pad">
      <div class="mx-auto max-w-5xl">
        <UiSectionHeading
          title="Weitere Leistungen"
          lead="Entdecken Sie weitere Sicherheitsdienstleistungen aus unserem Portfolio."
          class="reveal"
        />
        <div class="reveal mt-8">
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-400 ease-out"
              :style="{ transform: `translateX(-${translatePercent}%)` }"
            >
              <div
                v-for="service in otherServices"
                :key="service.slug"
                :class="cardClass"
              >
                <div class="pr-6">
                  <SectionsServiceCard :service="service" />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-start gap-2">
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center border border-neutral-200 text-neutral-900 transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!canGoPrev"
              aria-label="Vorherige Leistungen"
              @click="goPrev"
            >
              ←
            </button>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center border border-neutral-200 text-neutral-900 transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!canGoNext"
              aria-label="Nächste Leistungen"
              @click="goNext"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { services } from "~/content/services";

const props = defineProps({
  currentSlug: { type: String, required: true },
});

const otherServices = computed(() => services.filter((service) => service.slug !== props.currentSlug));
const currentIndex = ref(0);
const cardsPerView = ref(3);

const maxIndex = computed(() => Math.max(0, otherServices.value.length - cardsPerView.value));
const canGoPrev = computed(() => currentIndex.value > 0);
const canGoNext = computed(() => currentIndex.value < maxIndex.value);
const translatePercent = computed(() => currentIndex.value * (100 / cardsPerView.value));
const cardClass = computed(() =>
  cardsPerView.value === 1 ? "w-full shrink-0" : cardsPerView.value === 2 ? "w-1/2 shrink-0" : "w-1/3 shrink-0",
);

const updateCardsPerView = () => {
  if (typeof window === "undefined") {
    return;
  }
  if (window.innerWidth < 768) {
    cardsPerView.value = 1;
  } else if (window.innerWidth < 1024) {
    cardsPerView.value = 2;
  } else {
    cardsPerView.value = 3;
  }
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
};

const goPrev = () => {
  if (!canGoPrev.value) {
    return;
  }
  currentIndex.value -= 1;
};

const goNext = () => {
  if (!canGoNext.value) {
    return;
  }
  currentIndex.value += 1;
};

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.08 });

onMounted(() => {
  updateCardsPerView();
  window.addEventListener("resize", updateCardsPerView);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCardsPerView);
});
</script>
