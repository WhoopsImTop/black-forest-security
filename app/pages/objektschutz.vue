<template>
  <SectionsServicePage
    :content="content"
    slug="objektschutz"
    :image="heroImages.objektschutz"
    :image-alt="heroAlts.objektschutz"
  />
</template>

<script setup>
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { objektschutzContent as content } from "~/content/services/objektschutz";

useServicePageSeo(content, "objektschutz", ogImages.objektschutz);
</script>
