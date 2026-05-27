<template>
  <section id="leistungen" ref="sectionRef" class="border-b border-neutral-200 bg-[var(--color-paper)]">
    <div class="container mx-auto px-4 section-pad">
      <UiSectionHeading
        title="Sicherheitslösungen aus einer Hand"
        lead="Maßgeschneiderte Konzepte für Veranstaltungen, Objekte, Baustellen und mehr."
        class="reveal"
      />
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SectionsServiceCard v-for="service in services" :key="service.slug" :service="service" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { services } from "~/content/services";

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.1 });
</script>
