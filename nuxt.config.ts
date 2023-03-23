// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL! as string,
            SNAPSHOT_MIRRORS: JSON.parse(process.env.SNAPSHOT_MIRRORS! as string),
            NETWORK_PRE_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_PRE_MEASURE_FILE_SIZE!),
            NETWORK_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_MEASURE_FILE_SIZE!),
            EXPLORER_BACKEND_ENDPOINT: process.env.EXPLORER_BACKEND_ENDPOINT! as string
        }
    },
    modules: [
        "@nuxtjs/i18n",
    ],
    i18n: {
        baseUrl: process.env.BASE_URL! as string,
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
        lazy: true,
        langDir: "localization",
        strategy: "prefix_and_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "lang",
            redirectOn: "root",
            alwaysRedirect: true
        },
        precompile: {
            strictMessage: false
        },
        experimental: {
            jsTsFormatResource: true
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
        strict: true
    },
    head() {
        return this.$nuxtI18nHead({ addSeoAttributes: true })
    }
})
