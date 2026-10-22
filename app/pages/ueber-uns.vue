<template>
  <div>
    <SectionsPageHero
      :image="heroImages.ueberUns"
      :image-alt="heroAlts.ueberUns"
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
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { teamMembers, ueberUnsIntro, ueberUnsSeo } from "~/content/team";

import { buildBreadcrumbSchema, toJsonLdGraph } from "~/utils/seo/schema";

usePageSeo({
  title: ueberUnsSeo.title,
  description: ueberUnsSeo.description,
  path: "/ueber-uns",
  ogImage: ogImages.ueberUns,
  jsonLd: toJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Über uns", path: "/ueber-uns" },
    ]),
  ]),
});
</script>
