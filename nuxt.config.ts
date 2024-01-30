// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            baseUrl: process.env.NUXT_BASE_URL!,
            snapshotMirrors: JSON.parse(process.env.NUXT_SNAPSHOT_MIRRORS!),
            networkPreMeasureFileSize: parseInt(process.env.NUXT_NETWORK_PRE_MEASURE_FILE_SIZE!),
            networkMeasureFileSize: parseInt(process.env.NUXT_NETWORK_MEASURE_FILE_SIZE!),
            explorerBackendEndpoint: process.env.NUXT_EXPLORER_BACKEND_ENDPOINT!
        }
    },
    modules: [
        "@nuxtjs/i18n",
        "@nuxtjs/tailwindcss"
    ],
    i18n: {
        baseUrl: process.env.NUXT_BASE_URL_FRONTEND!,
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
        langDir: "localization",
        strategy: "prefix_and_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "lang",
            redirectOn: "root",
            alwaysRedirect: true
        }
    },
    srcDir: "src/",
    css: ["~/assets/css/tailwind.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
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
