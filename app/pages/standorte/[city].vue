<template>
  <div v-if="cityContent">
    <SectionsPageHero
      :image="heroImages.ueberUns"
      :image-alt="`Sicherheitsdienst ${cityContent.city} – Team von Black Forest Security`"
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

    <section class="bg-neutral-50">
      <div class="container mx-auto px-4 section-pad">
        <div class="mx-auto max-w-5xl">
          <UiSectionHeading
            :title="`Unsere Leistungen in ${cityContent.city}`"
            :lead="`Alle Sicherheitsdienstleistungen bieten wir auch in ${cityContent.city} und Umgebung an.`"
          />
          <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="service in services" :key="service.slug">
              <NuxtLink
                :to="`${service.to}/`"
                class="block h-full border border-neutral-200 bg-white p-5 transition-colors hover:border-black"
              >
                <span class="font-heading text-base font-bold text-black">{{ service.title }}</span>
                <span class="mt-2 block text-sm text-neutral-600">{{ service.description }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <SectionsTrustSection />
    <SectionsFaqAccordion :items="cityContent.faq" centered />
    <SectionsServiceAreas title="Weitere Einsatzgebiete" />
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
        <UiButtonLink to="/standorte/" variant="outline">
          Zur Standorte-Übersicht
        </UiButtonLink>
      </div>
    </SectionsContentSection>
  </div>
</template>

<script setup>
import { cityPages } from "~/content/cities";
import { heroImages, ogImages } from "~/content/hero-images";
import { services } from "~/content/services";

const route = useRoute();

const cityContent = computed(() =>
  cityPages.find((entry) => entry.slug === String(route.params.city || "")),
);

watchEffect(() => {
  const city = cityContent.value;
  if (city) {
    useCityPageSeo(city, ogImages.ueberUns);
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
