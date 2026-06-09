import { createApp, type App } from "vue";
import ChatWidget from "./ChatWidget.vue";
import {
  DEFAULT_CONFIG,
  type SimpleKIChatConfig,
} from "./types";

declare global {
  interface Window {
    SimpleKIChatConfig?: Partial<SimpleKIChatConfig>;
    SimpleKIChat?: {
      init: (config?: Partial<SimpleKIChatConfig>) => void;
      destroy: () => void;
    };
  }
}

let mountedApp: App | null = null;
let mountEl: HTMLElement | null = null;

function findEmbedScript(): HTMLScriptElement | null {
  if (document.currentScript instanceof HTMLScriptElement) {
    return document.currentScript;
  }

  const candidates = document.querySelectorAll<HTMLScriptElement>(
    'script[data-webhook-url], script[src*="chat-widget"]',
  );
  return candidates[candidates.length - 1] ?? null;
}

function readScriptDataset(): Partial<SimpleKIChatConfig> {
  const script = findEmbedScript();
  if (!script?.dataset) return {};

  const { dataset } = script;
  const config: Partial<SimpleKIChatConfig> = {};

  if (dataset.webhookUrl) config.webhookUrl = dataset.webhookUrl;
  if (dataset.title) config.title = dataset.title;
  if (dataset.subline) config.subline = dataset.subline;
  if (dataset.logoUrl) config.logoUrl = dataset.logoUrl;
  if (dataset.welcomeMessage) config.welcomeMessage = dataset.welcomeMessage;
  if (dataset.source) config.source = dataset.source;
  if (dataset.primaryColor) config.primaryColor = dataset.primaryColor;

  return config;
}

function resolveConfig(
  override?: Partial<SimpleKIChatConfig>,
): SimpleKIChatConfig | null {
  const merged: Partial<SimpleKIChatConfig> = {
    ...DEFAULT_CONFIG,
    ...window.SimpleKIChatConfig,
    ...readScriptDataset(),
    ...override,
  };

  if (!merged.webhookUrl) {
    console.warn(
      "[Simple-KI Chat] Initialisierung abgebrochen: webhookUrl fehlt. Bitte SimpleKIChatConfig oder data-webhook-url setzen.",
    );
    return null;
  }

  return merged as SimpleKIChatConfig;
}

function ensureMountElement(): HTMLElement {
  const existing = document.getElementById("simple-ki-chat-mount");
  if (existing) return existing;

  const el = document.createElement("div");
  el.id = "simple-ki-chat-mount";
  el.style.cssText =
    "position:fixed;bottom:1rem;right:1rem;z-index:199999;display:flex;flex-direction:column;align-items:flex-end;gap:0.75rem;pointer-events:none;";
  document.body.appendChild(el);
  return el;
}

function init(config?: Partial<SimpleKIChatConfig>) {
  const resolved = resolveConfig(config);
  if (!resolved) return;

  if (mountedApp) {
    mountedApp.unmount();
    mountedApp = null;
  }

  mountEl = ensureMountElement();
  mountEl.innerHTML = "";

  const widgetHost = document.createElement("div");
  widgetHost.style.pointerEvents = "auto";
  mountEl.appendChild(widgetHost);

  mountedApp = createApp(ChatWidget, {
    webhookUrl: resolved.webhookUrl,
    title: resolved.title ?? DEFAULT_CONFIG.title,
    subline: resolved.subline ?? DEFAULT_CONFIG.subline,
    logoUrl: resolved.logoUrl ?? DEFAULT_CONFIG.logoUrl,
    welcomeMessage: resolved.welcomeMessage ?? DEFAULT_CONFIG.welcomeMessage,
    source: resolved.source ?? DEFAULT_CONFIG.source,
    primaryColor: resolved.primaryColor ?? DEFAULT_CONFIG.primaryColor,
  });

  mountedApp.mount(widgetHost);
}

function destroy() {
  if (mountedApp) {
    mountedApp.unmount();
    mountedApp = null;
  }
  if (mountEl) {
    mountEl.remove();
    mountEl = null;
  }
}

window.SimpleKIChat = { init, destroy };

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => init());
} else {
  init();
}
