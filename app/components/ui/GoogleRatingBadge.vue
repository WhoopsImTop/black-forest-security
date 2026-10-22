<template>
  <a
    :href="googleReviewUrls.profile"
    target="_blank"
    rel="noopener"
    class="inline-flex items-center gap-2 text-sm"
    :class="dark ? 'text-white/90 hover:text-white' : 'text-neutral-700 hover:text-black'"
    :aria-label="`${rating} von 5 Sternen bei ${googleReviews.count} Google-Rezensionen – Rezensionen auf Google ansehen`"
  >
    <span class="text-base tracking-tight text-amber-400" aria-hidden="true">★★★★★</span>
    <span class="font-bold">{{ rating }}</span>
    <span :class="dark ? 'text-white/70' : 'text-neutral-500'">
      · {{ googleReviews.count }} Google-Rezensionen
    </span>
  </a>
</template>

<script setup>
import { formatRating, googleReviews, googleReviewUrls } from "~/content/reviews";

defineProps({
  dark: { type: Boolean, default: false },
});

const rating = formatRating(googleReviews.rating);
</script>
