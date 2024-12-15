// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-12-14",
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_SITE_URL!,
      site: {
        url: "http://localhost:3000",
      },
      snapshotMirrors: JSON.parse(process.env.NUXT_PUBLIC_SNAPSHOT_MIRRORS!),
      networkPreMeasureFileSize: Number.parseInt(process.env.NUXT_PUBLIC_NETWORK_PRE_MEASURE_FILE_SIZE!),
      networkMeasureFileSize: Number.parseInt(process.env.NUXT_PUBLIC_NETWORK_MEASURE_FILE_SIZE!),
      explorerBackendEndpoint: process.env.NUXT_PUBLIC_EXPLORER_BACKEND_ENDPOINT!,
      snapshotsEnabled: process.env.NUXT_PUBLIC_SNAPSHOTS_ENABLED! === "true",
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      templateParams: {
        separator: "-",
      },
      titleTemplate: "%siteName %separator %s",
    },
  },
  modules: ["@nuxt/image", "@nuxtjs/i18n", "@nuxtjs/tailwindcss", "@nuxtjs/seo", "@nuxtjs/eslint-module", "nuxt-multi-cache"],
  multiCache: {
    data: {
      enabled: true,
    },
  },
  i18n: {
    locales: [
      {
        name: "English",
        code: "en",
        language: "en-US",
        file: "en.ts",
      },
      {
        name: "Русский",
        code: "ru",
        language: "ru-RU",
        file: "ru.ts",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    restructureDir: false,
    langDir: "localization",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      redirectOn: "root",
      alwaysRedirect: true,
    },
    baseUrl: process.env.NUXT_I18N_BASE_URL || "https://veil.tools",
  },
  image: {
    format: ["webp", "png"],
    provider: "ipx",
    quality: 100,
    ipx: {
      modifiers: {
        format: "webp",
        quality: 100,
      },
    },
  },
  seo: {
    redirectToCanonicalSiteUrl: process.env.NODE_ENV !== "development",
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://veil.tools",
  },
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Veil Project",
      url: "https://veil-project.com",
      logo: `${process.env.NUXT_PUBLIC_SITE_URL || "https://veil.tools"}/images/logo.png`,
    },
  },
  css: ["~/assets/css/tailwind.css"],
  build: {
    transpile: [
      "@heroicons/vue",
    ],
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
});