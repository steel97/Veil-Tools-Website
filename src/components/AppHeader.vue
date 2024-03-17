<template>
  <header class="w-100">
    <nav class="custom-nav-color border-blue-800 border-b px-2 lg:px-0 mb-3">
      <div class="
                                                                                container
                                                                                flex flex-wrap
                                                                                justify-between
                                                                                items-center
                                                                                mx-auto
                                                                                max-w-5xl
                                                                                py-2
                                                                                md:py-3
                                                                              ">
        <NuxtLink :to="localePath('/')" @click="navTo('/')" :aria-label="t('Core.Header.Logo')">
          <NuxtImg src="/images/logo.png" width="96" height="auto" :alt="t('Core.Header.Logo')" />
          <span class="invisible">{{ t('Core.Header.Logo') }}</span>
        </NuxtLink>
        <div class="-mr-2 -my-2 md:hidden">
          <button type="button" class="
                                                                                    p-2
                                                                                    inline-flex
                                                                                    items-center
                                                                                    justify-center
                                                                                    text-gray-300
                                                                                    hover:text-gray-50
                                                                                    focus:outline-none
                                                                                  " @click="toggleMenu">
            <span class="sr-only">{{ t("Core.Header.OpenMenu") }}</span>
            <Bars3Icon class="h-6 w-6" />
          </button>
        </div>

        <ul class="hidden md:flex space-x-4 justify-right">
          <li class="flex items-center">
            <a href="https://veil-project.com" rel="noopener noreferrer nofollow noindex" target="_blank"
              class="hover:text-gray-50 text-gray-300">{{ t("Core.Header.Links.ProjectWebsite") }}</a>
          </li>
          <li class="flex items-center">
            <a href="https://veil.freshdesk.com/support/home" rel="noopener noreferrer nofollow noindex" target="_blank"
              class="hover:text-gray-50 text-gray-300">{{ t("Core.Header.Links.SupportPortal") }}</a>
          </li>
          <li class="flex items-center">
            <div class="popover__wrapper">
              <button class="flex items-center hover:text-gray-50 text-gray-300">
                <div class="rounded-sm mr-2 locale" :class="'locale-' + getCurrentLocale().code"></div>
                {{ getCurrentLocale().name }}
              </button>
              <div class="popover__content rounded">
                <ul>
                  <li v-for="locale in getLocales()" :key="locale.code">
                    <nuxt-link :to="switchLocalePath(locale.code)"
                      class="flex items-center hover:text-blue-600 text-blue-800">
                      <div class="rounded-sm drop-shadow mr-2 locale" :class="'locale-' + locale.code"></div>
                      {{ locale.name }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ul v-show="initialized" :style="{ visibility: menuOpened ? 'visible' : 'hidden' }" class="lg:hidden">
        <div class="transition-[height] ease-out duration-200 menu-collapse">
          <li class="flex items-center">
            <a href="https://veil-project.com" rel="noopener noreferrer nofollow noindex" target="_blank"
              class="hover:text-gray-50 text-gray-300 mx-auto">{{ t("Core.Header.Links.ProjectWebsite") }}</a>
          </li>
          <li class="flex items-center">
            <a href="https://veil.freshdesk.com/support/home" rel="noopener noreferrer nofollow noindex" target="_blank"
              class="hover:text-gray-50 text-gray-300 mx-auto mt-1">{{ t("Core.Header.Links.SupportPortal") }}</a>
          </li>
          <li class="flex items-center">
            <button class="
                                                                                      flex
                                                                                      items-center
                                                                                      hover:text-gray-50
                                                                                      text-gray-300
                                                                                      mx-auto
                                                                                      mt-1
                                                                                    " @click="openLocaleMenu">
              <div class="rounded-sm mr-2 locale" :class="'locale-' + getCurrentLocale().code"></div>
              {{ getCurrentLocale().name }}
            </button>
          </li>
          <ol class="rounded bg-white p-2 mt-2" v-show="menuLocaleOpened">
            <li v-for="locale in getLocales()" :key="locale.code">
              <nuxt-link :to="switchLocalePath(locale.code)" @click="clearError"
                class="flex items-center hover:text-blue-600 text-blue-800">
                <div class="rounded-sm drop-shadow mr-2 locale" :class="'locale-' + locale.code"></div>
                {{ locale.name }}
              </nuxt-link>
            </li>
          </ol>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Bars3Icon from "@heroicons/vue/24/solid/Bars3Icon";
import type { LocaleObject } from "@nuxtjs/i18n";

export interface ILocale {
  code: string;
  name: string;
}

const props = defineProps({
  shouldClearError: Boolean
});

const { t, locales, locale, localeProperties } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const initialized = ref(false);
const menuOpened = ref(false);
const menuHeight = ref("0px");
const menuLocaleOpened = ref(false);
const router = useRouter();

const img = useImage();
const localeEN = computed(() => {
  const imgUrl = img('/images/locales/en.png', { width: 64 })
  return `url('${imgUrl}')`;
});
const localeRU = computed(() => {
  const imgUrl = img('/images/locales/ru.png', { width: 64 })
  return `url('${imgUrl}')`;
});



onMounted(() => (initialized.value = true));

const navTo = (basePath: string) => {
  const path = localePath(basePath);
  if (props.shouldClearError) {
    clearError({ redirect: path });
  } else {
    router.replace(path);
  }
}

const getCurrentLocale = () => {
  return {
    code: locale.value,
    name: localeProperties.value.name
  };
};

const getLocales = () => {
  const localesRet: Array<ILocale> = [];
  const currentLocaleCode = getCurrentLocale().code;
  locales.value.forEach(locale => {
    const lang = locale as LocaleObject;
    if (lang.code == currentLocaleCode) return;
    const link: ILocale = {
      code: lang.code,
      name: lang.name ?? ""
    };
    localesRet.push(link);
  });
  return localesRet;
};

const recalculateMenuSize = () => {
  let size = 90 + (menuLocaleOpened.value ? getLocales().length * 30 + 20 : 0);
  menuHeight.value = menuOpened.value ? `${size}px` : "0px";
};

const toggleMenu = () => {
  menuOpened.value = !menuOpened.value;

  recalculateMenuSize();
};

const openLocaleMenu = () => {
  menuLocaleOpened.value = !menuLocaleOpened.value;

  recalculateMenuSize();
};
</script>

<style scoped>
.locale-en {
  background-image: v-bind(localeEN);
}

.locale-ru {
  background-image: v-bind(localeRU);
}

.menu-collapse {
  height: v-bind(menuHeight);
}

/* https://codepen.io/chocochip/pen/zYxMgRG */
.popover__wrapper {
  position: relative;
  display: inline-block;
  height: 35px;
  top: 6px;
}

.popover__content {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: -10px;
  transform: translate(0, 10px);
  background-color: white;
  padding: 0.5rem;
  width: auto;
}

.popover__content:before {
  position: absolute;
  z-index: -1;
  content: "";
  right: calc(50% - 10px);
  top: -8px;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent white transparent;
  transition-duration: 0.3s;
  transition-property: transform;
}

.popover__wrapper:hover .popover__content {
  z-index: 10;
  opacity: 1;
  visibility: visible;
  transform: translate(0, 10px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}
</style>