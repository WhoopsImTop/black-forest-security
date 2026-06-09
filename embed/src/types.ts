export type SimpleKIChatConfig = {
  webhookUrl: string;
  title?: string;
  subline?: string;
  logoUrl?: string;
  welcomeMessage?: string;
  source?: string;
  primaryColor?: string;
};

export const DEFAULT_LOGO_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23171717' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E";

export const DEFAULT_CONFIG: Required<
  Omit<SimpleKIChatConfig, "webhookUrl">
> = {
  title: "Chat",
  subline: "KI-Chatbot",
  logoUrl: DEFAULT_LOGO_URL,
  welcomeMessage: "Wie können wir Ihnen helfen?",
  source: "embed",
  primaryColor: "#000000",
};

const HEX_COLOR_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function normalizePrimaryColor(color?: string): string {
  if (color && HEX_COLOR_RE.test(color)) return color;
  return DEFAULT_CONFIG.primaryColor;
}
