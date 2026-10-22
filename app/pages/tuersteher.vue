<template>
  <SectionsServicePage
    :content="content"
    slug="tuersteher"
    :image="heroImages.tuersteher"
    :image-alt="heroAlts.tuersteher"
  />
</template>

<script setup>
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { tuersteherContent as content } from "~/content/services/tuersteher";

useServicePageSeo(content, "tuersteher", ogImages.tuersteher);
</script>
