<template>
  <div class="py-40">
    <div class="grid grid-cols-3 gap-4">
      <div
        class="bg-white p-4 transition-all duration-100"
        :class="opClass"
      ></div>
      <div
        class="bg-white p-4 transition-all duration-200"
        :class="opClass"
      ></div>
      <div
        class="bg-white p-4 transition-all duration-300"
        :class="opClass"
      ></div>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div
        class="bg-white p-4 transition-all duration-500"
        :class="opClass"
      ></div>
      <div
        class="bg-white p-4 transition-all duration-700"
        :class="opClass"
      ></div>
      <div
        class="bg-white p-4 transition-all duration-1000"
        :class="opClass"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const opClass = ref(["opacity-0", "scale-0"]);

onMounted(() => (opClass.value = ["opacity-100", "scale-100"]));
</script>