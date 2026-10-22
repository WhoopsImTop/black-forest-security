const GOOGLE_ADS_SERVICE = "Google Ads";

type GtagConsentState = "granted" | "denied";

function updateAdsConsent(granted: boolean) {
  if (typeof window.gtag !== "function") return;

  const value: GtagConsentState = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

function isGoogleAdsGranted(detail: Record<string, unknown> | null): boolean | null {
  if (!detail) return null;

  if (typeof detail[GOOGLE_ADS_SERVICE] === "boolean") {
    return detail[GOOGLE_ADS_SERVICE] as boolean;
  }

  const services = detail.services;
  if (services && typeof services === "object") {
    const entry = (services as Record<string, unknown>)[GOOGLE_ADS_SERVICE];
    if (typeof entry === "boolean") return entry;
    if (entry && typeof entry === "object" && "status" in entry) {
      return Boolean((entry as { status: unknown }).status);
    }
  }

  const type = String(detail.type || detail.event || "").toUpperCase();
  if (type === "ACCEPT_ALL" || type === "CONSENT_GIVEN") return true;
  if (type === "DENY_ALL") return false;

  return null;
}

function readUsercentricsConsent(): boolean | null {
  const uc = (
    window as Window & {
      UC_UI?: {
        getServicesBaseInfo?: () => Array<{
          name?: string;
          consent?: { status?: boolean };
        }>;
      };
    }
  ).UC_UI;

  if (!uc?.getServicesBaseInfo) return null;

  try {
    const services = uc.getServicesBaseInfo();
    const ads = services.find((s) => s.name === GOOGLE_ADS_SERVICE);
    if (!ads) return null;
    return Boolean(ads.consent?.status);
  } catch {
    return null;
  }
}

export default defineNuxtPlugin(() => {
  const { trackConversion } = useGoogleAds();

  const syncConsent = (detail?: Record<string, unknown>) => {
    const fromEvent = detail ? isGoogleAdsGranted(detail) : null;
    const granted = fromEvent ?? readUsercentricsConsent();
    if (granted === null) return;
    updateAdsConsent(granted);
  };

  window.addEventListener("ucEvent", ((event: CustomEvent) => {
    syncConsent((event.detail || null) as Record<string, unknown> | null);
  }) as EventListener);

  window.addEventListener("UC_UI_CMP_EVENT", ((event: CustomEvent) => {
    syncConsent((event.detail || null) as Record<string, unknown> | null);
  }) as EventListener);

  window.addEventListener("UC_UI_INITIALIZED", () => {
    syncConsent();
  });

  // Chat lead from embed widget (first successful user message)
  window.addEventListener("bfs:chat-lead", () => {
    trackConversion("chat");
  });

  // Late UC init
  if (readUsercentricsConsent() !== null) {
    syncConsent();
  }
});
