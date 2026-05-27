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

useHead({
  title: kontaktSeo.title,
  meta: [{ name: "description", content: kontaktSeo.description }],
  htmlAttrs: { lang: "de" },
});
</script>
