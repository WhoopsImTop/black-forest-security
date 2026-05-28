<template>
  <div>
    <SectionsPageHero
      :image="heroImages.karriere"
      title="Karriere"
      lead="Werden Sie Teil unseres Teams bei Black Forest Security."
    />
    <SectionsContentSection
      title="Aktuell keine Stellenausschreibungen"
      :paragraphs="[
        'Derzeit haben wir keine offenen Positionen ausgeschrieben.',
        'Wir freuen uns dennoch jederzeit über Ihre Initiativbewerbung.',
      ]"
      centered
    >
      <div class="mt-8">
        <UiButtonLink href="mailto:bewerbung@black-forest-security.de">
          Initiativbewerbung senden
        </UiButtonLink>
      </div>
    </SectionsContentSection>
  </div>
</template>

<script setup>
import { heroImages } from "~/content/hero-images";

useHead({
  title: "Karriere | Black Forest Security GmbH",
  meta: [
    {
      name: "description",
      content: "Aktuell keine Stellenausschreibungen. Bewerben Sie sich initiativ bei der Black Forest Security GmbH.",
    },
  ],
  htmlAttrs: { lang: "de" },
});
</script>
