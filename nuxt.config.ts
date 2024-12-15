// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    compatibilityDate: "2024-12-14",
    runtimeConfig: {
        public: {
            i18n: {
                baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL!
            },
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL!,
            snapshotMirrors: JSON.parse(process.env.NUXT_PUBLIC_SNAPSHOT_MIRRORS!),
            networkPreMeasureFileSize: parseInt(process.env.NUXT_PUBLIC_NETWORK_PRE_MEASURE_FILE_SIZE!),
            networkMeasureFileSize: parseInt(process.env.NUXT_PUBLIC_NETWORK_MEASURE_FILE_SIZE!),
            explorerBackendEndpoint: process.env.NUXT_PUBLIC_EXPLORER_BACKEND_ENDPOINT!,
            snapshotsEnabled: process.env.NUXT_PUBLIC_SNAPSHOTS_ENABLED! == "true"
        }
    },
    app: {
        pageTransition: { name: "page", mode: "out-in" }
    },
    modules: ["@nuxt/image", "@nuxtjs/i18n", "@nuxtjs/tailwindcss", "@nuxtjs/seo", "@nuxtjs/eslint-module"],
    i18n: {
        locales: [
            {
                name: "English",
                code: "en",
                iso: "en-US",
                file: "en.ts"
            },
            {
                name: "Русский",
                code: "ru",
                iso: "ru-RU",
                file: "ru.ts"
            }
        ],
        defaultLocale: "en",
        lazy: false,
        restructureDir: false,
        langDir: "localization",
        strategy: "prefix_except_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "lang",
            redirectOn: "root",
            alwaysRedirect: true
        }
    },
    image: {
        format: ["webp", "png"],
        provider: "ipx",
        quality: 100,
        ipx: {
            modifiers: {
                format: "webp",
                quality: 100
            },
        },
    },
    srcDir: "src/",
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
            "@heroicons/vue"
        ]
    },
    typescript: {
        typeCheck: true,
        strict: true
    }
})
