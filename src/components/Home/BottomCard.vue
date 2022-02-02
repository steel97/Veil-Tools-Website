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
          href=""
          class="
            p-1
            inline-block
            cbutton
            rounded-full
            border-sky-700 border
            text-center
          "
          >More</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  labelName: string;
  labelValue: string;
}>();
</script>