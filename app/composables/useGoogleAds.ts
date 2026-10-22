export type GoogleAdsConversionAction =
  | "phone"
  | "email"
  | "chat"
  | "kontakt";

const SESSION_ONCE_ACTIONS = new Set<GoogleAdsConversionAction>([
  "chat",
  "kontakt",
]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function sessionKey(action: GoogleAdsConversionAction) {
  return `bfs_gads_conv_${action}`;
}

function resolveSendTo(adsId: string, label: string): string | null {
  const trimmed = label.trim();
  if (!trimmed || !adsId.trim()) return null;
  if (trimmed.includes("/")) return trimmed;
  return `${adsId.trim()}/${trimmed}`;
}

export function useGoogleAds() {
  const config = useRuntimeConfig().public;

  const labelByAction: Record<GoogleAdsConversionAction, string> = {
    phone: String(config.googleAdsConversionPhone || ""),
    email: String(config.googleAdsConversionEmail || ""),
    chat: String(config.googleAdsConversionChat || ""),
    kontakt: String(config.googleAdsConversionKontakt || ""),
  };

  function trackConversion(action: GoogleAdsConversionAction) {
    if (!import.meta.client) return;

    const sendTo = resolveSendTo(
      String(config.googleAdsId || ""),
      labelByAction[action],
    );
    if (!sendTo) return;

    if (SESSION_ONCE_ACTIONS.has(action)) {
      try {
        if (sessionStorage.getItem(sessionKey(action))) return;
        sessionStorage.setItem(sessionKey(action), "1");
      } catch {
        // sessionStorage unavailable — still fire once this call
      }
    }

    if (typeof window.gtag !== "function") return;

    window.gtag("event", "conversion", { send_to: sendTo });
  }

  return { trackConversion };
}
