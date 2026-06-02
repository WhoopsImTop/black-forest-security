<template>
  <div>
    <SectionsPageHero
      :image="heroImages.kontakt"
      :title="kontaktContent.title"
      :lead="kontaktContent.lead"
    />
    <SectionsContactBlock
      :office-hours="kontaktContent.officeHours"
      :address="kontaktContent.address"
      :email="kontaktContent.email"
      :phone="kontaktContent.phone"
    />
  </div>
</template>

<script setup>
import { kontaktContent, kontaktSeo } from "~/content/contact";
import { heroImages } from "~/content/hero-images";

import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  toJsonLdGraph,
} from "~/utils/seo/schema";

usePageSeo({
  title: kontaktSeo.title,
  description: kontaktSeo.description,
  path: "/kontakt",
  ogImage: heroImages.kontakt,
  jsonLd: toJsonLdGraph([
    buildContactPageSchema(),
    buildBreadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Kontakt", path: "/kontakt" },
    ]),
  ]),
});
</script>
