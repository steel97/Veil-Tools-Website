import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    telemetry: false,
    publicRuntimeConfig: {
        BASE_URL: process.env.BASE_URL! as string,
        SNAPSHOT_MIRRORS: JSON.parse(process.env.SNAPSHOT_MIRRORS! as string),
        NETWORK_PRE_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_PRE_MEASURE_FILE_SIZE!),
        NETWORK_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_MEASURE_FILE_SIZE!),
        EXPLORER_BACKEND_ENDPOINT: process.env.EXPLORER_BACKEND_ENDPOINT! as string,
        COOKIE_SAVE_DAYS: parseInt(process.env.COOKIE_SAVE_DAYS!),
        locales: {
            "en": "English",
            "ru": "Русский"
        }
    },
    srcDir: "src/",
    css: ["~/assets/css/tailwind.css"],
    build: {
        transpile: [
            "@heroicons/vue"
        ],
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
    },
    typescript: {
        strict: true
    },
    buildModules: ["@nuxtjs/i18n"],
    i18n: {
        langDir: "locales",
        baseUrl: process.env.BASE_URL! as string,
        locales: [
            {
                code: "en",
                iso: "en-US",
                file: "en.ts",
                name: "English"
            },
            {
                code: "ru",
                iso: "ru-RU",
                file: "ru.ts",
                name: "Русский"
            }
        ],
        defaultLocale: "en",
        strategy: "prefix_except_default",
        lazy: true,
        vueI18n: {
            legacy: false,
            locale: "en",
            fallbackLocale: "en"
        }
    }
})
