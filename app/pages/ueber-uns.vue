<template>
  <div>
    <SectionsPageHero
      :image="heroImages.ueberUns"
      :image-mobile="heroImages.ueberUnsMobile"
      :image-alt="heroAlts.ueberUns"
      image-position="center 20%"
      title="Über uns"
      lead="Erfahrenes Team, klare Prozesse, höchster Anspruch an Sicherheit."
    />
    <SectionsContentSection
      :title="ueberUnsIntro.title"
      :paragraphs="ueberUnsIntro.paragraphs"
      centered
    />
    <SectionsTeamGrid :members="teamMembers" />
    <SectionsTeamCulture :team="teamOnSite" :values="companyValues" />
    <SectionsCtaBand />
  </div>
</template>

<script setup>
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { companyValues, teamMembers, teamOnSite, ueberUnsIntro, ueberUnsSeo } from "~/content/team";

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
