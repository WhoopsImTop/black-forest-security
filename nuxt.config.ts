// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: true,
  modules: ["@pinia/nuxt", "@nuxtjs/sitemap"],
  site: {
    url: "https://www.black-forest-security.de",
    name: "Black Forest Security GmbH",
    trailingSlash: true,
  },
  runtimeConfig: {
    public: {
      siteUrl: "https://www.black-forest-security.de",
      chatWebhookUrl:
        "https://simpleki.app.n8n.cloud/webhook/aee67d8e-647f-45a2-8737-bc9aee00544a/chat",
      googleAdsId: "AW-16810934028",
      // Conversion labels from Google Ads (env: NUXT_PUBLIC_GOOGLE_ADS_CONVERSION_*)
      googleAdsConversionPhone: "",
      googleAdsConversionEmail: "",
      googleAdsConversionChat: "",
      googleAdsConversionKontakt: "",
    },
  },
  sitemap: {
    exclude: ["/404"],
  },
  experimental: {
    scanPageMeta: true,
  },
  nitro: {
    preset: "static", // ← das ist der entscheidende Punkt bei Nuxt 4
    prerender: {
      crawlLinks: true,
      trailingSlash: true,
    },
  },
  routeRules: {
    "/": { prerender: true },
  },

  //import font
  app: {
    head: {
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      htmlAttrs: { lang: "de" },
      link: [
        { rel: "preconnect", href: "https://use.typekit.net", crossorigin: "" },
        { rel: "preconnect", href: "https://p.typekit.net", crossorigin: "" },
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
        // Consent Mode v2 defaults — must run before CMP / Ads tags
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
          `,
        },
        {
          src: "https://app.eu.usercentrics.eu/browser-ui/latest/loader.js",
          id: "usercentrics-cmp",
          async: true,
          "data-eu-mode": "true",
          "data-settings-id": "5P9VLo20fLBYW8",
        },
        // Google Ads gtag — blocked until Usercentrics consent for "Google Ads"
        {
          src: "https://www.googletagmanager.com/gtag/js?id=AW-16810934028",
          async: true,
          type: "text/plain",
          "data-usercentrics": "Google Ads",
        },
        {
          innerHTML: `
            gtag('js', new Date());
            gtag('config', 'AW-16810934028');
          `,
          type: "text/plain",
          "data-usercentrics": "Google Ads",
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
