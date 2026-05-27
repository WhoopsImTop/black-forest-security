<template>
  <div>
    <SectionsPageHero
      :image="heroImages.ueberUns"
      title="Über uns"
      lead="Erfahrenes Team, klare Prozesse, höchster Anspruch an Sicherheit."
    />
    <SectionsTeamGrid :members="teamMembers" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { teamMembers, ueberUnsSeo } from "~/content/team";

useHead({
  title: ueberUnsSeo.title,
  meta: [{ name: "description", content: ueberUnsSeo.description }],
  htmlAttrs: { lang: "de" },
});
</script>
