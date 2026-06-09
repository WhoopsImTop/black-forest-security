<template>
  <a
    :href="phoneHref"
    class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg shadow-black/15 transition-transform hover:scale-[1.03] border border-neutral-400/30 outline outline-neutral-400/20 outline-offset-4 hover:outline-offset-5 transition-all duration-600"
    :aria-label="`Anrufen: ${phone}`"
  >
    <img src="/phone.svg" alt="" class="h-6 w-6" width="24" height="24" />
  </a>
</template>

<script setup lang="ts">
import { siteContact } from "~/content/site";

const phone = siteContact.phoneFloating;
const phoneHref = computed(() => `tel:${phone.replace(/\s/g, "")}`);
</script>
