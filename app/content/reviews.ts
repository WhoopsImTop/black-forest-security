/**
 * Google-Rezensionen – bitte regelmäßig aktualisieren (Wert aus dem Google-Unternehmensprofil).
 * Bewusst statisch: kein Dritt-Widget, keine Cookies, kein Consent nötig, keine Ladezeit.
 */
export const googleReviews = {
  rating: 5.0,
  count: 24,
  /** Stand der Zahlen */
  updated: "2026-10",
  placeId: "ChIJC1ZdhvMfkUcRtpA9dY8D4VY",
  cid: "6260288871703875766",
  /**
   * Ausgewählte Kundenstimmen (optional). Nur mit Einverständnis der Verfasser verwenden.
   * Beispiel: { text: "…", author: "Max M.", context: "Firmenfeier, Freiburg" }
   */
  quotes: [] as { text: string; author: string; context?: string }[],
};

export const googleReviewUrls = {
  /** Profil in Google Maps (alle Rezensionen) */
  profile: `https://maps.google.com/?cid=${googleReviews.cid}`,
  /** Direkt zum Formular „Rezension schreiben“ */
  write: `https://search.google.com/local/writereview?placeid=${googleReviews.placeId}`,
};

export function formatRating(rating: number): string {
  return rating.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
