<template>
  <div class="rounded bg-white p-4 transition-all">
    <div class="flex flex-col justify-between h-full">
      <div>
        <div class="flex justify-center">
          <slot />
        </div>
        <div class="flex justify-center my-3">
          <div class="text-xl text-sky-700">
            {{ props.labelName }}
          </div>
        </div>
        <div class="text-center">
          {{ props.labelValue }}
        </div>
      </div>
      <div class="text-center mt-2">
        <a
          v-if="!props.linkTo.startsWith('/')"
          :href="props.linkTo"
          rel="noopener noreferrer nofollow noindex"
          target="_blank"
          :class="linkClasses"
          >More</a
        >
        <NuxtLink
          v-if="props.linkTo.startsWith('/')"
          :to="props.linkTo"
          rel="noopener noreferrer nofollow noindex"
          target="_blank"
          :class="linkClasses"
          >More</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  labelName: string;
  labelValue: string;
  linkTo: string;
}>();

const linkClasses = ref(
  "p-1 inline-block cbutton rounded-full border-sky-700 text-sky-700 border text-center hover:bg-sky-700 hover:text-gray-50 transition-all"
);
</script>