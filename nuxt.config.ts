import { defineNuxtConfig } from "nuxt3";

// temporal fix for intlify
import { IntlifyModuleOptions } from "@intlify/nuxt3";

declare module "@nuxt/schema" {
    export interface NuxtConfig {
        intlify?: IntlifyModuleOptions;
    }
}
//

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {
        BASE_URL: process.env.BASE_URL,
        SNAPSHOT_MIRRORS: JSON.parse(process.env.SNAPSHOT_MIRRORS!),
        NETWORK_PRE_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_PRE_MEASURE_FILE_SIZE!),
        NETWORK_MEASURE_FILE_SIZE: parseInt(process.env.NETWORK_MEASURE_FILE_SIZE!),
        COOKIE_SAVE_DAYS: process.env.COOKIE_SAVE_DAYS,
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
    buildModules: ["@intlify/nuxt3"],
    intlify: {
        vueI18n: "vue-i18n.mjs"
    }
})
