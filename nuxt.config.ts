// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      chatWebhookUrl:
        "https://simpleki.app.n8n.cloud/webhook/aee67d8e-647f-45a2-8737-bc9aee00544a/chat",
    },
  },
  experimental: {
    scanPageMeta: true,
  },

  //import font
  app: {
    head: {
      title: "Black Forest Security GmbH - Ihr Partner für Sicherheit und Schutz",
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content:
            "Black Forest Security GmbH - Ihr Partner für Sicherheit und Schutz. Professionelle Sicherheitsdienste, umfassende Schutzmaßnahmen und umweltverträgliche Lösungen.",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://use.typekit.net/rrg2hzi.css",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favico.png",
        },
      ],
      script: [
        {
          src: "https://app.eu.usercentrics.eu/browser-ui/latest/loader.js",
          id: "usercentrics-cmp",
          async: true,
          "data-eu-mode": "true",
          "data-settings-id": "lNciREqJBOwvzD",
        },
      ],
    },
  },
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "gsap",
        "gsap/ScrollTrigger",
      ],
    },
  },
});
