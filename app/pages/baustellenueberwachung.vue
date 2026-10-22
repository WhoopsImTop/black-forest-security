<template>
  <SectionsServicePage
    :content="content"
    slug="baustellenueberwachung"
    :image="heroImages.baustellenueberwachung"
    :image-alt="heroAlts.baustellenueberwachung"
  />
</template>

<script setup>
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { baustellenueberwachungContent as content } from "~/content/services/baustellenueberwachung";

useServicePageSeo(content, "baustellenueberwachung", ogImages.baustellenueberwachung);
</script>
