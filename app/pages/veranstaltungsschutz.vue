<template>
  <SectionsServicePage
    :content="content"
    slug="veranstaltungsschutz"
    :image="heroImages.veranstaltungsschutz"
    :image-alt="heroAlts.veranstaltungsschutz"
  />
</template>

<script setup>
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { veranstaltungsschutzContent as content } from "~/content/services/veranstaltungsschutz";

useServicePageSeo(content, "veranstaltungsschutz", ogImages.veranstaltungsschutz);
</script>
