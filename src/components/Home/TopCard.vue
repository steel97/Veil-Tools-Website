<template>
  <div class="rounded bg-white p-4">
    <div class="border-b mb-2">
      <div class="flex justify-between mb-2">
        <slot />
        <div class="text-right">
          <div>{{ props.labelName }}</div>
          <div class="text-xl text-blue-800">{{ props.labelValue }}</div>
        </div>
      </div>
    </div>
    <div class="flex justify-between text-xs">
      <div class="flex items-center">
        <ArrowPathIcon class="h-5 w-5 mr-1 text-blue-800" />
        {{ t("Home.CardBase.Updated") }}
      </div>
      <div>{{ props.updatedTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowPathIcon from "@heroicons/vue/24/solid/ArrowPathIcon";

const { t } = useI18n();

const props = defineProps<{
  labelName: string;
  labelValue: string;
  updatedTime: string;
}>();
</script>