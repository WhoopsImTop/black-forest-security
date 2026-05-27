export function usePrefersReducedMotion() {
  const prefersReducedMotion = ref(false);
  let media: MediaQueryList | null = null;
  let update: (() => void) | null = null;

  onMounted(() => {
    if (typeof window === "undefined") {
      return;
    }
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    update = () => {
      prefersReducedMotion.value = media?.matches ?? false;
    };
    update();
    media.addEventListener("change", update);
  });

  onUnmounted(() => {
    if (media && update) {
      media.removeEventListener("change", update);
    }
  });

  return prefersReducedMotion;
}
