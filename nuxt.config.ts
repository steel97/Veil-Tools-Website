// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            i18n: {
                baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL!
            },
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL!,
            snapshotMirrors: JSON.parse(process.env.NUXT_PUBLIC_SNAPSHOT_MIRRORS!),
            networkPreMeasureFileSize: parseInt(process.env.NUXT_PUBLIC_NETWORK_PRE_MEASURE_FILE_SIZE!),
            networkMeasureFileSize: parseInt(process.env.NUXT_PUBLIC_NETWORK_MEASURE_FILE_SIZE!),
            explorerBackendEndpoint: process.env.NUXT_PUBLIC_EXPLORER_BACKEND_ENDPOINT!
        }
    },
    app: {
        pageTransition: { name: "page", mode: "out-in" }
    },
    modules: [
        "@nuxt/image",
        "@nuxtjs/i18n",
        "@nuxtjs/tailwindcss"
    ],
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
