<template>
  <div>
    <NuxtLayout>
      <div class="text-gray-700">
        <div class="fg"></div>
        <AppHeader />
        <main class="m-container mx-auto max-w-5xl">
          <div :key="getKeyForRoute()">
            <NuxtPage />
          </div>
        </main>
        <AppFooter />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/animation.css";
import "@/assets/css/tailwind.css";
import "@/assets/css/locales.css";
import "@/assets/css/common.css";

const route = useRoute();
const { t } = useI18n();
const img = useImage();
const backgroundImg = computed(() => {
  const imgUrl = img('/images/bg.png', { width: 3500 })
  return `url('${imgUrl}')`;
});

const getKeyForRoute = () => {
  if (typeof route.meta.key === "function") return route.meta.key(route);
  return route.path;
};

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