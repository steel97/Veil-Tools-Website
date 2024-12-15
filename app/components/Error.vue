<template>
  <div class="py-2 md:py-40 px-4 lg:px-0">
    <div
      class="
                                rounded
                                p-8
                                bg-white
                                flex
                                justify-center
                                items-center
                                mb-4
                                font-semibold
                              "
    >
      {{ t(`Errors.${errLocale}.Description`) }}
      <slot />
    </div>
    <NuxtLinkLocale
      to="/" class="
                                uppercase
                                block
                                text-center text-sky-300
                                hover:underline
                                underline-offset-4
                              " @click="clearError"
    >
      {{ t("Errors.ToHome") }}
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
const { t } = useI18n();
const route = useRoute();

const errLocale = computed(() => {
  let res = "Error404";
  switch (props.error?.statusCode) {
    case 500:
      res = "Error500";
      break;
  }
  return res;
});

const meta = computed(() => {
  return {
    title: t(`Errors.${errLocale.value}.Meta.Title`),
    meta: [
      {
        name: "description",
        content: t(`Errors.${errLocale.value}.Meta.Description`),
      },
      {
        name: "og:title",
        content: t(`Errors.${errLocale.value}.Meta.Title`),
      },
    ],
  };
});

useHead(meta);

if (process.server) {
  const nuxtApp = useNuxtApp();
  // eslint-ignore-next-line
  if (nuxtApp.ssrContext != null) {
    nuxtApp.ssrContext.nuxt.error = {
      statusCode: Number.parseInt(route.name as any as string),
    };
  }
}
</script>