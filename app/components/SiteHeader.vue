<template>
  <header class="fixed inset-x-0 top-0 z-9999 border-b border-neutral-200 bg-white shadow-sm shadow-black/5">
    <div class="container mx-auto flex h-[4.25rem] items-center justify-between gap-4 px-4 md:h-20">
      <NuxtLink
        to="/"
        class="relative z-10002 shrink-0 py-1"
        aria-label="Black Forest Security GmbH Startseite"
        @click="isMenuOpen = false"
      >
        <img
          src="/black-forest-security-logo.png"
          alt="Black Forest Security GmbH"
          class="h-10 w-auto md:h-12"
          width="220"
          height="48"
        />
      </NuxtLink>

      <nav class="hidden items-center gap-10 lg:flex" aria-label="Hauptnavigation">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-neutral-700 transition-colors hover:text-black"
          :class="isActive(item.to) ? 'text-black' : ''"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <button
        type="button"
        class="relative z-10002 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-neutral-200 bg-white text-neutral-900 transition-colors hover:border-neutral-400 lg:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="isMenuOpen ? 'Menü schließen' : 'Menü öffnen'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="sr-only">{{ isMenuOpen ? "Menü schließen" : "Menü öffnen" }}</span>
        <span class="flex h-3.5 w-5 flex-col justify-between" aria-hidden="true">
          <span
            class="block h-0.5 w-full origin-center bg-current transition-all duration-300"
            :class="isMenuOpen ? 'translate-y-[6px] rotate-45' : ''"
          />
          <span
            class="block h-0.5 w-full bg-current transition-all duration-300"
            :class="isMenuOpen ? 'scale-x-0 opacity-0' : ''"
          />
          <span
            class="block h-0.5 w-full origin-center bg-current transition-all duration-300"
            :class="isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''"
          />
        </span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="fixed inset-0 z-10001 flex flex-col bg-white lg:hidden"
      >
        <div
          class="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-neutral-200 px-4"
        >
          <img
            src="/black-forest-security-logo.png"
            alt=""
            class="h-10 w-auto"
            width="220"
            height="48"
          />
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-sm border border-neutral-200 text-neutral-900"
            aria-label="Menü schließen"
            @click="isMenuOpen = false"
          >
            <span class="flex h-3.5 w-5 flex-col justify-between" aria-hidden="true">
              <span class="block h-0.5 w-full translate-y-[6px] rotate-45 bg-current" />
              <span class="block h-0.5 w-full scale-x-0 bg-current opacity-0" />
              <span class="block h-0.5 w-full -translate-y-[6px] -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav
          class="container mx-auto flex flex-1 flex-col px-4 py-6"
          aria-label="Mobile Navigation"
        >
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            class="border-b border-neutral-100 py-5 font-heading text-2xl font-bold tracking-tight text-neutral-900 transition-colors active:bg-neutral-50"
            :class="isActive(item.to) ? 'text-black' : 'text-neutral-800'"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>

          <div class="mt-auto border-t border-neutral-100 pt-6">
            <a
              href="mailto:info@black-forest-security.de"
              class="block text-sm font-medium text-neutral-600 hover:text-black"
            >
              info@black-forest-security.de
            </a>
            <a href="tel:07613896836" class="mt-2 text-sm text-neutral-500">0761 3896836</a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const navigationItems = [
  { label: "Leistungen", to: "/#leistungen" },
  { label: "Standorte", to: "/standorte" },
  { label: "Über uns", to: "/ueber-uns" },
  { label: "Karriere", to: "/karriere" },
  { label: "Kontakt", to: "/kontakt" },
];

const isMenuOpen = ref(false);
const route = useRoute();

const isActive = (to) => {
  if (to.startsWith("/#")) {
    return route.path === "/" && route.hash === to.slice(1);
  }
  return route.path === to;
};

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);

watch(isMenuOpen, (open) => {
  if (typeof document === "undefined") {
    return;
  }
  document.body.style.overflow = open ? "hidden" : "";
});

onBeforeUnmount(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 280ms ease;
}

.mobile-menu-enter-active nav,
.mobile-menu-leave-active nav {
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from nav,
.mobile-menu-leave-to nav {
  transform: translateY(12px);
}
</style>
