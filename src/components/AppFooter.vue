<template>
  <footer
    class="flex justify-center w-100 text-white my-2"
    v-html="t('Core.Footer.Copyright')"
  ></footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>