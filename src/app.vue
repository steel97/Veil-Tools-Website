<template>
  <div class="text-gray-700">
    <div class="fg"></div>
    <AppHeader />
    <main class="m-container mx-auto max-w-5xl">
      <transition name="fade" mode="out-in">
        <div :key="getKeyForRoute()">
          <NuxtPage />
        </div>
      </transition>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/animation.css";
import "@/assets/css/tailwind.css";
import "@/assets/css/locales.css";
import "@/assets/css/common.css";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { getClientLocale } = useLocalization();
const { t, availableLocales, fallbackLocale, locale } = useI18n();

const lang = useCookie("lang").value ?? getClientLocale();

const getKeyForRoute = () => {
  if (typeof route.meta.key === "function") return route.meta.key(route);
  return route.path;
};

let currentLang = lang.toString();

if (availableLocales.indexOf(currentLang) == -1) {
  currentLang = fallbackLocale.value.toString();
}

locale.value = currentLang;

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
        content: "/images/logo.png",
      },
      {
        name: "og:site_name",
        content: t("Meta.SiteName"),
      },
      {
        name: "og:type",
        content: "website",
      },
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
    ],
    htmlAttrs: {
      lang: locale.value,
    },
  };
});

useMeta(meta);
</script>