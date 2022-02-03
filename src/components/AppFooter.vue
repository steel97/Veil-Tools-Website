<template>
  <footer class="flex justify-center w-100 text-white my-2">
    <span v-html="t('Core.Footer.Copyright')" class="mr-2"></span>
    <a
      href="https://github.com/Veil-Project/Veil-Tools-Website"
      rel="noopener noreferrer nofollow noindex"
      target="_blank"
      class="hover:text-gray-50 text-gray-300 underline"
      >Github</a
    >
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>