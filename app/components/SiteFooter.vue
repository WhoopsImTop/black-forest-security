<template>
  <footer class="border-t border-neutral-900 bg-black">
    <div class="container mx-auto px-4 py-16 sm:py-20">
      <div class="grid gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <section>
          <p class="font-heading text-sm font-bold text-white">Black Forest Security GmbH</p>
          <p class="max-w-xs text-sm text-neutral-400">
            Ihr Partner für Sicherheit und Schutz
          </p>
        </section>

        <section>
          <div class="space-y-3 text-sm text-neutral-400">
            <p>Black Forest Security GmbH<br />Kaiser-Joseph-Straße 194<br />79098 Freiburg</p>
            <div>
              <a href="mailto:info@black-forest-security.de" class="block hover:text-white">info@black-forest-security.de</a>
              <a href="tel:07613896836" class="block hover:text-white">0761 3896836</a>
            </div>
          </div>
        </section>

        <section>
          <div class="space-y-3 text-sm text-white">
            <NuxtLink to="/impressum" class="block hover:text-white">Impressum</NuxtLink>
            <NuxtLink to="/datenschutzerklaerung" class="block hover:text-white">Datenschutzerklärung</NuxtLink>
          </div>
        </section>
        
        <section>
          <div class="space-y-3 text-sm text-white">
            <NuxtLink to="/veranstaltungsschutz" class="block hover:text-white">Veranstaltungsschutz</NuxtLink>
            <NuxtLink to="/objektschutz" class="block hover:text-white">Objektschutz</NuxtLink>
            <NuxtLink to="/tuersteher" class="block hover:text-white">Türsteher</NuxtLink>
            <NuxtLink to="/baustellenueberwachung" class="block hover:text-white">Baustellenüberwachung</NuxtLink>
            <NuxtLink to="/streifen-und-revierdienst" class="block hover:text-white">Streifen- und Revierdienst</NuxtLink>
          </div>
        </section>

        <section>
          <div class="space-y-3 text-sm text-white">
            <NuxtLink to="/standorte" class="block hover:text-white">Standorte</NuxtLink>
            <NuxtLink to="/kontakt" class="block hover:text-white">Kontakt</NuxtLink>
            <NuxtLink to="/ueber-uns" class="block hover:text-white">Über uns</NuxtLink>
            <NuxtLink to="/karriere" class="block hover:text-white">Karriere</NuxtLink>
          </div>
        </section>
      </div>

      <div
        class="mt-14 flex flex-col gap-3 border-t border-neutral-900 pt-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ new Date().getFullYear() }} Black Forest Security GmbH</p>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
