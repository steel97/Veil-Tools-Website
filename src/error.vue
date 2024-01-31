<template>
    <div>
        <NuxtLayout>
            <div class="text-gray-700">
                <div class="fg"></div>
                <AppHeader />
                <main class="m-container mx-auto max-w-5xl">
                    <transition name="fade" mode="out-in">
                        <Error :error="error" />
                    </transition>
                </main>
                <AppFooter />
            </div>
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps({
    error: Object as () => NuxtError
});
const { t } = useI18n();
const img = useImage();
const backgroundImg = computed(() => {
    const imgUrl = img('/images/bg.png', { width: 3500 })
    return `url('${imgUrl}')`;
});

const i18nHead = useLocaleHead({});
const meta = computed(() => {
    return {
        meta: [
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1, maximum-scale=5",
            },
            {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge",
            },
            {
                name: "robots",
                content: "index,follow",
            },
            {
                name: "og:image",
                content: img("/images/ogimage.png", { width: 251 }),
            },
            {
                name: "og:site_name",
                content: t("Meta.SiteName"),
            },
            {
                name: "og:type",
                content: "website",
            },
            ...(i18nHead.value.meta || []),
        ],
        link: [
            {
                rel: "icon",
                href: "/favicon.ico",
            },
            {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
            },
            ...(i18nHead.value.link || []),
        ],
        htmlAttrs: {
            lang: i18nHead.value.htmlAttrs!.lang
        }
    };
});

useHead(meta);
</script>

<style scoped>
.fg {
    background-image: v-bind(backgroundImg);
}
</style>