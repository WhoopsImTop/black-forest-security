<template>
  <section ref="sectionRef" class="bg-white">
    <div class="container mx-auto px-4 section-pad">
      <div class="mx-auto max-w-5xl">
        <UiSectionHeading
          class="reveal"
          title="Geprüfte Sicherheit aus Freiburg"
          lead="Darauf können Sie sich bei Black Forest Security verlassen."
        />
        <ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="item in items"
            :key="item.title"
            class="reveal border border-neutral-200 p-6"
          >
            <h3 class="font-heading text-base font-bold text-black">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-neutral-600">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteTrust } from "~/content/site";

const items = computed(() => {
  const list = [
    {
      title: "Qualifiziert nach § 34a GewO",
      text: "Alle Einsatzkräfte verfügen über die gesetzlich vorgeschriebene Unterrichtung bzw. Sachkundeprüfung und sind im Bewacherregister erfasst.",
    },
    {
      title: "24/7 erreichbar",
      text: "Wir sind rund um die Uhr für Sie erreichbar – auch nachts, am Wochenende und an Feiertagen.",
    },
    {
      title: "Regional in Freiburg",
      text: "Sitz in der Kaiser-Joseph-Straße in Freiburg, kurze Wege und feste Ansprechpartner in ganz Südbaden.",
    },
  ];

  if (siteTrust.bewacherregisterNr) {
    list.push({
      title: "Bewacherregister",
      text: `Registriert im Bewacherregister unter der Nummer ${siteTrust.bewacherregisterNr}.`,
    });
  }
  if (siteTrust.haftpflichtDeckungssumme) {
    list.push({
      title: "Abgesichert",
      text: `Betriebshaftpflichtversicherung mit einer Deckungssumme von ${siteTrust.haftpflichtDeckungssumme}.`,
    });
  }
  if (siteTrust.ihkMitgliedschaft) {
    list.push({ title: "IHK", text: `Mitglied der ${siteTrust.ihkMitgliedschaft}.` });
  }
  if (siteTrust.zertifikate.length) {
    list.push({ title: "Zertifiziert", text: siteTrust.zertifikate.join(", ") });
  }
  if (siteTrust.verbaende.length) {
    list.push({ title: "Verbände", text: `Mitglied im ${siteTrust.verbaende.join(", ")}.` });
  }

  return list;
});

const sectionRef = ref(null);
useRevealOnScroll(sectionRef, ".reveal", { stagger: 0.08 });
</script>
