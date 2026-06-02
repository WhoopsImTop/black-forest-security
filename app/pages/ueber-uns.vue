<template>
  <div>
    <SectionsPageHero
      :image="heroImages.ueberUns"
      title="Über uns"
      lead="Erfahrenes Team, klare Prozesse, höchster Anspruch an Sicherheit."
    />
    <SectionsContentSection
      :title="ueberUnsIntro.title"
      :paragraphs="ueberUnsIntro.paragraphs"
      centered
    />
    <SectionsTeamGrid :members="teamMembers" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";
import { teamMembers, ueberUnsIntro, ueberUnsSeo } from "~/content/team";

import { buildBreadcrumbSchema, toJsonLdGraph } from "~/utils/seo/schema";

usePageSeo({
  title: ueberUnsSeo.title,
  description: ueberUnsSeo.description,
  path: "/ueber-uns",
  ogImage: heroImages.ueberUns,
  jsonLd: toJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Über uns", path: "/ueber-uns" },
    ]),
  ]),
});
</script>
