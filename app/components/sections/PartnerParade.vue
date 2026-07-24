<template>
  <section
    class="partner-parade bg-ink"
    aria-label="Partner"
  >
    <div class="partner-parade__mask">
      <div
        class="partner-parade__track"
        :class="{ 'partner-parade__track--paused': prefersReducedMotion }"
      >
        <ul
          v-for="setIndex in 2"
          :key="setIndex"
          class="partner-parade__set"
          :aria-hidden="setIndex === 2 ? true : undefined"
        >
          <li
            v-for="partner in partners"
            :key="`${setIndex}-${partner.name}`"
            class="partner-parade__item"
          >
            <img
              :src="partner.src"
              :alt="setIndex === 1 ? partner.alt : ''"
              class="partner-parade__logo"
              :class="{ 'partner-parade__logo--invert': !partner.lightOnDark }"
              loading="lazy"
              decoding="async"
              height="64"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { partners } from "~/content/partners";

const prefersReducedMotion = usePrefersReducedMotion();
</script>

<style scoped>
.partner-parade {
  overflow: hidden;
  padding-block: 1.75rem;
}

.partner-parade__mask {
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 12%,
    black 88%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 12%,
    black 88%,
    transparent
  );
}

.partner-parade__track {
  display: flex;
  width: max-content;
  animation: partner-marquee 40s linear infinite;
}

.partner-parade__track--paused {
  animation: none;
}

.partner-parade__set {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  padding-inline: 1.75rem;
  margin: 0;
  list-style: none;
}

.partner-parade__item {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.partner-parade__logo {
  height: 2rem;
  width: auto;
  max-width: 8.5rem;
  object-fit: contain;
  opacity: 0.7;
  transition: opacity 0.25s ease;
}

@media (min-width: 768px) {
  .partner-parade__logo {
    height: 3rem;
  }
}

.partner-parade__logo--invert {
  filter: brightness(0) invert(1);
}

.partner-parade__item:hover .partner-parade__logo {
  opacity: 1;
}

@keyframes partner-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .partner-parade__track {
    animation: none;
  }
}
</style>
