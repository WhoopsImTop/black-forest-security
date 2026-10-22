<template>
  <section class="bg-neutral-50">
    <div class="container mx-auto px-4 section-pad">
      <div class="mx-auto max-w-5xl">
        <UiSectionHeading :title="title" :lead="lead" />
        <ul class="flex flex-wrap gap-3">
          <li>
            <NuxtLink
              to="/"
              class="inline-block border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 transition-colors hover:border-black"
            >
              Sicherheitsdienst Freiburg
            </NuxtLink>
          </li>
          <li v-for="city in cityPages" :key="city.slug">
            <NuxtLink
              :to="`/standorte/${city.slug}/`"
              class="inline-block border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 transition-colors hover:border-black"
            >
              Sicherheitsdienst {{ city.city }}
            </NuxtLink>
          </li>
        </ul>
        <p class="mt-8 text-sm text-neutral-600">
          Was kostet ein Sicherheitsdienst?
          <NuxtLink
            to="/ratgeber/sicherheitsdienst-kosten/"
            class="font-medium text-black underline underline-offset-4"
          >
            Kostenfaktoren und Preisbeispiele im Ratgeber
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { cityPages } from "~/content/cities";

defineProps({
  title: { type: String, default: "Einsatzgebiete in Freiburg und Südbaden" },
  lead: {
    type: String,
    default:
      "Von unserem Sitz in Freiburg aus sind wir in der gesamten Region für Sie im Einsatz.",
  },
});
</script>
