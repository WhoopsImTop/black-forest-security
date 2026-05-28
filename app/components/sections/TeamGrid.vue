<template>
  <section ref="sectionRef" class="bg-white">
    <div class="container mx-auto px-4 section-pad">
      <UiSectionHeading title="Unser Team" lead="Erfahrene Ansprechpartner für Ihre Sicherheitsanforderungen." />
      <div class="grid gap-6 md:grid-cols-4">
        <UiTeamCard
          v-for="member in members"
          :key="member.name"
          class="reveal"
          :name="member.name"
          :role="member.role"
          :image="member.image"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  members: { type: Array, required: true },
});

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.12 });
</script>
