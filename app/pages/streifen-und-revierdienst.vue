<template>
  <SectionsServicePage
    :content="content"
    slug="streifen-und-revierdienst"
    :image="heroImages.streifenUndRevierdienst"
    :image-alt="heroAlts.streifenUndRevierdienst"
  />
</template>

<script setup>
import { heroAlts, heroImages, ogImages } from "~/content/hero-images";
import { streifenRevierdienstContent as content } from "~/content/services/streifen-und-revierdienst";

useServicePageSeo(content, "streifen-und-revierdienst", ogImages.streifenUndRevierdienst);
</script>
