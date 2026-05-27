import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

function ensureGsapPlugins() {
  if (import.meta.server || pluginRegistered) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  pluginRegistered = true;
}

export function useGsapContext() {
  let context: gsap.Context | null = null;

  const run = (scope: Element | null, callback: () => void) => {
    if (!scope || import.meta.server) {
      return null;
    }
    ensureGsapPlugins();
    context?.revert();
    context = gsap.context(callback, scope);
    return context;
  };

  onUnmounted(() => {
    context?.revert();
    context = null;
  });

  return { run, gsap, ScrollTrigger };
}
