<template>
  <section class="border-b border-neutral-200 bg-white">
    <div class="container mx-auto px-4 section-pad">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <UiSectionHeading :title="title" :lead="lead" />
          <a
            :href="`mailto:${email}`"
            class="inline-flex items-center justify-center bg-black px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-neutral-800"
          >
            {{ email }}
          </a>
        </div>
        <div class="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 class="mb-3 font-heading text-base font-bold text-black">Bürozeiten</h3>
            <p
              v-for="(line, index) in officeHours"
              :key="index"
              class="text-sm text-neutral-700"
            >
              {{ line }}
            </p>
          </div>
          <div>
            <h3 class="mb-3 font-heading text-base font-bold text-black">Adresse</h3>
            <p class="text-sm text-neutral-700">
              {{ address.street }}<br />{{ address.city }}
            </p>
          </div>
          <div>
            <h3 class="mb-3 font-heading text-base font-bold text-black">Telefon</h3>
            <a :href="phoneHref" class="text-sm text-neutral-700 hover:text-black">
              {{ phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: "Kontakt" },
  lead: { type: String, default: undefined },
  officeHours: { type: Array, required: true },
  address: { type: Object, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const phoneHref = computed(() => `tel:${props.phone.replace(/\s/g, "")}`);
</script>
