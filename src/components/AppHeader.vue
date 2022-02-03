<template>
  <header class="w-100">
    <nav class="custom-nav-color border-blue-800 border-b px-2 lg:px-0 mb-3">
      <div
        class="
          container
          flex flex-wrap
          justify-between
          items-center
          mx-auto
          max-w-5xl
          py-2
          md:py-3
        "
      >
        <NuxtLink to="/" :aria-label="t('Core.Header.Logo')">
          <img src="/images/logo.png" width="96" :alt="t('Core.Header.Logo')" />
        </NuxtLink>

        <ul class="hidden md:flex space-x-4 justify-right">
          <li>
            <a
              href="https://veil-project.com"
              rel="noopener noreferrer nofollow noindex"
              target="_blank"
              class="hover:text-gray-50 text-gray-300"
              >{{ t("Core.Header.Links.ProjectWebsite") }}</a
            >
          </li>
          <li>
            <a
              href="https://veil.freshdesk.com/support/home"
              rel="noopener noreferrer nofollow noindex"
              target="_blank"
              class="hover:text-gray-50 text-gray-300"
              >{{ t("Core.Header.Links.SupportPortal") }}</a
            >
          </li>
          <li class="flex items-center">
            <div class="rounded mr-2 locale-en"></div>
            <a
              href="javascript:void(0)"
              class="hover:text-gray-50 text-gray-300"
              >English</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>