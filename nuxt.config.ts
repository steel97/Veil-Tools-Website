// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL!,
            SNAPSHOT_MIRRORS: JSON.parse(process.env.SNAPSHOT_MIRRORS!),
            NETWORK_PRE_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_PRE_MEASURE_FILE_SIZE!),
            NETWORK_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_MEASURE_FILE_SIZE!),
            EXPLORER_BACKEND_ENDPOINT: process.env.EXPLORER_BACKEND_ENDPOINT!
        }
    },
    modules: [
        "@nuxtjs/i18n",
        "@nuxtjs/tailwindcss"
    ],
    i18n: {
        baseUrl: process.env.BASE_URL_FRONTEND!,
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
