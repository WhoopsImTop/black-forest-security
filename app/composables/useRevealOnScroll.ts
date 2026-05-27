import type { Ref } from "vue";

export function useRevealOnScroll(
  containerRef: Ref<HTMLElement | null>,
  selector = ".reveal",
  options: { stagger?: number; y?: number } = {},
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { run, gsap } = useGsapContext();

  onMounted(() => {
    if (prefersReducedMotion.value || !containerRef.value) {
      return;
    }

    run(containerRef.value, () => {
      const targets = containerRef.value?.querySelectorAll(selector);
      if (!targets?.length) {
        return;
      }

      gsap.from(targets, {
        autoAlpha: 0,
        y: options.y ?? 28,
        duration: 0.85,
        stagger: options.stagger ?? 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.value,
          start: "top 82%",
        },
      });
    });
  });
}
