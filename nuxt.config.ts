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
    srcDir: "src/",
    css: ["~/assets/css/tailwind.css"],
    build: {
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
