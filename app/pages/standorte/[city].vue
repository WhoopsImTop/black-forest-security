<template>
  <div v-if="cityContent">
    <SectionsPageHero
      :image="heroImages.ueberUns"
      :title="cityContent.heroTitle"
      :lead="cityContent.heroLead"
    />

    <section class="bg-white">
      <div class="container mx-auto px-4 section-pad">
        <div class="mx-auto max-w-3xl">
          <UiSectionHeading :title="cityContent.trustTitle" />
          <div class="space-y-4">
            <p
              v-for="(paragraph, index) in cityContent.trustParagraphs"
              :key="index"
              class="text-base text-neutral-600"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <SectionsContentSection
      v-for="section in cityContent.sections"
      :key="section.id"
      :title="section.title"
      :paragraphs="section.paragraphs"
      :centered="section.centered ?? true"
    />

    <SectionsFaqAccordion :items="cityContent.faq" centered />
    <SectionsCtaBand
      :title="`Sicherheitsanfrage für ${cityContent.city}`"
      lead="Kontaktieren Sie uns für ein individuelles Sicherheitskonzept in Ihrer Stadt."
      label="Jetzt anfragen"
      to="/kontakt"
    />
  </div>

  <div v-else>
    <SectionsPageHero
      :image="heroImages.karriere"
      title="Standort nicht gefunden"
      lead="Die angeforderte Stadtseite ist aktuell nicht verfügbar."
    />
    <SectionsContentSection
      :paragraphs="[
        'Bitte prüfen Sie die URL oder wechseln Sie zur Standorte-Übersicht.',
      ]"
      centered
    >
      <div class="mt-8">
        <UiButtonLink to="/standorte" variant="outline">
          Zur Standorte-Übersicht
        </UiButtonLink>
      </div>
    </SectionsContentSection>
  </div>
</template>

<script setup>
import { cityPages } from "~/content/cities";
import { heroImages } from "~/content/hero-images";

const route = useRoute();

const cityContent = computed(() =>
  cityPages.find((entry) => entry.slug === String(route.params.city || "")),
);

watchEffect(() => {
  const city = cityContent.value;
  if (city) {
    useCityPageSeo(city, heroImages.ueberUns);
    return;
  }

  usePageSeo({
    title: "Standort nicht gefunden | Black Forest Security GmbH",
    description:
      "Standortseite nicht gefunden. Alle verfügbaren Standorte finden Sie in der Übersicht.",
    path: `/standorte/${String(route.params.city || "")}`,
    robots: "noindex, follow",
  });
});
</script>
